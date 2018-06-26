import Vue from 'vue'
import Router from 'vue-router'

import Search from '../components/search/Search'
import ShowPerform from "../components/showPerform/showPerform"

import Home from '../views/home/Home.vue'
import Performance from '../views/performance/Performance'
import Mine from '../views/mine/Mine'


Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,

    },
    {
      path: '/performance',
      name: 'performance',
      component: Performance,
      children:[
          {
              path:"/",
              redirect:"showPerform"
          },
          {
            path:"showPerform",
            name:"showPerform",
            component:ShowPerform
          }
      ]
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine
    },
      {
          path: '/search',
          name: 'search',
          component: Search
      }
  ]
})
