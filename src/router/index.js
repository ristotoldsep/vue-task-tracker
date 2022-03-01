import {createRouter, createWebHistory} from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home //The component we want to render
    },
    {
        path: '/about',
        name: 'About',
        component: About //The component we want to render
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router