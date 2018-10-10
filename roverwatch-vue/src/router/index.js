import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Contact from '@/components/Contact'
import Info from '@/components/Info'
import RoverCams from '@/components/RoverCams'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/info',
            name: 'Info',
            component: Info
        },
        {
            path: '/contact',
            name: 'Contact',
            component: Contact
        },
        {
            path: '/rovercams',
            name: 'RoverCams',
            component: RoverCams
        }
    ]

})
