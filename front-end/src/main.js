import { createApp } from 'vue'
import './main.css'
import App from './App.vue';
import  * as VueRouter from 'vue-router';
import ProfsListe from './pages/ProfsListe.vue';
import ProfSeite from './pages/ProfSeite.vue';


createApp(App).use(VueRouter.createRouter({
    history: VueRouter.createWebHistory(process.env.BASE_URL),routes: [
        { path: '/', component: ProfsListe },
        { path: '/profs/:profId', component: ProfSeite }
    ]
})).mount('#app')
