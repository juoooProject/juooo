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

import Ticket from "../components/goods/goodInfo"
import HappyCard from "../components/happyCard/happyCard"

import Price from "../components/goods/buyNow"
import TourInfo from "../components/tourInfo/tourInfo"

import TimelySale from "../components/indexRest/timelySale"

import Register from '../components/register/Register'
import FinishRegister from '../components/finishRegister/FinishRegister'
import FindBackPwd from '../components/findBackPwd/FindBackPwd'
import AddressMain from '../components/address/AddressMain'
import AccountSetting from '../components/accountSetting/AccountSetting'
import CalendarMain from '../components/calendar/CalendarMain'

Vue.use(Router)


export default new Router({
  mode:"history",

  routes: [

    {
      path: '/',
      component: Home,
        children:[
            {
                path:'address',
                name:'address',
                component:AddressMain
            }
        ]
    },
      {
          path:'/specialize',
          name:"specialize-area",
          component:SpecializeArea
      },
      {
          path:"/student",
          name:"student-area",
          component:StudentArea
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
      component: Mine,
      children:[
          {
              path:'register',
              name:'register',
              component:Register
          },
          {
              path:'finishRegister',
              name:'finishRegister',
              component:FinishRegister
          },
          {
              path:'findBackPwd',
              name:'findBackPwd',
              component:FindBackPwd
          },
          {
              path:'accountSetting',
              name:'accountSetting',
              component:AccountSetting
          }
      ]
    },
      {
          path: '/search',
          name: 'search',
          component: Search
      },
      {
          path: '/calendarMain',
          name: 'calendarMain',
          component: CalendarMain
      },
      {
          path:"/moreTour",
          name:"tour-performance-detail",
          component:TourPerformanceDetail
      },
      {
          path:"/ticket",
          name:"ticket",
          component:Ticket
      },
      {
          path:"/happyCard",
          name:"happyCard",
          component:HappyCard
      },
      {
          path:"/price",
          name:"price",
          component:Price
      },
      {
          path: "/tourInfo",
          name: "tourInfo",
          component: TourInfo
      },
      {

          path:'/specialize',
          name:"specialize-area",
          component:SpecializeArea
      },
      {
          path:"/student",
          name:"student-area",
          component:StudentArea
      },
      {
          path:"/timely",
          name:"timely-sale",
          component:TimelySale

      }


  ]
})
