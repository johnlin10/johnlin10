import { useEffect, useRef, useState } from 'react'
import style from './css/PersonalPost.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { Editor, EditorState } from 'draft-js'
import 'draft-js/dist/Draft.css'

// 個人文章頁面組件
export default function PersonalPost(props) {
  const [postViewerId, setPostViewerId] = useState() // 存放當前正在閱讀的文章 ID
  const [postViewerContent, setPostViewerContent] = useState() // 存放當前正在閱讀的文章內容
  const [postExample, setPostExample] = useState([
    {
      title: '打造富文本編輯器',
      description: '不想學別人的庫，那就自己寫一個。',
      timestamp: 1698825660,
      id: '1698825660',
      content: [
        {
          type: 'p',
          content:
            '終於將要有一塊屬於自己的網站了！還有我專屬的文章分享區，可以分享更多關於我的細節。',
          style: '',
        },
        {
          type: 'h1',
          content: '個人文章怎麼發布？',
          style: '',
        },
        {
          type: 'p',
          content:
            '這是我想了很久的問題，本來想直接把文章寫在網站原始碼中，但這實在太... 更新文章也更加麻煩！所以就打算把文章上傳到雲端，這樣網站的文章會是最即時的。',
          style: '',
        },
        {
          type: 'p',
          content:
            '這就困難了許多，不過我也沒想太多，直接開寫，一步一步慢慢解決，先寫一個示例文章資料結構作為偽雲端資料，定義一些預設樣式，再做編輯模式，控制輸入框。比如說：按下 Enter 鍵會攔截換行動作，改為在資料結構的下一個 index 節點增加一個段落。看起來很簡單，但實現思路要建立並不容易。',
        },
        {
          type: 'p',
          content: '',
        },
        {
          type: 'p',
          content:
            '無論如何，初始架構總算有點東西，但輸入框還有很多融合性問題要解決，編輯界面也還有點簡陋，就期待一下之後的最終成果吧！',
        },
        {
          type: 'img',
          content:
            'https://firebasestorage.googleapis.com/v0/b/johnlin10-web.appspot.com/o/assets%2Fimages%2Farticle%2FSCR-20231101-mvcl.png?alt=media&token=94bbe9d5-b69d-4aa4-8833-943948b0c4b9&_gl=1*p0b2fp*_ga*MTQ4ODkzOTE5NC4xNjgxMDM2Njg5*_ga_CW55HF8NVT*MTY5ODgxOTg0OS4yMTYuMS4xNjk4ODE5OTE4LjYwLjAuMA..',
          description: '非常多的輸入數據要處理',
        },
        {
          type: 'p',
          content:
            '此文章為展示用途，非雲端即時內容，任何更改都無法變更原文內容。可以體驗一下編輯功能。',
        },
      ],
    },
    {
      title: '文章二',
      description: '文章簡述',
      timestamp: 1698826260,
      id: '1698826260',
      content: [
        { type: 'h1', content: '文章第一個一級段落', style: 'I' },
        { type: 'h2', content: '文章第一個二級段落', style: '' },
        { type: 'h3', content: '文章第一個三級段落', style: '' },
        { type: 'p', content: '這是一段文章內文', style: '' },
        { type: 'img', content: '圖片的Url', description: '圖片的描述文' },
      ],
    },
    {
      title: '文章三',
      description: '文章簡述',
      timestamp: 1698826860,
      id: '1698826860',
      content: [
        { type: 'h1', content: '文章第一個一級段落', style: 'I' },
        { type: 'h2', content: '文章第一個二級段落', style: '' },
        { type: 'h3', content: '文章第一個三級段落', style: '' },
        { type: 'p', content: '這是一段文章內文', style: '' },
        { type: 'img', content: '圖片的Url', description: '圖片的描述文' },
      ],
    },
  ])

  const openArticle = (postId) => {
    // 找到對應 ID 的文章對象
    const post = postExample.find((item) => item.id === postId)

    if (post) {
      setPostViewerId(postId)
      setPostViewerContent(post)
    }
  }
  return (
    <div className={style.container}>
      <section>
        <h1>我的文章</h1>
        {postExample.map((item, index) => (
          <div onClick={() => openArticle(item.id)} key={index}>
            <time>{item.time}</time>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
          </div>
        ))}
      </section>

      {postViewerContent && (
        <PostViewer
          posts={postExample}
          post={postViewerContent}
          closePost={() => setPostViewerContent()}
          setPostExample={setPostExample}
        />
      )}
    </div>
  )
}

