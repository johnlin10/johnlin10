// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCON4HIstOfS63WngxYHyHoFciym74q2kM',
  authDomain: 'johnlin10-web.firebaseapp.com',
  projectId: 'johnlin10-web',
  storageBucket: 'johnlin10-web.appspot.com',
  messagingSenderId: '773206161854',
  appId: '1:773206161854:web:005d38ceb1837b27e8e1ef',
  measurementId: 'G-X5EXGR4ERD',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
