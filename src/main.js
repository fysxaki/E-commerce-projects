//引入初始化样式文件
import "@/styles/common.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";


// 引入懒加载插件并注册
import { lazyPlugin } from "./directives";
// 引入全局组件插件
import { componentsPlugin } from "@/components";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const app = createApp(App);
const pinia = createPinia();

// 注册持久化插件
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(lazyPlugin);
app.use(componentsPlugin);
app.mount("#app");
