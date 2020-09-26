import strings from "../../locale/strings.js";

const state = {
    locale: 'en',
    appName: 'Subterfuge 2.0',
  };
  
  export const getters = {
    locale: state => state.locale,
    appName: state => state.appName,
    getLocales: state => {
      let locales = [];
      for(let key in strings) {
        locales.push(key)
      }
      return locales;
    },
  };
  
  export const mutations = {
    setLocale(state, locale) {
        state.locale = locale;
        vm.$i18n.locale = locale;
    },
  };
  
  export const actions = {
  
  };
  
  export default {
    state,
    getters,
    mutations,
    actions
  };