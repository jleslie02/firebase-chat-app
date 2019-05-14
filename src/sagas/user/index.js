import {put, takeEvery, select, take, call, fork, cancel, all, flush, cancelled, race} from 'redux-saga/effects';
import {getUser, updateUserStatus, singoutUser, getChat, acceptRequest, declineRequest} from '../../apiCalls'
import equals from 'ramda/src/equals';
import difference from 'ramda/src/difference';
import * as C from '../../constants';
import { getCurrentUser, getAllGroupMessages, getAllGroupUsers, getAllChats, getAllFriends, getCurrentUserReal} from '../utils';
import { createUserWatch, createRequestWatch, createGroupsWatch } from './syncUser';

export function* goWatchUser(action) {
  const channel = yield call(createUserWatch, action.user);

  try {
    while (true) {
      const newUser = yield take(channel);

      if (!action.friend) {
        yield put({type: C.USER.UPDATE_USER, id: action.user, user: {...newUser, id: action.user}});
        let oldUser = yield select(getCurrentUserReal);
      
        localStorage.setItem("user", JSON.stringify({...newUser, id: action.user}));

        if (!equals(oldUser.friends , newUser.friends)) {
        // watch friends list
          yield put({type: "WATCH_FRIENDS_SYNC", friends: Object.keys(newUser.friends || {})});
        }
        
        oldUser = yield select(getCurrentUser);
        if (!equals(oldUser.requests , newUser.requests) || action.isFirst) {
          yield put({type: "WATCH_REQUESTS_SYNC", requests: Object.keys(newUser.requests || {})});
        }
        console.log(oldUser.requests, newUser.requests)
        if (!equals(oldUser.privates , newUser.privates) || action.isFirst) {
          // watch groups list
          yield put({type: "WATCH_CHATS_SYNC", chats: Object.keys(newUser.privates || {})});
        }
      } else {
        yield put({type: C.USER.UPDATE_FRIEND, friend: newUser});
      }

      if(yield cancelled()) {
        channel.close()
        // Don't need these actions, do nothing.
      }
    }
  } catch(e) {
    console.log(e)
  } finally {
    if(yield cancelled()) {
      channel.close()
      // Don't need these actions, do nothing.
    }
  }
}

