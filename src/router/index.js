import { createRouter, createWebHistory } from "vue-router";
import  dispatch from "./routers/dispatch.js";
import Layout from '@/layout/index.vue'
const routes = [
    ...dispatch,
    {
        path:"/",
        name:"home",
        component:Layout,
        redirect:"/dispatch",
        children:[
            {
                path: "dispatch",
                component: () => import('@/view/dispatch/showorder/index.vue'),
                name: "dispatch",
                meta: { title:'查看订单',icon: 'showorder' },
            },
        ]
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../view/login.vue")
    },
    {
        path: '/404',
        name: '404',
        component: () => import('../view/errorPage/404.vue')
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/404'
    }
];
 
const router = createRouter({
    history: createWebHistory(),
    routes,
});
 
export default router;