<template>
  <b-navbar class="p-3" toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="/">{{ $t('appName') }}</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="/about">About</b-nav-item>
        <b-nav-item href="/participate">Get Involved!</b-nav-item>
        <b-nav-item href="/blog">Dev-Blog</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
          <b-nav-item href="https://discord.gg/vYRfPSQ" target="_blank">
            <img style="height: 30px;" :src=icons.discord />
        </b-nav-item>
        
        <b-nav-item href="https://github.com/Subterfuge-Revived" target="_blank">
            <img style="height: 30px;" :src=icons.github />
        </b-nav-item>

        <b-nav-item-dropdown v-bind:text="'Lang: ' + this.lang " right>
          <b-dropdown-item v-for="key in locales" v-bind:key="key" href="#" @click="updateLocale(key)">{{ key.toUpperCase() }}</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right v-if="user != null">
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
              <img style="height: 30px; width: 30px;" :src=icons.user />
          </template>

          <b-dropdown-item disabled>Welcome, {{ user.username }}!</b-dropdown-item>
          <b-dropdown-item :href="'/account?id=' + user.id">Account</b-dropdown-item>
          <b-dropdown-item v-if="isAdmin()" href="/admin">Admin Portal</b-dropdown-item>
          <b-dropdown-item href="/" @click="signout()">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-button variant="dark" v-else href="/login">Login</b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>

import github from "../../assets/github.png";
import discord from "../../assets/discord.png";
import userIcon from "../../assets/user.png";

export default {
    name: 'navbar',
    data() {
      return {
        icons: {
          github: github,
          discord: discord,
          user: userIcon,
        },
        user: JSON.parse(localStorage.getItem('user')),
        lang: localStorage.getItem('lang'),
        locales: ['en', 'fr', 'ja'],
      };
    },
    methods: {
        updateLocale: (key) => {
          localStorage.setItem('lang', key);
          this.lang = key;
        },
        signout() {
          localStorage.setItem('user', null);
          localStroage.setItem('access_token', null);
        },
        isAdmin() {
          if(this.user != null && this.user != undefined) {
            if(this.user.claims.includes("Administrator")) {
              return true;
            }
          }
          return false;
        }
    }
}
</script>