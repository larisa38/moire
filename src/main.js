import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';

import {message} from './constants'
import {data} from './constants'
import send from './utils'

Vue.config.productionTip = false

new Vue({
  router: router,
  store,
  render: h => h(App),
}).$mount('#app')

send(message);
send(data.message);
