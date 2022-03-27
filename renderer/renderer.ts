import { createApp } from 'vue'
import App from '~/App.vue'
import { router } from '~/routes/router'
import '~/index.css'
import { numeric } from '~/directives/numeric'
import { focusOnSelect } from '~/directives/focusOnSelect'

const app = createApp(App)
app.use(router)
app.directive('numeric', numeric)
app.directive('focusOnSelect', focusOnSelect)
app.mount('#app')
