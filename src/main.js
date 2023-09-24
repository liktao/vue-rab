import { createApp } from "vue";
import { createPinia } from "pinia";
// 引入全局组件插件
// import { componentPlugin } from "@/components/";

import App from "./App.vue";
import router from "./router";

// 引入初始化样式文件
import "@/styles/common.scss";

// 全局指令注册
import { lazyPlugin } from "@/directives";
import { componentPlugin} from '@/components/index.js'

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(componentPlugin );
app.use(lazyPlugin);

app.mount("#app");
