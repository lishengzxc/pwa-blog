import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import List from './List.vue'
import Blog from './Blog.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: List },
  { path: '/blog/:id', component: Blog }
]

const router = new VueRouter({ routes })

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
