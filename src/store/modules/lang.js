const state = {
    locale: 'en',
  };
  
  export const getters = {
    locale: state => state.locale,
  };
  
  export const mutations = {
    setLocale(state, locale) {
        state.locale = locale;
    }
  };
  
  export const actions = {
  
  };
  
  export default {
    state,
    getters,
    mutations,
    actions
  };