// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './common/less/reset.less'
import 'lib-flexible/flexible'
import './common/less/style.less'
import axios from 'axios'
import SIdentify from './components/identify/identify'
Vue.use(SIdentify)
Vue.config.productionTip = false
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
