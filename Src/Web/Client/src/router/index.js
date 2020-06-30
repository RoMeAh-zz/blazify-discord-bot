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
        component: () => import("../views/Dashboard/Dashboard.vue")
    },
    {
        path: "/dashboard/guild/:id",
        name: "Guild_Dashboard",
        component: () => import("../views/Dashboard/Guild.vue")
    }
]

const router = new VueRouter({
    mode: 'history',
    base: "https://localhost:8080",
    routes
})

export default router
