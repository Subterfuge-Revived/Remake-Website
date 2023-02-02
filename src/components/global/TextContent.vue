<template>
  <div class="subterfuge-text blue-bg">
      <slot/>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

.blue-bg {
    background-color: rgba(44, 63, 82, 0.342);
    background-blend-mode: color-burn;
    border: 0.5px solid rgba(164, 164, 164, 0.2);
    border-radius: 5px;
    overflow: hidden;
}

h1, h2, h3, h4, h5, h6 {
    color: rgb(201, 201, 201);
}

p {
    color: rgb(164, 164, 164);
    margin-bottom: 0px;
}

</style>