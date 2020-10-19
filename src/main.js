import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router'
import store from "@/store/store";

createApp(App).use(router, store).mount('#app')