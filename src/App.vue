<template>
  <body>
    <div id="app" :key="$route.fullPath">
      <navbar></navbar>
      <router-view id="view"/>
    </div>
  </body>
</template>

<script>

import navbar from "./components/global/navbar.vue";
import axios from 'axios';

export default {
    components: { navbar },
    created() {
      axios.interceptors.response.use(
        (success) => {
          return success;
        },
        (error) => {
          this.$bvToast.toast(
            error.message, {
              title: 'Error sending request to server.',
              toaster: 'b-toaster-bottom-right',
              variant: 'danger',
              solid: true,
            }
          );
          return Promise.reject(error);
        }
      )
    }
}
</script>

<style>
html * {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background: rgba(155, 193, 255, 1) url("./assets/TiledSpecialistBackground.png");
  background-blend-mode: multiply;
}

p {
  color: rgb(164, 157, 157);
}

.white {
  color: white;
}

.black {
  color: black;
}

</style>