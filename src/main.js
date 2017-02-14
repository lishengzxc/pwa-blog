import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import List from './List.vue'
import Blog from './Blog.vue'

Vue.use(VueRouter)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(reg) {
    
    if(reg.installing) {
      console.info('Service worker installing');
    } else if(reg.waiting) {
      console.info('Service worker installed');
    } else if(reg.active) {
      console.info('Service worker active');
    }
    
  }).catch(function(error) {
    // registration failed
    console.error('Registration failed with ' + error);
  });
}

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
