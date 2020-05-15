import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import user from './modules/user.js'

Vue.use(Vuex);

// const debug = process.env.NODE_ENV !== 'production'
const debug = true;

export default new Vuex.Store({
  modules: {
    user
  },
  plugins: [createPersistedState()],
  strict: debug
});