import css from './css/Home.module.css'

// 首頁組件
export default function Home(props) {
  return (
    <div>
      <section className={css.header}>
        <h1 id="homeTopTitle" className={css.header_title}>
          John Lin
        </h1>
        <span className={css.header_description}>
          網站正在建設中...
          <br />
          不代表最終效果。
        </span>
      </section>
      <section id="introduction">
        <h1 id="introductionTitle">Introduction</h1>
        <span className="introductionSpan">
          網站正在建設中...
          <br />
          不代表最終效果。
        </span>
      </section>
    </div>
  )
}