function PostViewer({ posts, post, closePost, setPostExample }) {
  const [editMode, setEditMode] = useState(false)
  const [isEdited, setIsEdited] = useState(false)
  const [currentContent, setCurrentContent] = useState(post)

  /**
   * 修改 state 狀態中的值為輸入值 - 在輸入框內容改變時觸發
   * @param {number} index - 段落索引
   * @param {Event} e - 事件對象
   */
  const handleContentChange = (index, e) => {
    const newContent = { ...currentContent }
    newContent.content[index].content = e.target.value
    setCurrentContent(newContent)

    // 修改為已變更狀態
    setIsEdited(true)

    setTimeout(() => {
      resetParagraphHeight()
    }, 0)
  }

  useEffect(() => {
    if (editMode) {
      // 進入編輯模式時，設定所有 textarea 的高度為滾動高度
      const textareas = document.querySelectorAll('textarea')
      textareas.forEach((textarea) => {
        textarea.style.height = `${textarea.scrollHeight}px`
        textarea.style.maxHeight = `${textarea.scrollHeight}px`
      })
    }
  }, [editMode])

  /**
   * 計算並套用為所有 textarea 自身的棍動高度
   */
  const resetParagraphHeight = () => {
    if (editMode) {
      // 進入編輯模式時，設定所有 textarea 的高度為滾動高度
      const textareas = document.querySelectorAll('textarea')
      textareas.forEach((textarea) => {
        textarea.style = ''
        textarea.style.height = `${textarea.scrollHeight}px`
        textarea.style.maxHeight = `${textarea.scrollHeight}px`
      })
    }
  }

  /**
   * 移除傳入索引的段落
   * @param {number} index - 從編輯器傳入的段落索引
   */
  const handleDeleteParagraph = (index) => {
    const newContent = [...currentContent.content]
    newContent.splice(index, 1)
    setCurrentContent((prevContent) => {
      return {
        ...prevContent,
        content: newContent,
      }
    })
    setIsEdited(true)
  }

  /**
   * 切換端落的樣式
   * @param {number} index - 段落索引
   * @param {Event} e - 事件對象
   */
  const handleTypeChange = (index, e) => {
    const newContent = { ...currentContent }
    newContent.content[index].type = e.target.value
    setCurrentContent(newContent)
    setIsEdited(true)

    setTimeout(() => {
      resetParagraphHeight()
    }, 0)
  }

  /**
   * 切換端落的樣式
   * @param {number} index - 段落索引
   * @param {Event} e - 事件對象
   */
  const handleImgUrlChange = (index, e) => {
    const newContent = { ...currentContent }
    newContent.content[index].content = e.target.value
    setCurrentContent(newContent)
    setIsEdited(true)

    setTimeout(() => {
      resetParagraphHeight()
    }, 0)
  }

  const inputRefs = useRef([])
  /**
   * 處理按鍵按下事件
   * @param {Event} e - 事件對象
   * @param {number} index - 段落的索引
   */
  const handleOnKeyDown = (e, index) => {
    if (e.key === 'Enter' && e.keyCode !== 229) {
      e.preventDefault() // 防止換行

      const newParagraphs = [...currentContent.content]
      newParagraphs.splice(index + 1, 0, {
        type: 'p',
        content: '',
      })

      setCurrentContent((prevContent) => {
        return {
          ...prevContent,
          content: newParagraphs,
        }
      })

      setIsEdited(true)
      // 聚焦在新的輸入框
      setTimeout(() => {
        if (inputRefs.current[index + 1]) {
          inputRefs.current[index + 1].focus()
        }
      }, 0)
    }
    if (e.key === 'Backspace' && e.target.value === '') {
      handleDeleteParagraph(index)

      // 聚焦在上一個輸入框
      setTimeout(() => {
        if (inputRefs.current[index - 1]) {
          inputRefs.current[index - 1].focus()
        }
      }, 0)
    }

    if (editMode) {
      // 進入編輯模式時，設定所有 textarea 的高度為滾動高度
      setTimeout(() => {
        const textareas = document.querySelectorAll('textarea')
        textareas.forEach((textarea) => {
          textarea.style.height = `${textarea.scrollHeight}px`
          textarea.style.maxHeight = `${textarea.scrollHeight}px`
        })
      }, 0)
    }

    setTimeout(() => {
      resetParagraphHeight()
    }, 0)
  }

  const handleSaveChanges = () => {
    setPostExample((prevPosts) => {
      return prevPosts.map((item) => {
        if (item.id === post.id) {
          return {
            ...item,
            content: currentContent.content,
          }
        }
        return item
      })
    })

    // 關閉編輯模式
    setEditMode(false)
    setIsEdited(false)
  }

  return (
    <article className={style.article}>
      <div className={style.header}>
        <div className={style.article_controls}>
          <div>
            <button
              className={style.closeArticleBtn}
              alt="返回"
              onClick={() => closePost()}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          </div>
          <div>
            <button
              className={style.editMode}
              alt="編輯模式"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? '關閉' : '編輯'}
            </button>
            {isEdited && <button onClick={handleSaveChanges}>儲存變更</button>}
          </div>
        </div>
        <h1>{currentContent.title}</h1>
        <p>{currentContent.description}</p>
      </div>
      <MyEditor />
      <div className={style.article_view}>
        {currentContent.content.map((item, index) => {
          let element = ''
          if (!editMode) {
            switch (item.type) {
              case 'h1':
                element = <h1 key={index}>{item.content}</h1>
                break
              case 'h2':
                element = <h2 key={index}>{item.content}</h2>
                break
              case 'h3':
                element = <h3 key={index}>{item.content}</h3>
                break
              case 'p':
                element = <p key={index}>{item.content}</p>
                break
              case 'img':
                element = (
                  <>
                    <img
                      src={item.content}
                      key={index}
                      alt={item.description}
                    ></img>
                    <span>{item.description}</span>
                  </>
                )
                break
              default:
                element = <p key={index}>{item.content}</p>
            }
          } else {
            switch (item.type) {
              case 'h1':
                element = (
                  <textarea
                    ref={(el) => (inputRefs.current[index] = el)}
                    className={style.hd1}
                    key={index}
                    value={item.content}
                    onChange={(e) => handleContentChange(index, e)}
                    onKeyDown={(e) => handleOnKeyDown(e, index, inputRefs)}
                  ></textarea>
                )
                break
              case 'h2':
                element = (
                  <textarea
                    ref={(el) => (inputRefs.current[index] = el)}
                    className={style.hd2}
                    key={index}
                    value={item.content}
                    onChange={(e) => handleContentChange(index, e)}
                    onKeyDown={(e) => handleOnKeyDown(e, index, inputRefs)}
                  ></textarea>
                )
                break
              case 'h3':
                element = (
                  <textarea
                    ref={(el) => (inputRefs.current[index] = el)}
                    className={style.hd3}
                    key={index}
                    value={item.content}
                    onChange={(e) => handleContentChange(index, e)}
                    onKeyDown={(e) => handleOnKeyDown(e, index, inputRefs)}
                  ></textarea>
                )
                break
              case 'p':
                element = (
                  <textarea
                    ref={(el) => (inputRefs.current[index] = el)}
                    className={style.p}
                    key={index}
                    value={item.content}
                    onChange={(e) => handleContentChange(index, e)}
                    onKeyDown={(e) => handleOnKeyDown(e, index, inputRefs)}
                  ></textarea>
                )
                break
              case 'img':
                element = (
                  <>
                    <textarea
                      ref={(el) => (inputRefs.current[index] = el)}
                      className={style.img}
                      value={item.content}
                      onChange={(e) => handleImgUrlChange(index, e)}
                      onKeyDown={(e) => handleOnKeyDown(e, index, inputRefs)}
                      placeholder="圖片 URL"
                    />
                    <img
                      src={item.content}
                      key={index}
                      alt={item.description}
                    ></img>
                  </>
                )
                break
              default:
                element = <p key={index}>{item.content}</p>
            }
          }
          return (
            <div className={style.paragraphs_block}>
              {element}
              {editMode ? (
                <select
                  className={style.paragraph_type}
                  name=""
                  id=""
                  value={item.type}
                  onChange={(e) => handleTypeChange(index, e)}
                >
                  <optgroup label="文字">
                    <option value="h1">H1</option>
                    <option value="h2">H2</option>
                    <option value="h3">H3</option>
                    <option value="p">內文</option>
                  </optgroup>
                  <optgroup label="媒體">
                    <option value="img">圖片</option>
                  </optgroup>
                </select>
              ) : (
                ''
              )}
            </div>
          )
        })}
      </div>
    </article>
  )
}

function MyEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )

  return <Editor editorState={editorState} onChange={setEditorState} />
}
