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
            <img style="height: 30px;" src="../../assets/discord.png"/>
        </b-nav-item>
        
        <b-nav-item href="https://github.com/Subterfuge-Revived" target="_blank">
            <img style="height: 30px;" src="../../assets/github.png"/>
        </b-nav-item>

        <b-nav-item-dropdown v-bind:text="'Lang: ' + $store.getters.locale.toUpperCase()" right>
          <b-dropdown-item v-for="key in $store.getters.getLocales" v-bind:key="key" href="#" @click="updateLocale(key)">{{ key.toUpperCase() }}</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right v-if="$store.state.user.loggedIn">
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
              <img style="height: 30px;" src="../../assets/user.png"/>
          </template>

          <b-dropdown-item disabled>Welcome, {{ $store.getters.loggedInUser }}!</b-dropdown-item>
          <b-dropdown-item href="#">Account</b-dropdown-item>
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
import user from "../../assets/user.png";

export default {
    name: 'navbar',
    state: {
    },
    methods: {
        updateLocale: (key) => {
            vm.$store.commit('setLocale', key);
        },
        signout() {
          vm.$store.commit('logout');
        }
    }
}
</script>