import { createApp } from 'vue'
import App from '~/App.vue'
import { router } from '~/routes/router'
import '~/index.css'

createApp(App).use(router).mount('#app')
