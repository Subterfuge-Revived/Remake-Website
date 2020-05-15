import Vue from 'vue';
import router from './router/router.js';
import store from './store/store.js';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
import vueHeadful from 'vue-headful';
import Icon from 'vue-awesome/components/Icon'

// Import global scss files
import './style/global.scss'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.component('v-icon', Icon)
Vue.component('vue-headful', vueHeadful);
Vue.use(BootstrapVue);

/**
 * CREATING VUE
 */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');