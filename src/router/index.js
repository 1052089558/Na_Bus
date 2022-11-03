import { createRouter, createWebHistory } from "vue-router";
import Layout from '../layout/index.vue'
const routes = [
    {
        path: "/login",
        name: "login",
        component: () => import("../view/login.vue")
    },
    {
        path: "/",
        name:"/",
        redirect: "/home",
        component: Layout,
        children: [
            {
                path: "home",
                component: () => import("../view/home/index.vue"),
                name: "Home",
                meta: { title: '首页', icon: "house" }
            }
        ]
    },
];
 
const router = createRouter({
    history: createWebHistory(),
    routes,
});
 
export default router;