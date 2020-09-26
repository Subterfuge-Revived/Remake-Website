const state = {
    loggedIn: false,
    firstLogin: false,
    user: {},
    token: null,
  };
  
  export const getters = {
    isLoggedIn: state => state.loggedIn,
    loggedInUser: state => state.user.name,
    loggedInUserId: state => state.user.id,
    userToken: state => state.token,
  };
  
  export const mutations = {
    login(state, payload) {
      state.loggedIn = true;
      state.user = payload.user;
      state.token = payload.token;
    },
    logout(state) {
      state.loggedIn = false;
      state.user = {};
      state.token = null;
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