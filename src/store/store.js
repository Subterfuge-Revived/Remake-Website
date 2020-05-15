import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import user from './modules/user.js';
import lang from './modules/lang.js';

Vue.use(Vuex);

// const debug = process.env.NODE_ENV !== 'production'
const debug = true;

export default new Vuex.Store({
  modules: {
    user,
    lang
  },
  plugins: [createPersistedState()],
  strict: debug
});