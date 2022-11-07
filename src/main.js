import { createApp } from 'vue'
import './assets/style/reset.css'
import App from './App.vue'
import store from "./store/index"
import router from "./router"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app=createApp(App)
app.use(store)
app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)
app.use(VXETable)
app.mount('#app')
