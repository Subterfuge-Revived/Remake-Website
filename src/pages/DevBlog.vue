<template>
    <div>
        <Hero>
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

.profileBorder {
    border: 5px solid gray
}

</style>