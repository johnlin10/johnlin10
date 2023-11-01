// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  setDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'

import { debounce } from 'lodash'

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
// const analytics = getAnalytics(app)
const db = getFirestore(app)
const storage = getStorage(app)

/**
 * 從 Storage 路徑轉換為文件實際 URL
 * @param {string} path 文件在 Storage 的路徑
 * @returns 文件訪問網址
 * @example
 *  getFileUrl('/input/file/path').then((url) => {
      setUrl(url)
    })
 */
export async function getFileUrl(path) {
  const storageRef = ref(storage, path)
  const url = await getDownloadURL(storageRef)
  return url
}

/**
 * 獲取Firestore文檔或集合的內容
 * @param {string} path - 合集或文檔的路徑
 * @returns {Array} - 合集中的文檔 或 文檔中的內容
 * @example
 * await getFirestoreData('my-doc-path')
 */
export const getFirestoreData = async (path) => {
  // 嘗試作為文檔路徑獲取數據
  const docRef = doc(db, path)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    // 如果是文檔，返回文檔的內容
    return docSnap.data()
  } else {
    // 如果不是文檔，嘗試作為集合路徑獲取數據
    const colRef = collection(db, path)
    const querySnapshot = await getDocs(colRef)

    // 返回集合中所有文檔的內容
    return querySnapshot.docs.map((doc) => doc.data())
  }
}

/**
 * 將內容存入或更新某個文檔中
 * @param {string} path - 文檔路徑
 * @param {Array} data - 欲存入的內容
 * @param {boolean} [overwrite] - 是否覆蓋
 * @example
 * // 覆蓋文檔的內容
 * await writeFirestoreDoc('my-doc', { name: 'John', age: 30 }, true);
 * // 更新文檔的部分內容
 * await writeFirestoreDoc('my-doc', { age: 31 }, false);
 */
export const writeFirestoreDoc = debounce(
  async (path, data, overwrite = false) => {
    const docRef = doc(db, path)
    // 使用 getDoc 檢查文檔是否存在
    const docSnapshot = await getDoc(docRef)
    if (overwrite || !docSnapshot.exists()) {
      // 如果overwrite為true，覆蓋文檔的內容
      await setDoc(docRef, data)
    } else {
      // 如果overwrite為false，更新文檔的部分內容
      await updateDoc(docRef, data)
    }
  },
  500
) // 在這裡設定節流的時間，例如 1000 毫秒 (1 秒)
