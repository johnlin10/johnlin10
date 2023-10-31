import style from './css/Home.module.scss'

// 首頁組件
export default function Home(props) {
  return (
    <div className={style.container}>
      <section className={style.header}>
        <h1 className={style.header_title}>John Lin</h1>
        <span className={style.header_description}>網站建設中...</span>
        <span className={style.header_description}>敬請期待！</span>
      </section>
      <section id="introduction">
        <h1 id="introductionTitle">介紹</h1>
        <span className={style.introductionSpan}>網站建設中...</span>
      </section>
    </div>
  )
}
