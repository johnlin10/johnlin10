/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import style from './css/Music.module.scss'
import { getFileUrl } from '../firebase'

export default function Music(props) {
  const [playIndex, setPlayIndex] = useState(1)
  const [audioUrl, setAudioUrl] = useState('')
  const [audioCover, setAudioCover] = useState('')
  const musicDatabaseArea = '/assets/music/'
  const [musicAssets, setMusicAssets] = useState([
    {
      name: '裹著心的光',
      artist: '林俊傑',
      album: '裹著心的光',
      audioPath: `${musicDatabaseArea}林俊傑-裹著心的光/audio.wav`,
      cover: `${musicDatabaseArea}林俊傑-裹著心的光/cover.jpg`,
      lrc: `[00:00.000] 作詞 : 易家揚
[00:03.000] 作曲 : 林俊傑
[00:05.000] 編曲 : 吳慶隆
[00:07.000] 製作人 : 林俊傑
[00:09.000] 
[00:11.500] 來自各個城市的你們 謝謝你們 
[00:13.500] Thank you
[00:17.051] 在音樂的路上 我一直堅持著
[00:21.735] 我有你們 我非常的幸福
[00:25.334] 
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
[01:34.543]Wu Wu
[01:38.343]我愛你們
[01:39.343]
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
[04:05.063]Wu Wu 
[04:09.063]
[04:16.363]聖所的人在哪裡
[04:21.363]`,
    },
    {
      name: '聽海、哭砂、心痛、不為誰而作的歌',
      artist: '林俊傑',
      album: '第34屆金曲獎頒獎典禮',
      audioPath: `${musicDatabaseArea}林俊傑【聽海、哭砂、心痛、不為誰而作的歌】/第34屆金曲獎頒獎典禮 -【林俊傑】表演節目『特別貢獻獎 林秋離 -聽海、哭砂、心痛、不為誰而作的歌』｜2023 GMA 34.m4a`,
      cover: `${musicDatabaseArea}林俊傑-裹著心的光/cover.jpg`,
      lrc: `[00:00.000] - 前奏 -
[00:13.400] 
[00:13.400] Wu Wu
[00:17.051] 
[00:34.760]寫信告訴我今天 海是什麼顏色
[00:42.070]夜夜陪著你的海 心情又如何
[00:49.154]灰色是不想說 藍色是憂鬱
[00:55.914]而漂泊的你 狂浪的心 停在哪裡
[00:64.000]寫信告訴我今夜 你想要夢什麼
[00:71.500]夢裡外的我是否 都讓你無從選擇
[00:78.541]我揪著一顆心 整夜都閉不了眼睛
[00:85.720]為何你明明動了情 卻又不靠近
[00:93.156]
[00:97.956]聽
[00:100.556]海哭的聲音`,
    },
    {
      name: '裹著心的光',
      artist: '林俊傑',
      album: '裹著心的光',
      audioPath: `${musicDatabaseArea}林俊傑-裹著心的光/audio.wav`,
      cover: `${musicDatabaseArea}林俊傑-裹著心的光/cover.jpg`,
      lrc: `[00:00.000] 作詞 : 易家揚
[00:03.000] 作曲 : 林俊傑
[00:05.000] 編曲 : 吳慶隆
[00:07.000] 製作人 : 林俊傑
[00:09.000] 
[00:11.500] 來自各個城市的你們 謝謝你們 
[00:13.500] Thank you
[00:17.051] 在音樂的路上 我一直堅持著
[00:21.735] 我有你們 我非常的幸福
[00:25.334] 
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
[01:34.543]Wu Wu
[01:38.343]我愛你們
[01:39.343]
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
[04:05.063]Wu Wu 
[04:09.063]
[04:16.363]聖所的人在哪裡
[04:21.363]`,
    },
  ])

  const [lrcArray, setLrcArray] = useState([])
  const [playerProgress, setPlayerProgress] = useState(0)

  /**
   * 解析歌詞字符串，轉換為一個數組
   * @param {string} musicAssets[playIndex].lrc 歌詞字符串
   */
  useEffect(() => {
    let lines = musicAssets[playIndex].lrc.split('\n')

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
  }, [musicAssets, playIndex])

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
  const [translateY, setTranslateY] = useState('0')

  /**
   * 播放器播放時，更新播放進度
   * @param {number} curTime - 當前時間（秒數）
   */
  function updatePlayProgress(curTime) {
    // 設定播放器進度為當前時間
    setPlayerProgress(curTime)

    // 從歌詞陣列的最後一個元素開始遍歷
    for (let i = lrcArray.length - 1; i >= 0; i--) {
      // 如果歌詞陣列中的時間戳小於當前時間 curTime
      if (lrcArray[i]?.timestramp < curTime) {
        // 設定要突出顯示的歌詞索引為 i
        setHighLightIndex(i)

        // 設定歌詞列的位移，以便將當前歌詞置於屏幕中央
        setTranslateY(`calc(20vh - ${50 * i}px)`)

        // 跳出迴圈，因為到此已經找到了當前時間對應的歌詞
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

  useEffect(() => {
    getFileUrl(musicAssets[playIndex].audioPath).then((url) => {
      setAudioUrl(url)
    })
    getFileUrl(musicAssets[playIndex].cover).then((url) => {
      setAudioCover(url)
    })
  }, [audioUrl])

  return (
    <div className={style.view}>
      <p>{playerProgress}</p>
      <Player
        playIndex={playIndex}
        audioUrl={audioUrl}
        musicAssets={musicAssets}
        audioCover={audioCover}
        updatePlayProgress={updatePlayProgress}
        lrcArray={lrcArray}
        translateY={translateY}
        highLightIndex={highLightIndex}
        moveToTime={moveToTime}
      />
    </div>
  )
}

function Player(props) {
  const [playerActv, setPlayerActv] = useState(false)

  return (
    <div className={`${style.player}${playerActv ? ` ${style.open}` : ''}`}>
      <div className={style.player_view}>
        <div className={style.playerCtrl}>
          <button></button>
          {props.audioUrl && (
            <audio
              src={props.audioUrl}
              controls
              onTimeUpdate={(e) =>
                props.updatePlayProgress(e.target.currentTime)
              }
              onPlay={() => {
                // 使用Media Session API來設定這些資訊
                if ('mediaSession' in navigator) {
                  navigator.mediaSession.metadata = new MediaMetadata({
                    title: props.musicAssets[props.playIndex].name,
                    artist: props.musicAssets[props.playIndex].artist,
                    album: props.musicAssets[props.playIndex].album,
                    artwork: [
                      {
                        src: props.audioCover,
                      },
                    ],
                  })
                }
              }}
            ></audio>
          )}
        </div>

        <div className={style.container}>
          {/* <button onClick={() => parseLrc()}>parseLrc</button> */}
          <h1>{props.musicAssets[props.playIndex].name}</h1>
          <p>{props.musicAssets[props.playIndex].artist}</p>
          <ul
            className={style.lrc_list}
            style={{ transform: `translateY(${props.translateY})` }}
          >
            {props.lrcArray.map((item, index) => (
              <li
                className={props.highLightIndex === index ? style.actv : ''}
                key={index}
                onClick={() => props.moveToTime(item.timestramp)}
              >
                {item.content}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
