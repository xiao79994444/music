import axios from 'axios'
import QS from 'qs'
import { Message, Loading } from 'element-ui'

axios.defaults.baseURL = 'https://music-api-wine-omega.vercel.app'

axios.defaults.timeout = 5000
axios.defaults.withCredentials = true

// axios.defaults.headers['Content-Type'] = "applocation/x-www-form-urlencoded"
axios.defaults.transformRequest = data => QS.stringify(data)

var loadingInstance
// 设置请求拦截器
axios.interceptors.request.use(config => {
    loadingInstance = Loading.service({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    })
    // 携带token
    let token = localStorage.getItem('token')
    token && (config.headers.Authorization = token)
    return config
}, error => {
    loadingInstance.close()
    return Promise.reject(error)
})

// 设置响应拦截器
axios.interceptors.response.use(response => {
    loadingInstance.close()
    return response
}, error => {
    let { response } = error
    if (response) {
        switch (response.status) {
            case 401://当前请求用户需要验证（一般是未登录）
                break;
            case 403://一般是token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面
                Message.error('登录过期，请重新登录')
                break;
            case 404://找不到页面
                Message.error('网络请求不存在')
                break
        }

    } else {
        if (!window.navigator.onLine) {
            // 断网处理：跳转到断网页面/弹出蒙层
            return
        }
        return Promise.reject(error)
    }

})

export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
export default {
    get, post
}