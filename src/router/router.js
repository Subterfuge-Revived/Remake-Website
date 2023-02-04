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
  base: config.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: false },
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: { requiresAuth: false },
    },
    {
      path: '/participate',
      name: 'participate',
      component: GetInvolved,
      meta: { requiresAuth: false },
    },
    {
      path: '/blog',
      name: 'blog',
      component: DevBlog,
      meta: { requiresAuth: false },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresAuth: false },
    },
    {
      path: '/account',
      name: 'account',
      component: Account,
      meta: { requiresAuth: true },
    },
    {
      path: '/lobby',
      name: 'lobby',
      component: Lobby,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: { requiresAuth: true },
    }
  ]
});

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth && localStorage.getItem('user') == null) {
    return { path: '/login', query: { redirect: to.fullPath } };
  }
  next()
})

export default router;