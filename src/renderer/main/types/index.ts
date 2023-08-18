export interface Video {
  vod_id: number
  vod_name: string
  type_id: number
  type_name: string
  vod_time: string
  vod_remarks: string
  vod_play_from: string
  type_id_1: number
  vod_sub: string
  vod_duration: string
  vod_status: string
  vod_tag: string
  vod_pic: string
  vod_actor: string
  vod_director: string
  vod_pubdate: string
  vod_total: number
  vod_area: string
  vod_lang: string
  vod_year: string
  vod_isend: number
  vod_score: string
  vod_douban_id: number
  vod_douban_score: string
  vod_content: string
  vod_play_url: string
}

export interface PlayItem {
  name: string
  url: string
  index: number
}
