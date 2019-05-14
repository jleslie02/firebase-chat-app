import {myFirestore, myFirebase} from './config'
import * as C from './constants';

export const getUser = (user) => {
  return myFirestore
    .collection(C.USERS)
    .doc(user)
    .get().then(function(doc) {
      if (doc.exists) {
        return doc.data();
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
};

export const getChat = (user) => {
  return myFirestore
    .collection("messages")
    .doc(user)
    .get().then(function(doc) {
        return doc.data();
    })
};

export const updateUserStatus = (user, newStatus) => {
    return myFirestore
      .collection(C.USERS)
      .doc(user).update({
        status: newStatus
      });
}

export const getMessagesLength = () => {
  return myFirestore
    .collection("messages")
    .get().then(querySnapshot => {
      return querySnapshot.docs.length
    });
};

export const updateGroupMessages = (idx, group, date, seen, message, messages, user) => {
  return myFirestore
    .collection('messages')
    .doc(`${idx}`).set({
      created: date,
      seen: seen,
      text: message,
      type: 1,
      user: user
    }).then(() => {
      // Get a new write batch
      let batch = myFirestore.batch();
      const grp = myFirestore.collection("groups").doc(group);
    
      batch.update(grp, {messages: messages});
      batch.update(grp, {size: Object.keys(messages || {}).length});

      // Commit the batch
      batch.commit()
    })
}

export const updatePrivateMessages = (idx, to, date, seen, message, toMessages, fromMessage, user) => {
  return myFirestore
    .collection('messages')
    .doc(`${idx}`).set({
      created: date,
      seen: seen,
      text: message,
      type: 1,
      user: user,
      to: to
    }).then(() => {
      // Get a new write batch
      let batch = myFirestore.batch();
      const grp = myFirestore.collection("users").doc(user.toLowerCase());
      batch.update(grp, {privates: fromMessage});

      const grp1 = myFirestore.collection("users").doc(to.toLowerCase());
      batch.update(grp1, {privates: toMessages});

      // Commit the batch
      batch.commit()
    })
}

export const readMessages = (messages) => {
  // Get a new write batch
  let batch = myFirestore.batch();
  const col = myFirestore.collection("messages")
  messages.forEach((m) => {
    batch.update(col.doc(m), {seen: true});
  })
  // Commit the batch
  return batch.commit()
}

export const acceptRequest = (to, from, id, newFriendsTo, newFriendsFrom, newRequests) => {
  // Get a new write batch
  let batch = myFirestore.batch();
  const grp = myFirestore.collection("users").doc(to);
  console.log({friends: newFriendsTo, requests: newRequests})
  batch.update(grp, {friends: newFriendsTo, requests: newRequests});

  const grp1 = myFirestore.collection("users").doc(from)
  batch.update(grp1, {friends: newFriendsFrom});

  // Commit the batch
  return batch.commit()
}

export const declineRequest = (to, requests) => {
  // Get a new write batch
  let batch = myFirestore.batch();
  const grp = myFirestore.collection("users").doc(to)
  if (Object.keys(requests))
    batch.update(grp, {requests: requests});

  // Commit the batch
  return batch.commit()
}

export const singoutUser = (user, newStatus) => {
  return myFirebase.auth().signOut().then(function() {
    localStorage.removeItem("user");
  })
}
