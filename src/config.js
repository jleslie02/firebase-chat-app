import firebase from 'firebase'

const config = {
  apiKey: 'xxxxxxxx',
  authDomain: 'xxxxxxxx',
  databaseURL: 'xxxxxxxx',
  projectId: 'xxxxxxxx',
  storageBucket: 'xxxxxxxx',
  messagingSenderId: 'xxxxxxxx',
  appId: 'xxxxxxxx',
}

firebase.initializeApp(config)

export const myFirebase = firebase
export const myFirestore = myFirebase.firestore()

