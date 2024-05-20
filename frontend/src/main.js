import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import profdetail from './components/profdetail.vue'
import proflist from './components/proflist.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: proflist },
        { path: '/profdetail', component: profdetail }
    ]
})

createApp(App).use(router).mount('#app')
