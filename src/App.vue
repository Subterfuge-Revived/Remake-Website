<template>
  <body>
    <div id="app">
      <navbar></navbar>
      <router-view id="view"/>
    </div>
  </body>
</template>

<script>

import navbar from "./components/global/navbar.vue";

export default {
    components: { navbar }
}
</script>