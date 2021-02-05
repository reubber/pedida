import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyCn8tDw1MSgDrIxRCBNtSl6lwKAxoeA2Ds',
  authDomain: 'reactzzaria-e84d6.firebaseapp.com',
  projectId: 'reactzzaria-e84d6',
  storageBucket: 'reactzzaria-e84d6.appspot.com',
  messagingSenderId: '987356352063',
  appId: '1:987356352063:web:6b03e99d6509835dfcb28a',
  measurementId: 'G-S77J43RGF6'
}
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase
