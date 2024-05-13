import { createApp } from 'vue'
import App from './App.vue'
import prof_list from './components/prof-list.vue'
import prof_detail from './components/prof-detail.vue'

createApp(App).mount('#app')
createApp(prof_list).mount('#prof_list')
createApp(prof_detail).mount('#prof_detail')
