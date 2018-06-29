// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './common/less/reset.less'
import 'lib-flexible/flexible'
import  "./assets/js/tween"
import './common/less/style.less'
import 'mint-ui/lib/style.min.css'
import axios from 'axios'
import SIdentify from './components/identify/identify'

import "./assets/css/mixin.less"

import {saveSearch} from "./cache/index"

import './assets/css/my-mint.css'
Vue.use(SIdentify)


Vue.prototype.$http = axios;
Vue.prototype.$api="/api";
import $ from "jquery"


import "./assets/css/mixin.less"

Vue.config.productionTip = false

/* eslint-disable no-new */
// router.beforeEach((to,from,next)=>{
//   if(to.path==='/mine/register' || to.path==='/mine'){
//     sessionStorage.removeItem('user')
//   }
//   let user = JSON.parse(sessionStorage.getItem('user'))
//   if(!user && (to.path === '/my-page')){
//     next({path:'/login'})
//   }else{
//     next()
//   }
// })
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
