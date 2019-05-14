import includes from 'ramda/src/inc';

export const getCurrentUser = (state) => JSON.parse(localStorage.getItem('user'));
export const getAllFriends = (state) => state.friends || {};
export const getAllGroups = (state) => state.groups || {};
export const getAllChats = (state) => state.chats;
export const getCurrentUserReal = (state) => state.users.currentUser || {}

export const getAllGroupMessages = (groups) => {
  let v =  Object.values(groups).reduce((acc, item) => {
    acc = acc.concat(Object.keys(item.messages || {}))
    return acc
  }, [])

  return v
}

export const getAllGroupUsers = (groups, watched) => {
  let v =  Object.values(groups).reduce((acc, item) => {
    acc = acc.concat(Object.keys(item.members || {}))
    return acc
  }, [])

  return v.filter((user) => !includes(user, watched));
}