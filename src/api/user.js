import { get, post } from '../utils/http'

// 登录请求
const login = data => post('/login/cellphone', data)



export default { login }