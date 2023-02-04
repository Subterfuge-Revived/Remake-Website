import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../pages/Home.vue';
import About from '../pages/About.vue';
import DevBlog from '../pages/DevBlog.vue';
import GetInvolved from '../pages/GetInvolved.vue';
import Login from '../pages/Login.vue';
import Account from '../pages/Account.vue';
import Admin from '../pages/Admin.vue';
import Lobby from '../pages/Lobby.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: config.NODE_ENV === 'production' ? 'hash' : 'history',
  base: config.BASE_URL,
  routes: [
    {
      path: config.BASE_URL + '',
      name: 'home',
      component: Home
    },
    {
      path: config.BASE_URL + 'about',
      name: 'about',
      component: About
    },
    {
      path: config.BASE_URL + 'participate',
      name: 'participate',
      component: GetInvolved
    },
    {
      path: config.BASE_URL + 'blog',
      name: 'blog',
      component: DevBlog
    },
    {
      path: config.BASE_URL + 'login',
      name: 'login',
      component: Login
    },
    {
      path: config.BASE_URL + 'account',
      name: 'account',
      component: Account
    },
    {
      path: config.BASE_URL + 'lobby',
      name: 'lobby',
      component: Lobby
    },
    {
      path: config.BASE_URL + 'admin',
      name: 'admin',
      component: Admin
    }
  ]
});

export default router;