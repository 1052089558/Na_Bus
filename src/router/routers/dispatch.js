import Layout from "@/layout/index.vue";
let dispatch = [
  {
    path: "/dispatch",
    redirect: "/dispatch/showorder",
    component: Layout,
    children: [
      {
        path: "showorder",
        component: () => import("@/view/dispatch/showorder/index.vue"),
        name: "showorder",
        meta: { title: "查看订单", icon: "showorder", showfater: true },
        children: [
          {
            path: "outcar",
            component: () =>
              import("@/view/dispatch/showorder/outcar/index.vue"),
            name: "outcar",
            meta: { title: "派车/改派", icon: "outcar", showfater: false },
          },
        ],
      },
      {
        path: "carapplay",
        component: () => import("@/view/dispatch/carapplay/index.vue"),
        name: "carapplay",
        meta: { title: "用车申请", icon: "carapplay" },
      },
    ],
  },
];
export default dispatch;
