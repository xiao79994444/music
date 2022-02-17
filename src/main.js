import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/style/theme/index.css'
import './assets/fonts/fonts.css'
import 'lib-flexible/flexible'
Vue.use(ElementUI);

Vue.filter('formatCount', (count) => {
    if (count < 100000) {
        return count
    } else if (count < 100000000) {
        let c = count / 10000
        return c.toFixed(1) + '万'
    } else {
        let c = count / 100000000
        return c.toFixed(1) + '亿'
    }
})

Vue.filter('formatTime', (time) => {
    if (time < 60000) {
        let s = parseInt(time / 1000)
        return s > 10 ? '00:' + s : '00:' + '0' + s
    } else if (time < 3600000) {
        let m = parseInt(time % 3600000 / 60000)
        let s = parseInt(time % 60000 / 1000)
        m = m > 9 ? m : "0" + m
        s = s > 9 ? s : "0" + s
        return m + ':' + s
    } else {
        let h = parseInt(time % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
        let m = parseInt(time % 3600000 / 60000)
        let s = parseInt(time % 60000 / 1000)
        h = h > 9 ? h : '0' + h
        m = m > 9 ? m : "0" + m
        s = s > 9 ? s : "0" + s
        return h + ':' + m + ':' + s
    }
})

Vue.config.productionTip = false


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
