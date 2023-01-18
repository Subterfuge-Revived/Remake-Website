<template>
    <div>
        <Hero class="sea-bg">
            <template slot="title">Welcome to {{ $t('appName') }}</template>
            <template slot="header">Prepare to get betrayed</template>
            <template slot="description">
                <p class="mt-50">Create alliances, outplay your enemies, and backstab your friends. {{ $t('appName') }} combines strategy and social engineering as you fight your way to victory.</p>
            </template>
            <app-download></app-download>
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
    margin-top: 150px;
}

.sea-bg {
    background: url("../assets/sea.png");
    color: rgb(204, 204, 204)
}

.appNameHeader {
    font-size: 70px;
    color: white;
}

.headerText {
    font-size: 45px;
}

</style>