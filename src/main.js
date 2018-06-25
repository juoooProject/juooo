// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './common/less/reset.less'
import 'lib-flexible/flexible'
import  "./assets/js/tween"
import './common/less/style.less'
import "./assets/css/mixin.less"
import axios from "axios";
import $ from "jquery"
Vue.prototype.$http = axios; //将axios作为Vue的原型来使用
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
