const state = {
    loggedIn: false,
    firstLogin: false,
    user: {},
  };
  
  export const getters = {
    isLoggedIn: state => state.loggedIn,
    loggedInUser: state => state.user.username,
    loggedInUserId: state => state.user.id,
  };
  
  export const mutations = {
    login(state, payload) {
      state.loggedIn = true;
      state.user = payload;
    },
    logout(state) {
      state.loggedIn = false;
      state.user = {};
    },
    successfulRegistration(state) {
      state.firstLogin = false;
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