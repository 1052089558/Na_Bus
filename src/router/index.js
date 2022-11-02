import { createRouter, createWebHistory } from "vue-router";
const routes = [
    {
        path: "/",
        name: "default",
        redirect: "login",
        component: () => import("../view/login.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../view/login.vue")
    },
];
 
const router = createRouter({
    history: createWebHistory(),
    routes,
});
 
export default router;