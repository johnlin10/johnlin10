import React, { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation } from 'react-router-dom'
import { useNavigate, Navigate, Route, Routes, Outlet } from 'react-router-dom'
import './App.scss'
import style from './App.module.scss'

// Service Worker
import { serviceWorkerRegistration } from './serviceWorkerRegistration'
import { getRegistration } from './serviceWorkerRegistration'

// Pages
import Home from './pages/Home'
import PersonalPost from './pages/PersonalPost'
import About from './pages/About'
import TechPost from './pages/TechPost'
import Music from './pages/Music'
// Widget
import Nav from './widgets/Nav'
import Footer from './widgets/Footer'

// 頁面架構組件
function App() {
  const location = useLocation()
  // 自動檢查更新
  const [updateAvailable, setUpdateAvailable] = useState(false)
  useEffect(() => {
    const intervalId = setInterval(() => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then((registration) => {
            registration.update()
            console.log(
              'ServiceWorker 註冊成功！ 管轄範圍：',
              registration.scope
            )
            // 檢查是否有新版本可用
            if (registration.waiting) {
              setUpdateAvailable(true)
            }
            registration.addEventListener('updatefound', () => {
              const installingWorker = registration.installing
              if (installingWorker) {
                installingWorker.addEventListener('statechange', () => {
                  if (
                    installingWorker.state === 'installed' &&
                    navigator.serviceWorker.controller
                  ) {
                    // 提示用戶更新
                    setUpdateAvailable(true)
                  }
                })
              }
            })
            // 當新版本可用時觸發
            serviceWorkerRegistration.register({
              onUpdate: (reg) => {
                // 提示用戶更新
                setUpdateAvailable(true)
              },
            })
          })
          .catch((error) => {
            console.log('ServiceWorker 註冊失敗：', error)
          })
      }
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  // 用戶手動更新新版本
  const handleUpdate = async () => {
    const registration = await getRegistration()
    if (registration && registration.waiting) {
      // 強制激活新版本
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })
      setUpdateAvailable(false)
      window.location.reload()
    }
  }

  // 新頁面跳轉邏輯
  const navigate = useNavigate()
  const navigateClick = (page) => {
    navigate(page)
  }

  // 偵測是否在頁面頂部
  const [isTop, setIsTop] = useState(true)
  let lastIsTop = true
  useEffect(() => {
    setTimeout(() => {
      const container = document.querySelector('main').querySelector('div')

      const handleScroll = () => {
        const scrollTop = container.scrollTop
        const newIsTop = scrollTop <= 30 // 距離頂部小於等於 30px
        console.log(scrollTop)

        if (newIsTop !== lastIsTop) {
          setIsTop(newIsTop)
          // eslint-disable-next-line react-hooks/exhaustive-deps
          lastIsTop = newIsTop
        }
      }

      console.log(container)
      container.addEventListener('scroll', handleScroll)

      return () => {
        container.removeEventListener('scroll', handleScroll)
      }
    }, 500)
  }, [location])

  return (
    <>
      <Nav navigateClick={navigateClick} isTop={isTop} />
      <main className={isTop ? '' : style.isTop}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myPost" element={<PersonalPost />} />
          <Route path="/techPost" element={<TechPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/music" element={<Music />} />
        </Routes>
      </main>
      {updateAvailable && (
        <div id="update">
          <div className="updateContent">
            <p>
              <FontAwesomeIcon
                icon="fa-solid fa-circle-check"
                style={{ color: '#ff4f4f' }}
              />
              　有更新
            </p>
          </div>
          <div className="updateBtn" onClick={handleUpdate}>
            <div>更新</div>
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}

export default App
