import {eventChannel} from 'redux-saga';
import { myFirestore } from '../../config';

export const createUserWatch = (user) => {
  return eventChannel(emit => {
    const unsubscribe = myFirestore.collection("users").doc(user)
      .onSnapshot(function(doc) {
        emit(doc.data());
      });
    // channel cleanup callback.
    return unsubscribe
  });
};

export const createRequestWatch = (request) => {
  return eventChannel(emit => {
    const unsubscribe = myFirestore.collection("requests").doc(request)
      .onSnapshot(function(doc) {
          emit(doc.data());
      });
    // channel cleanup callback.
    return unsubscribe
  });
};

export const createGroupWatch = (group) => {
  return eventChannel(emit => {
    const unsubscribe = myFirestore.collection("groups").doc(group)
      .onSnapshot(function(doc) {
          emit(doc.data());
      });
    // channel cleanup callback.
    return unsubscribe
  });
};

export const createPrivateChatWatch = (message) => {
  return eventChannel(emit => {
    const unsubscribe = myFirestore.collection("messages").doc(message)
      .onSnapshot(function(doc) {
          emit(doc.data());
      });
    // channel cleanup callback.
    return unsubscribe
  });
};

export const createGroupsWatch = (request) => {
  return eventChannel(emit => {
    const unsubscribe = myFirestore.collection("groups")
      .onSnapshot(function(querySnapshot) {
          let groups = {};
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              groups[doc.id] = doc.data();
          });
          emit(groups);
      });
    // channel cleanup callback.
    return unsubscribe
  });
};