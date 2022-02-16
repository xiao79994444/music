import { get, post } from '../utils/http'

// 轮播图banner请求
const banner = data => get('/banner', data)

// 主页最新音乐请求
const newsong = data => get('/personalized/newsong')

// 新歌速递
const topsongs = data => get('/top/song', data)








export default { banner, newsong, topsongs }