import { get, post } from '../utils/http'

// 推荐mv
const personalizedMv = data => get('/personalized/mv', data)

// 全部 mv
const mvall = data => get('/mv/all', data)

export default { personalizedMv, mvall }