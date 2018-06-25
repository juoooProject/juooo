import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/Home.vue'
import Performance from '../views/performance/Performance'
import Mine from '../views/mine/Mine'
import Register from '../components/register/Register'
import FinishRegister from '../components/finishRegister/FinishRegister'
import FindBackPwd from '../components/findBackPwd/FindBackPwd'
import AddressMain from '../components/address/AddressMain'
import AccountSetting from '../components/accountSetting/AccountSetting'
Vue.use(Router)

export default new Router({
    mode:'history',
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
      component: Performance
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
    }
  ]
})
