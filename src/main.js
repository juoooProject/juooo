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

import axios from 'axios';
Vue.prototype.$http = axios;
Vue.prototype.$api="/api";
import $ from "jquery"


import "./assets/css/mixin.less"

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
