export const BASE_URL = 'https://jyzyapi.com/provide/vod/at/json'

// 热门
export const HOT = [
  {
    id: 40626,
    name: '流浪地球2',
    banner: '/40626.png',
    intro: '《流浪地球》前传',
  },
  {
    id: 40650,
    name: '满江红',
    banner: '/40650.jpg',
    intro: '精忠报国',
  },
  {
    id: 40396,
    name: '狂飙',
    banner: '/40396.jpg',
    intro: '[39集全]张译张颂文黑白较量',
  },
  {
    id: 32742,
    name: '海贼王',
    banner: '/22700.webp',
    intro: '草帽路飞伟大冒险',
  },
  {
    id: 33249,
    name: '间谍过家家',
    banner: '/15967.webp',
    intro: '非凡一家绝密生活',
  },
]

export const TV_TYPES = [
  {
    label: '内地剧',
    value: '20',
  },
  {
    label: '香港剧',
    value: '4',
  },
  {
    label: '台湾剧',
    value: '28',
  },
  {
    label: '欧美剧',
    value: '3',
  },
  {
    label: '韩剧',
    value: '5',
  },
  {
    label: '日剧',
    value: '6',
  },
  {
    label: '马泰剧',
    value: '7',
  },
]

export const CARTOON_TYPES = [
  {
    label: '国漫',
    value: '24',
  },
  {
    label: '日漫',
    value: '25',
  },
  {
    label: '欧美',
    value: '26',
  },
]

export const MOVIE_TYPES = [
  {
    label: '剧情片',
    value: '14',
  },
  {
    label: '动作片',
    value: '9',
  },
  {
    label: '科幻片',
    value: '12',
  },
  {
    label: '喜剧片',
    value: '11',
  },
  {
    label: '战争片',
    value: '15',
  },
  {
    label: '恐怖片',
    value: '13',
  },
  {
    label: '爱情片',
    value: '10',
  },
  {
    label: '纪录片',
    value: '16',
  },
  {
    label: '动画片',
    value: '23',
  },
]

export const CHANNEL_DATA = [
  {
    label: '电影',
    value: '2',
    children: MOVIE_TYPES,
  },
  {
    label: '电视剧',
    value: '1',
    children: TV_TYPES,
  },
  {
    label: '动漫',
    value: '17',
    children: CARTOON_TYPES,
  },
  {
    label: '综艺',
    value: '27',
    children: [
      {
        label: '综艺',
        value: '27',
      },
    ],
  },
]
