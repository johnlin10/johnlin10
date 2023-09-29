import css from './css/Nav.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// 頂部攔組件
export default function Nav(props) {
  return (
    <nav>
      <div>
        <div
          className={css.icon}
          onClick={() => props.navigateClick('/')}></div>
        <div className={css.NavLinkView}>
          <ul>
            <li onClick={() => props.navigateClick('/myPost')}>
              <span>
                <FontAwesomeIcon icon="fa-solid fa-user" />
                我的文章
              </span>
            </li>
            <li onClick={() => props.navigateClick('/techPost')}>
              <span>
                <FontAwesomeIcon icon="fa-solid fa-microchip" />
                科技新聞
              </span>
            </li>
            <li onClick={() => props.navigateClick('/about')}>
              <span>
                <FontAwesomeIcon icon="fa-solid fa-code" />
                開發歷程
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
