// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'

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
const db = getFirestore(app)
const storage = getStorage(app)

export async function getFileUrl(path) {
  const storageRef = ref(storage, path)
  const url = await getDownloadURL(storageRef)
  return url
}
