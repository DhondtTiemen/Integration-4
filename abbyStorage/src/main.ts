import { createApp } from 'vue'
import './index.css'
import App from './App.vue'

import router from './bootstrap/router'
createApp(App).use(router).mount('#app')
