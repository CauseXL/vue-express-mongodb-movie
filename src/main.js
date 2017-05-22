// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import toastr from 'toastr'
import MuseUI from 'muse-ui'
import Vodal from 'vodal'
import axios from 'axios'

import 'toastr/build/toastr.min.css'
import 'muse-ui/dist/muse-ui.css'
import './assets/icon.css'
import 'vodal/fade.css'

import List from './components/List'
import Detail from './components/Detail'

Vue.use(MuseUI)
Vue.prototype.$http = axios
Vue.prototype.toastr = toastr
Vue.component(Vodal.name,Vodal)

// Vue.config.productionTip = false

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "3000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

Vue.filter('castsToString',(casts) => {
  return casts.map(item => {
    return item.name
  })
})

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })

new Vue({
  created(){
    toastr.success('启动成功!')
  },
  router,
  render: h => h(App)
}).$mount('#app')
