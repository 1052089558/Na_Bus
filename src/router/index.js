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
        redirect: "/showorder",
        component: Layout,
        children: [
            {
                path: "/showorder",
                component: () => import("../view/dispatch/showorder.vue"),
                name: "showorder",
            },
            {
                path: "/carapplay",
                component: () => import("../view/dispatch/carapplay.vue"),
                name: "carapplay",
             
            }
        ]
    },
];
 
const router = createRouter({
    history: createWebHistory(),
    routes,
});
 
export default router;