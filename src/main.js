import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueBarcodeScanner from 'vue-barcode-scanner'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import "@mdi/font/css/materialdesignicons.min.css";

Vue.config.productionTip = false
let options = {
  sound: true, // default is false
  soundSrc: '/static/sound.wav', // default is blank
  sensitivity: 300, // default is 100
  requiredAttr: true, // default is false
  controlSequenceKeys: ['NumLock', 'Clear'], // default is null
  callbackAfterTimeout: true // default is false
}
Vue.use(VueBarcodeScanner,options)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
