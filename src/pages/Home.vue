<template>
    <div>
        <Hero>
            <template slot="title">Welcome to {{ config.VUE_APP_TITLE }}</template>
            <template slot="header">Prepare to get betrayed</template>
            <template slot="description">
                <p class="mt-50">Create alliances, outplay your enemies, and backstab your friends. {{ config.VUE_APP_TITLE }} combines strategy and social engineering as you fight your way to victory.</p>
            </template>
            <b-container>
                <app-download></app-download>
            </b-container>
        </Hero>
    </div>
</template>

<script>

import Hero from "../components/global/Hero";
import navbar from "../components/global/navbar.vue";
import AppDownload from "../components/global/AppDownload.vue"

import sea from "../assets/sea.png";

// This is the default homepage component.
// Example usage: `<home/>`
export default {
    components: { navbar, Hero, AppDownload },
    data: function() {
        return {
            config: config,
        }
    },
    props: {
        // This is a test vuese comment.
        test: {
            type: String,
            default: "",
        }
    }
}
</script>

<style lang="scss">

.mt-50 {
    margin-top: 100px;
}

.appNameHeader {
    font-size: 70px;
    color: white;
}

.headerText {
    font-size: 45px;
}

</style>