import Vue from 'vue'
import App from './App.vue'

import { VueLogger, LogLevel } from '@/vuelogger'

Vue.config.productionTip = false

let loggerConfig = {
  printModuleName: false,
  printLogTime: true,
  minLevelToPrint: process.env.NODE_ENV === 'production' ? LogLevel.ERROR : LogLevel.DEBUG
}

Vue.use(VueLogger, loggerConfig)

new Vue({
  render: h => h(App)
}).$mount('#app')
