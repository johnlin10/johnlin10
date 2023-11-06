import style from './css/Nav.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'

// 頂部攔組件
export default function Nav(props) {
  return (
    <nav className={`${props.isTop ? '' : style.isTop}`}>
      <div>
        <div
          className={style.icon}
          onClick={() => props.navigateClick('/')}
        ></div>
        <div className={style.NavLinkView}>
          <ul>
            <li onClick={() => props.navigateClick('/myPost')}>
              <FontAwesomeIcon icon={faNewspaper} />
              <span>文章</span>
            </li>
            <li onClick={() => props.navigateClick('/techPost')}>
              <FontAwesomeIcon icon="fa-solid fa-microchip" />
              <span>新聞</span>
            </li>
            <li onClick={() => props.navigateClick('/about')}>
              <FontAwesomeIcon icon="fa-solid fa-code" />
              <span>項目</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
