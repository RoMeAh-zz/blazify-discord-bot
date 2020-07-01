import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import("../views/Home")
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("../views/Bot/Guilds.vue")
    },
    {
        path: "/dashboard/guild/:id",
        name: "Guild_Dashboard",
        component: () => import("../views/Settings/Settings.vue")
    },
    {
        path: "/info",
        name: "Info",
        component: () => import("../views/Bot/Info.vue")
    }
]

const router = new VueRouter({
    mode: 'history',
    base: "http://localhost:8080",
    routes
})

export default router
