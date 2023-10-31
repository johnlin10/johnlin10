/* eslint-disable jsx-a11y/alt-text */
import style from './css/CopyRight.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function CopyRight(props) {
  return (
    <div className={style.copyRight}>
      <p>
        版權所有 <FontAwesomeIcon icon="fa-regular fa-copyright" /> 2023 Johnlin
      </p>

      <p>
        <a
          property="dct:title"
          rel="cc:attributionURL"
          href="https://johnlin.web.app/"
        >
          johnlin.web.app
        </a>{' '}
        由{' '}
        <a
          rel="cc:attributionURL dct:creator"
          property="cc:attributionName"
          href="https://johnlin.web.app/"
        >
          Johnlin
        </a>{' '}
        授權許可{' '}
        <a
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
          target="_blank"
          rel="license noopener noreferrer"
          style={{ display: 'inline-block' }}
        >
          <img
            style={{
              height: '22px !important',
              marginLeft: '3px',
              verticalAlign: 'text-bottom',
            }}
            src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"
          />
          <img
            style={{
              height: '22px !important',
              marginLeft: '3px',
              verticalAlign: 'text-bottom',
            }}
            src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"
          />
          <img
            style={{
              height: '22px !important',
              marginLeft: '3px',
              verticalAlign: 'text-bottom',
            }}
            src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"
          />
          <img
            style={{
              height: '22px !important',
              marginLeft: '3px',
              verticalAlign: 'text-bottom',
            }}
            src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"
          />
        </a>
      </p>
    </div>
  )
}
