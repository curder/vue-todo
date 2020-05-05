import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDuVh-MMHfmlyplKEAlzabhX5bua30EGuw",
  authDomain: "todos-f8e12.firebaseapp.com",
  databaseURL: "https://todos-f8e12.firebaseio.com",
  projectId: "todos-f8e12",
  storageBucket: "todos-f8e12.appspot.com",
  messagingSenderId: "1075122784753",
  appId: "1:1075122784753:web:01aa2ca5168e2d2a65dc50"
}

firebase.initializeApp(firebaseConfig)
const firestore = firebase.firestore()

export default firestore
