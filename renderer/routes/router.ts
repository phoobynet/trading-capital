import { createRouter, createWebHashHistory } from 'vue-router'
import { defaultRoute } from '~/routes/default/defaultRoute'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [defaultRoute],
})
