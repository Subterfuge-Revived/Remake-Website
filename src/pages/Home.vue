<template>
    <div>
        <navbar/>
        <b-jumbotron class="sea-bg">
            <div class="text-center">
                <p class="appNameHeader"> Welcome to {{ $t('appName') }} </p>
                <p class="headerText"> Prepare to get betrayed </p>
            </div>

            <b-container class="mt-50 wide-30 descriptionText text-center">
                <p>Create alliances, outplay your enemies, and backstab your friends. {{ $t('appName') }} combines strategy and social engineering as you fight your way to victory.</p>
            </b-container>

            <b-container class="download-border mt-40">
                <h4 class="p-3 text-center">Currently under development!</h4>
                <p class="descriptionText text-center"> Expected launch: Unknown </p>
                <b-row class="download-padding">
                    <b-col class="strikethrough">
                        <img class="blocked-image " src="../assets/ios_store.png"/>
                    </b-col>
                    <b-col class="strikethrough">
                        <img class="blocked-image strikethrough" src="../assets/play_store.png"/>
                    </b-col>
                    <b-col class="strikethrough">
                        <img class="blocked-image strikethrough" src="../assets/steam_store.png"/>
                    </b-col>
                </b-row>
            </b-container>

        </b-jumbotron>
    </div>
</template>

<script>

import navbar from "../components/global/navbar.vue";
import iosStore from "../assets/ios_store.png";
import playStore from "../assets/play_store.png";
import steamStore from "../assets/steam_store.png";
import sea from "../assets/sea.png";

// This is the default homepage component.
// Example usage: `<home/>`
export default {
    components: { navbar },
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

img {
    max-width:100%;
    max-height:100%;
}

.download-border {
    color: rgb(231,237,240);
    border: 1px solid rgb(15, 20, 24);
    border-radius: 10px;
    background-color: rgba(15, 20, 24, 0.75);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.download-padding {
    padding: 40px;
    padding-top: 10px;
}

.mt-50 {
    margin-top: 150px;
}

.mt-40 {
    margin-top: 100px;
}

.wide-30 {
    width: 35%;
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

.descriptionText {
    font-size: 20px;
}

.blocked-image {
    filter: grayscale(100%);
}

.strikethrough {
  position: relative;
}
.strikethrough:before {
  position: absolute;
  content: "";
  left: 0;
  top: 50%;
  right: 0;
  border-top: 1px solid;
  border-color: inherit;
  z-index: 99;

  -webkit-transform:rotate(-5deg);
  -moz-transform:rotate(-5deg);
  -ms-transform:rotate(-5deg);
  -o-transform:rotate(-5deg);
  transform:rotate(-5deg);
}

</style>