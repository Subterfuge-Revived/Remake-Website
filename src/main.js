import Vue from 'vue';
import router from './router/router.js';
import store from './store/store.js';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
import vueHeadful from 'vue-headful';
import VueI18n from 'vue-i18n';
import Icon from 'vue-awesome/components/Icon';
import messages from './locale/strings';

// Import global scss files
import './style/global.scss'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueI18n)
Vue.component('v-icon', Icon)
Vue.component('vue-headful', vueHeadful);
Vue.use(BootstrapVue);

const i18n = new VueI18n({
    locale: store.state.lang.locale,
    messages,
})

/**
 * CREATING VUE
 */
let vm = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');

global.vm = vm;