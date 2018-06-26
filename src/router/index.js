import Vue from 'vue'
import Router from 'vue-router'

import Search from '../components/search/Search'
import ShowPerform from "../components/showPerform/showPerform"

import Home from '../views/home/Home.vue'
import Performance from '../views/performance/Performance'
import Mine from '../views/mine/Mine'

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
      path: '/home',
      name: 'home',
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
      }
  ]
})
