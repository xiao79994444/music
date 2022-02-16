import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pags/home/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        redirect: '/discovery',
        children: [
            {
                path: '/discovery',
                name: 'Discovery',
                component: () => import(/* webpackChunkName: "about" */ '../pags/discovery/discovery.vue')
            },
            {
                path: '/playlists',
                name: 'PlayLists',
                component: () => import(/* webpackChunkName: "about" */ '../pags/playlist/playlists.vue')
            },
            {
                path: '/songs',
                name: 'Songs',
                component: () => import(/* webpackChunkName: "about" */ '../pags/songs/songs.vue')
            },
            {
                path: '/mvs',
                name: 'Mvs',
                component: () => import(/* webpackChunkName: "about" */ '../pags/mvs/Mvs.vue')
            }
        ]
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../pags/mvs/Mvs.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
