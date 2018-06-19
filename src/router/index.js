import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Performance from '../views/Performance'
import Mine from '../views/Mine'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/performance',
      name: 'performance',
      component: Performance
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine
    }
  ]
})
