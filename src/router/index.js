import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/Home.vue'
import Performance from '../views/performance/Performance'
import Mine from '../views/mine/Mine'

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
