// createRouter：创建router实例对象
// createWebHistory：创建history模式的路由
import { createRouter, createWebHistory } from "vue-router";

import Login from "@/views/Login/index.vue";
import Layout from "@/views/Layout/index.vue";
import Category from "@/views/Category/index.vue";
import Home from "@/views/Home/index.vue";

import SubCategory from "@/views/SubCategory/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 要在App给一级路由出口 routerview
      path: "/",

      component: Layout,

      // 要在layout给二级路由出口 routerview
      children: [
        {
          path: "category/:id",
          component: Category,
        },
        {
          // 默认页面
          path: "",
          component: Home,
        },
        {
          path: "category/sub/:id",
          component: SubCategory,
        },
      ],
    },
    {
      path: "/login",
      component: Login,
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

// 导出路由
export default router;
