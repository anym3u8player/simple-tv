import React, { useEffect } from 'react'
import { fetchVideoList } from '../../api'
import ChoiceBox from './ChoiceBox'

const HOT_MOVIE_IDS = [
  44472, //闪电侠
  44174, //变形金刚
  45239, //碟中谍
  40626, //流浪地球
  40650, // 满江红
  43017, //灌篮高手
  // 42928, //忠犬八公
  // 42076, // 保你平安
  // 31756, // 四海
]

const Home: React.FC = () => {

  return <div>
    <ChoiceBox ids={HOT_MOVIE_IDS} />
  </div>
}

export default Home
