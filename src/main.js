import { createApp } from 'vue'
import './assets/reset.css'
import App from './App.vue'
import { createPinia } from "pinia"
import piniaPersist from 'pinia-plugin-persist'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from "./router"
const app=createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
