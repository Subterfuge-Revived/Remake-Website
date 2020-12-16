<template>
    <div class="sea-bg">
        <Hero class="no-bg">
            <template slot="title">Under construction</template>
            <template slot="description">This page is still being created. Check back later :)</template>
        </Hero>
    </div>
</template>

<script>
import Hero from "../components/global/Hero";

export default {
    components: { Hero }
    
}
</script>

<style>

.grey-bg {
    background-color: gray
}

.sea-bg {
    background: url("../assets/sea.png");
    color: rgb(204, 204, 204)
}

.no-bg {
    background-color: rgba(0,0,0,0);
}

.profileBorder {
    border: 5px solid gray
}

</style>