export function* goWatchFriend(action) {
  const channel = yield call(createUserWatch, action.user);
  try {
    while (true) {
      const newUser = yield take(channel);
      yield put({type: C.USER.UPDATE_FRIEND, id: action.user, friend: newUser});
    }
  } catch(e) {
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}

export function* goWatchRequest(action) {
  const channel = yield call(createRequestWatch, action.request);
  try {
    const newRequest = yield take(channel);
    yield put({type: C.USER.UPDATE_REQUEST, id: action.request, request: newRequest});
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}


export function* goWatchGroups() {
  const channel = yield call(createGroupsWatch);
  try {
    while (true) {
      const groups = yield take(channel);
      const currentUser = yield select(getCurrentUser);

      yield put({type: C.USER.UPDATE_GROUPS, groups: groups});
      const messages = getAllGroupMessages(groups);
      const users = getAllGroupUsers(groups, Object.keys(currentUser.friends || {}));

      yield put({type: "WATCH_GROUPS_CHATS_SYNC", groupsChats: messages})
      yield put({type: "WATCH_USERS_SYNC", users: users})
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}

export function* goWatchChat(action) {
  
  // const channel = yield call(createPrivateChatWatch, action.chat);
  try {
    // yield put({type: C.USER.STOP_USER_SYNC})
    let old = yield select(getAllChats);
    let newBatch = difference(action.chats, Object.keys(old))
    let newchats = yield all(newBatch.map(chat => {
      return call(getChat, chat);
    }))

    let obj = {}
    newchats.map((item, idx) => {
      obj[newBatch[idx]] = item;
      return null;
    })
    old = yield select(getAllChats);
    yield put({type: C.CHATS.UPDATE_CHATS, chats: {...old, ...obj}});
    
  } finally {
  }
}


export function* syncUser(action) {
  const task = yield fork(goWatchUser, action);
  yield take(C.USER.STOP_USER_SYNC);
  yield cancel(task);
}

export function *syncFriends(action) {
  yield put({type: C.USER.STOP_FRIENDS_SYNC})
  if (action.friends.length > 0) {
    let tasks = yield race(action.friends.map(friend => {
        return call(goWatchFriend, {user: friend});
      }
    ));
    yield take(C.USER.STOP_FRIENDS_SYNC)
    yield cancel(...tasks)
  }
}

export function *syncUsers(action) {
  yield put({type: C.USER.STOP_FRIENDS_SYNC})
  if (action.users.length > 0) {
    let tasks = yield all(action.users.map(friend => {
        return call(goWatchFriend, {user: friend});
      }
    ));
    yield take(C.USER.STOP_FRIENDS_SYNC)
    yield cancel(...tasks)
  }
}

export function *syncRequests(action) {
  yield put({type: C.USER.STOP_REQUESTS_SYNC});
  if (action.requests.length > 0) {
    let tasks = yield all(action.requests.map(req => {
        return fork(goWatchRequest, {request: req});
      }
    ));
    yield take(C.USER.STOP_REQUESTS_SYNC)
    yield cancel(...tasks)
  }
}

export function *syncGroups(action) {
  yield put({type: C.USER.STOP_GROUPS_SYNC});
  const task = yield fork(goWatchGroups, action);
  yield take(C.USER.STOP_GROUPS_SYNC);
  yield cancel(task);
}


export function *syncChats(action) {
  yield put({type: C.USER.STOP_CHATS_SYNC})
  let task;
  if (action.chats.length > 0) {
    task = yield fork(goWatchChat, {chats: action.chats});
  }
  yield take(C.USER.STOP_CHATS_SYNC)
  if (task)
    yield cancel(task)
}

export function *syncGroupsChats(action) {
  yield put({type: C.USER.STOP_GROUPS_CHATS_SYNC})
  let task;
  if (action.groupsChats.length > 0) {
    task = yield fork(goWatchChat, {chats: action.groupsChats});
  }
  yield take(C.USER.STOP_GROUPS_CHATS_SYNC)
  if (task)
    yield cancel(task)
    
}

export function *watchUserSync() {
  yield takeEvery("WATCH_USER_SYNC", syncUser);
}

export function *watchFriendsSync() {
  yield takeEvery("WATCH_FRIENDS_SYNC", syncFriends);
}

export function *watchGroupsSync() {
  yield takeEvery("WATCH_GROUPS_SYNC", syncGroups);
}

export function *watchGroupsChatSync() {
  yield takeEvery("WATCH_GROUPS_CHATS_SYNC", syncGroupsChats);
}


export function *watchRequestSync() {
  yield takeEvery("WATCH_REQUESTS_SYNC", syncRequests);
}

export function *watchChatsSync() {
  yield takeEvery("WATCH_CHATS_SYNC", syncChats);
}

export function *watchUsersSync() {
  yield takeEvery("WATCH_USERS_SYNC", syncUsers);
}


export function *goAddUser(action) {
  try {
    let isFirst = true;
    if (!localStorage.getItem("user")) {
      isFirst = true;
      let newResult = yield call(getUser, action.user);
      yield put({type: C.USER.ADD_USER, user: {...newResult, id: action.user}});
      localStorage.setItem("user", JSON.stringify({...newResult, id: action.user, status: 1}));

      yield updateUserStatus(action.user, 1)
      window.location.replace(`${window.location.origin}/home`);
      action.showToast(1, 'Login success')
    } else {
      let newResult = yield call(getUser, action.user);
      localStorage.setItem("user", JSON.stringify({...newResult, id: action.user}));
      yield put({type: C.USER.ADD_USER, user: {...JSON.parse(localStorage.getItem('user')), id: action.user}});
    }
    yield put({type: "WATCH_GROUPS_SYNC"})
    yield put({type: "WATCH_USER_SYNC", user: action.user, isFirst})
  } catch (error) {
    action.showToast(0, "login error")
  }
}

export function *watchAddUser() {
  yield takeEvery(C.USER.ADD_CURRENT_USER, goAddUser);
}

export function *goSignOut(action) {
  try {
    yield put({type: C.USER.STOP_USER_SYNC})
    yield put({type: C.USER.STOP_GROUPS_SYNC})
    yield put({type: C.USER.STOP_REQUESTS_SYNC})
    yield put({type: C.USER.STOP_FRIENDS_SYNC})
    yield put({type: C.USER.STOP_CHATS_SYNC})
    const user = yield select(getCurrentUser);

    yield updateUserStatus(user.name.toLowerCase(), 3)
    yield singoutUser();

    localStorage.removeItem("user")
    yield put({type: C.USER.SIGNOUT});
  } catch (error) {
    action.showToast(1, "logout error")
  }
}

export function *watchSignout() {
  yield takeEvery(C.USER.USER_SIGNOUT, goSignOut);
}

export function *goUpdateState(action) {
  try {
    const user = yield select(getCurrentUser);
    yield updateUserStatus(user.id, action.status)
  } catch (error) {
    console.log(error)
    action.showToast(0, "Error updating state !")
  }
}

export function *watchUpdateState() {
  yield takeEvery(C.USER.UPDATE_STATUS, goUpdateState);
}

export function *goAcceptRequest(action) {
  try {
    const user = yield select(getCurrentUser);
    const friends = yield select(getAllFriends);
    const friendsTo = {
      ...friends[user.name.toLowerCase()].friends,
      [action.from]: true
    };
    const friendsFrom = {
      ...friends[action.from].friends,
      [user.name.toLowerCase()]: true
    }

    let newRequests = user.requests;
    delete newRequests[action.id];

    yield acceptRequest(user.name.toLowerCase(), action.from, action.id, friendsTo, friendsFrom, newRequests)
    yield put({type: C.USER.UPDATE_REQUESTS, id: user.name.toLowerCase(), requests: newRequests});
  } catch (error) {
    console.log(error)
    action.showToast(0, "Error accepting request!")
  }
}

export function *watchAcceptRequest() {
  yield takeEvery(C.USER.ACCEPT_REQUEST, goAcceptRequest);
}

export function *goDeclineRequest(action) {
  try {
    const user = yield select(getCurrentUser);
    let newRequests = user.requests;
    delete newRequests[action.id];

    yield declineRequest (user.name.toLowerCase(), newRequests)
    yield put({type: C.USER.UPDATE_REQUESTS, id: user.name.toLowerCase(), requests: newRequests});
  } catch (error) {
    console.log(error)
    action.showToast(0, "Error accepting request!")
  }
}

export function *watchDeclineRequest() {
  yield takeEvery(C.USER.DECLINE_REQUEST, goDeclineRequest);
}
