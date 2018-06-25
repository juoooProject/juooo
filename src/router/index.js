import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Performance from '../views/Performance'
import Mine from '../views/Mine'
import Search from '../views/Mine'
import ShowPerform from "../components/showPerform/showPerform"
Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/performance',
      name: 'performance',
      component: Performance,
      children:[
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
    }
  ]
})
