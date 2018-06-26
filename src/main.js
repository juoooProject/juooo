// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './common/less/reset.less'
import 'lib-flexible/flexible'
import './common/less/style.less'
import axios from 'axios';
Vue.prototype.$http = axios;
Vue.prototype.$api="/api";
import $ from "jquery"

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
