<template>
  <b-container class="download-border mt-40">
    <h4 class="p-3 text-center">Currently under development!</h4>
    <p class="descriptionText text-center"> Expected launch: Unknown </p>
    <b-row class="download-padding">
        <b-col class="strikethrough">
            <img class="blocked-image " :src=icons.ios />
        </b-col>
        <b-col class="strikethrough">
            <img class="blocked-image strikethrough" :src=icons.google />
        </b-col>
        <b-col class="strikethrough">
            <img class="blocked-image strikethrough" :src=icons.steam />
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
import iosStore from "../../assets/ios_store.png";
import playStore from "../../assets/play_store.png";
import steamStore from "../../assets/steam_store.png";

export default {
    name: 'download',
    data() {
        return {
            icons: {
                ios: iosStore,
                google: playStore,
                steam: steamStore,
            }
        };
    },
}
</script>

<style>
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

.descriptionText {
    font-size: 20px;
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

.blocked-image {
    filter: grayscale(100%);
}

.mt-40 {
    margin-top: 100px;
}

.wide-30 {
    width: 35%;
}

img {
    max-width:100%;
    max-height:100%;
}
</style>