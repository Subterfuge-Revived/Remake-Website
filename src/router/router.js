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
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/participate',
      name: 'participate',
      component: GetInvolved
    },
    {
      path: '/blog',
      name: 'blog',
      component: DevBlog
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    },
    {
      path: '/lobby',
      name: 'lobby',
      component: Lobby
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ]
});

export default router;