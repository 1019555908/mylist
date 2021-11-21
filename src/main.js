import Vue from 'vue'
import App from './App.vue'
import router from './route/router.js'
import size from './assets/js/size.js'
import Router from 'vue-router'
import store from './store/store'
import { Lazyload } from 'vant';



import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// new Vue({
//   el: '#app',
//   render: h => h(App)
// });
Vue.use(Lazyload);
// import less from 'less'
// Vue.use(less)
Vue.config.productionTip = false
Vue.config.productionSourceMap = false

new Vue({
  router,
  size,
  Router,
  store,
  // less,
  render: h => h(App),
}).$mount('#app')
