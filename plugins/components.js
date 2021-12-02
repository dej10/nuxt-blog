import Vue from 'vue'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'

import loading from 'vuejs-loading-screen'

Vue.use(loading, {
  bg: '#FAEDF0',
  icon: 'refresh',
  size: 3,
  icon_color: 'white'
})
Vue.use(VueToast)
