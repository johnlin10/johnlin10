import { useEffect, useState } from 'react'
import css from './css/Music.module.css'

export default function Music(props) {
  const lrc = `[00:00.000] 作詞 : 易家揚
[00:03.000] 作曲 : 林俊傑
[00:05.000] 編曲 : 吳慶隆
[00:07.000] 製作人 : 林俊傑
[00:09.000] 
[00:29.556]光 拿烏雲揉成團
[00:34.360]像鯨魚吻著浪
[00:38.000]叫我 和你 去飛翔
[00:43.823]人 老無語後落單
[00:48.614]別跟丟了天空 沙灘
[00:53.756]掙脫 回憶 壯膽
[01:00.481]裹著心的光 很暖 與你 有關
[01:08.174]有夢就聽得到 用愛呼應感嘆
[01:14.567]心裡裹著光 的人 世界 很寬
[01:22.243]出發就走得到 來時路不會被 剪斷
[01:45.759]當 那無名領頭羊
[01:50.500]替明天找希望
[01:53.988]說嘿 有我 別心慌
[01:59.644]來 學螢火蟲冥想
[02:04.601]在昏暗中靜默 發亮
[02:09.960]是否 有夢 當然
[02:16.518]裹著心的光 很響 說了 別慌
[02:24.047]它說孤單很好 信念創造不凡
[02:30.471]心裡裹著光 的人 初衷 不換
[02:38.098]誓言讓心不老 帶那些夢探索 遠方
[02:48.262]一路有雨 也有霜 月落無題江南
[02:56.190]如我面對太陽 如你追希望
[03:02.382]一諾冒險 就得闖 單板翻越冰川
[03:10.443]未來不缺翅膀 冰雨和悶雷 別管
[03:19.957]裹著心的光 很響 說了 別慌
[03:27.316]它說孤單很好 信念創造不凡
[03:34.076]心裡裹著光 的人 初衷 不換
[03:41.602]誓言讓心不老 帶那些夢探索 遠方
[03:52.267]問那些年的夢 有多燙
[04:01.410] 配唱編寫 : 林俊傑
[04:02.853] 製作協力 : 黃冠龍 ALEX.D/周信廷 SHiN CHOU/蔡沛蓁 Patti Tsai
[04:04.316] 鍵盤 : 吳慶隆
[04:05.769] 弦樂編寫 : 吳慶隆
[04:07.212] 弦樂錄音監督 : 胡靜成
[04:08.665] 第一小提琴 : 張浩/龐闊/張琴/楊爽/劉睿/顏柯/張晗/高言
[04:10.118] 第二小提琴 : 簡培/侯宇紅/閆紅/李若雲/高一凡/倪冰雪
[04:11.561] 中提琴 : 李輝/李季澤/畢芳/方振華
[04:13.014] 大提琴 : 張平/郎瑩/王瑤/石雲博
[04:14.467] 大提琴獨奏 : 郎瑩
[04:15.910] 吉他 : 黃冠龍 ALEX.D
[04:17.363] 低音吉他 : 甯子達 Michael Ning
[04:18.816] 鼓 : Brendan Buckley
[04:20.269] 和聲編寫 : 林俊傑
[04:21.712] 和聲 : 林俊傑
[04:23.165] 錄音室 : THE JFJ SINGULARITY (Taipei)/JFJ SANCTUARY (Taipei)/Reflector Music Studio (Los Angeles)/九紫天成錄音棚 (Beijing)
[04:24.618] 錄音師 : 林俊傑/黃冠龍 ALEX.D/Brendan Buckley/劉璆
[04:26.061] 混音室 : mixHaus Studios (Los Angeles)
[04:27.514] 混音師 : Richard Furch
[04:28.967] 後期母帶處理製作人 : 林俊傑
[04:30.410] 後期母帶處理錄音室 : 饅頭音樂工作室
[04:31.863] 後期母帶處理錄音師 : 孫仲舒
`
  const [lrcArray, setLrcArray] = useState([])
  const [playerProgress, setPlayerProgress] = useState(0)
  /**
   * 解析歌詞字符串，轉換為一個數組
   * @param {string} lrc 歌詞字符串
   */
  useEffect(() => {
    let lines = lrc.split('\n')

    let parsedLrcArray = []
    for (let i = 0; i < lines.length; i++) {
      let parseStr = lines[i].split(']')

      let timeStr = parseStr[0].substring(1)
      let content = parseStr[1]
      let obj = {
        timestramp: parseTime(timeStr),
        content: content,
      }
      parsedLrcArray.push(obj)
    }
    setLrcArray(parsedLrcArray)
    // console.log(JSON.stringify(parsedLrcArray, null, 2))
  }, [lrc])

  /**
   * 將時間字符串轉為數字（秒數）
   * @param {string} timeStr - 時間字符串
   * @returns {number} - 秒數
   */
  function parseTime(timeStr) {
    let part = timeStr.split(':')
    let timestramp = +part[0] * 60 + +part[1]
    return timestramp
  }

  const [highLightIndex, setHighLightIndex] = useState('20vh')
  const [translateY, setTranslateY] = useState('0%')
  function updatePlayProgress(curTime) {
    setPlayerProgress(curTime)
    for (let i = lrcArray.length - 1; i >= 0; i--) {
      if (lrcArray[i]?.timestramp < curTime) {
        setHighLightIndex(i)
        setTranslateY(`calc(20vh - ${32 * i}px)`)
        break
      }
    }
  }

  function moveToTime(time) {
    const audioElement = document.querySelector('audio') // 獲取 <audio> 元素
    if (audioElement) {
      audioElement.currentTime = time + 0.4 // 設置 currentTime 到指定的時間
    }
  }

  return (
    <div className={css.view}>
      <h1>播放器</h1>
      <audio
        src={`./assets/music.wav`}
        controls
        onTimeUpdate={(e) => updatePlayProgress(e.target.currentTime)}></audio>
      <p>{playerProgress}</p>
      <div className={css.container}>
        {/* <button onClick={() => parseLrc()}>parseLrc</button> */}
        <ul
          className={css.lrc_list}
          style={{ transform: `translateY(${translateY})` }}>
          {lrcArray.map((item, index) => (
            <li
              className={highLightIndex === index ? css.actv : ''}
              key={index}
              onClick={() => moveToTime(item.timestramp)}>
              {item.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
