import { RouteRecordRaw } from 'vue-router'
import Default from '~/routes/default/Default.vue'

export const defaultRoute: RouteRecordRaw = {
  path: '/',
  component: Default,
  name: 'Default',
}
