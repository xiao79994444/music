import { get, post } from '../utils/http'

// 推荐歌单请求
const personalized = data => get('/personalized', data)

// 歌单标签请求
const playlisttags = data => get('/playlist/hot', data)

// 获取精品歌单页面头部数据
const playlisttop = data => get('/top/playlist/highquality', data)

// 获取歌单列表数据
const playlist = data => get('/top/playlist/detail', data)








export default { personalized, playlisttags, playlisttop, playlist }