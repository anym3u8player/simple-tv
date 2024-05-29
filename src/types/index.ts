export interface Category {
  id: number
  pid: number
  type: number
  name: string
  isVertical: number
  children?: Category[]
}

export interface VideoList {
  total: number
  list: VideoItem[]
  update: number
  count: number
}

interface Director {
  id: number
  name: string
  introduce: string
  areas: string
  avatar: string
  num: number
  englishName: string
  Profession: string
  Popularity: number
}

interface Area {
  id: number
  name: string
}

export interface VideoItem {
  id: number
  name: string
  horizontalPoster: string
  verticalPoster: string
  screenshot: string
  date: number
  category: Category[]
  watchNums: number
  popularity: number
  title: string
  surfacePlot: string
  recommend: number
  cycle: number
  chargingMode: number
  note: string
  introduce: string
  cycleImg: string
  duration: number
  number: number
  categoryPid: number
  categoryChildId: number
  buyMode: number
  gold: number
  currency: number
  ScoreFormat: string
  DbScore: number
  total: number
  num: number
  end: boolean
  directors: Director[]
  actors: Director[]
  areas: Area[]
  year: string
  tag: Area[]
  shelfDate: number
  releaseDate: number
  isVertical: number
}

interface VideoBrief {
  id: number
  name: string
}

export interface VideoInfoDetail {
  pre: VideoBrief
  info: VideoInfo
  next: VideoBrief
}

export interface Addr {
  id: number
  name: string
  url: string
  sort: number
  index: number
  chargingMode: number
  currency: number
  subTitle: string
}

export interface PlayLine {
  id: number
  name: string
  sort: number
  addr: Addr[]
  addrNum: number
}

interface CelebrityList {
  id: number
  chineseName: string
  headImg: string
}

interface Playline {
  id: number
  videoLineID: number
  videoID: number
  name: string
  sort: number
  file: string
  chargingMode: number
  currency: number
  subTitle: string
  status: number
  createAt: number
  updateAt: number
  siteId: number
  tag: string
  liveSource: number
}

interface Line {
  id: number
  name: string
  videoID: number
  sort: number
  playline: Playline[]
}

interface Info {
  id: number
  title: string
  surfacePlot: string
  recommend: number
  cycle: number
  chargingMode: number
  note: string
  introduce: string
  cycleImg: string
  duration: number
  number: number
  categoryPid: number
  categoryChildId: number
  buyMode: number
  currency: number
  siteId: number
  imdbScore: number
  doubanScore: number
  scoreFormat: string
  directors: string
  actors: string
  label: string
  region: string
  language: string
  year: string
  celebrityList: CelebrityList[]
  lines: Line[]
}

export interface VideoInfo {
  id: number
  name: string
  alias: string
  date: number
  surfacePlot: string
  verticalPoster: string
  horizontalPoster: string
  screenshot: string
  duration: number
  playLines: PlayLine[]
  playLineNum: number
  directors: Director[]
  actors: Director[]
  languages: VideoBrief[]
  areas: VideoBrief[]
  category: VideoBrief
  categoryChild: VideoBrief
  releaseDate: number
  shelfDate: number
  total: number
  num: number
  end: boolean
  unit: string
  tag: VideoBrief[]
  publish: string
  special: string
  popularity: number
  watch: number
  introduce: string
  dbScore: number
  scoreFormat: string
  info: Info
  isVertical: number
}
