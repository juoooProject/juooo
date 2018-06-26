import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/home/Home.vue'
import Performance from '../views/performance/Performance'
import Mine from '../views/mine/Mine'
// import Address from "../components/addAddress"
import SpecializeArea from "../components/specializeArea"
import StudentArea from "../components/studentArea"

import Search from '../components/search/Search'
import ShowPerform from "../components/showPerform/showPerform"

import TourPerformanceDetail from "../components/indexRest/tourPerformanceDetail"



Vue.use(Router)

export default new Router({
  mode:"history",

  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
        children:[
            {
                path:'specialize',
                name:"specialize-area",
                component:SpecializeArea
            },
            {
                path:"student",
                name:"student-area",
                component:StudentArea
            },

        ]

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
      },
      {
          path:"/moreTour",
          name:"tour-performance-detail",
          component:TourPerformanceDetail
      }

  ]
})
