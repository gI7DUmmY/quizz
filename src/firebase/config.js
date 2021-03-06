import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD1yVeonItvaUnyvq4NoXmeR4LkPCBo7qg",
  authDomain: "ffft-db.firebaseapp.com",
  projectId: "ffft-db",
  storageBucket: "ffft-db.appspot.com",
  messagingSenderId: "744815547637",
  appId: "1:744815547637:web:1fca2ee601689fc7b121bc"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectAuth = firebase.auth()
const db = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectAuth, db, timestamp }