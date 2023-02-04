<template>
    <div>
        <Hero class="no-bg">
            <template slot="title">We are subterfuge</template>
            <template slot="description">This project is an <a href="https://github.com/Subterfuge-Revived">open-sourced</a> initiative to revitalize <a href="http://subterfuge-game.com/">Subterfuge</a>, a week-long game of strategy and diplomacy.
        Subterfuge plays out in real-time over a week, allowing players to form alliances, plan attacks, and assault their enemies. Our goal with this
        project is to create a game that takes the subterfuge gameplay and builds upon it. The remake will provide some much needed bug fixes while also adding customization and new features to keep the game unique.</template>
        </Hero>

        <Hero>
            <template slot="title">Our Team</template>
            <template slot="description">Our development team collaborates through Discord. <a href="https://discord.gg/SEyN2Bs">Join the conversation!</a></template>
            <b-container class="text-center p-4">
                <b-row align-h="center">
                    <b-col md="6" lg="3">
                        <img class="rounded-circle profileBorder" src="../assets/contributors/riot.png" aria-hidden="true">
                        <h3 class="white">R10t--</h3>
                        <p>Project Lead / Lead Developer / Software Architect</p>
                    </b-col>
                    <b-col md="6" lg="3">
                        <img class="rounded-circle profileBorder" src="../assets/contributors/noj.png" aria-hidden="true">
                        <h3 class="white">Nojo</h3>
                        <p>Project Lead / Supervisor </p>
                    </b-col>
                    <b-col md="6" lg="3">
                        <img class="rounded-circle profileBorder" src="../assets/contributors/aluce.png" aria-hidden="true">
                        <h3 class="white">Aluce</h3>
                        <p>Software Architect</p>
                    </b-col>
                    <b-col md="6" lg="3">
                        <img class="rounded-circle profileBorder" src="../assets/contributors/cakemix.png" aria-hidden="true">
                        <h3 class="white">CakeMixV3</h3>
                        <p>Sound Art</p>
                    </b-col>
                </b-row>
                <b-row align-h="center">
                    <b-col md="6" lg="3">
                        <img class="rounded-circle profileBorder" src="../assets/contributors/lyds.png" aria-hidden="true">
                        <h3 class="white">Lyds</h3>
                        <p>Community Engagement</p>
                    </b-col>
                    <b-col md="6" lg="3">
                        <img class="rounded-circle profileBorder" src="../assets/contributors/niverio.png" aria-hidden="true">
                        <h3 class="white">Niverio</h3>
                        <p>Game Design</p>
                    </b-col>
                    <b-col md="6" lg="3">
                        <img class="rounded-circle profileBorder" src="../assets/contributors/TW2000.png" aria-hidden="true">
                        <h3 class="white">TW2000</h3>
                        <p>Developer</p>
                    </b-col>
                    <b-col md="6" lg="3">
                        <img class="rounded-circle profileBorder" src="../assets/contributors/xatev.png" aria-hidden="true">
                        <h3 class="white">XATEV</h3>
                        <p>Developer</p>
                    </b-col>
                </b-row>
                <b-row align-h="center">
                    <b-col md="6" lg="3">
                        <img class="rounded-circle profileBorder" src="../assets/contributors/chip.gif" aria-hidden="true">
                        <h3 class="white">Chipmunk</h3>
                        <p>Supervisor</p>
                    </b-col>
                </b-row>
            </b-container>
        </Hero>
        <Hero>
            <template slot="title">Special Thanks</template>
            <template slot="description">
                To you. Without our community, we would not be where we are today. <br/><br/>
                So many contributions have been put into this project, and we cannot express how much help the community input has been in making this project a reality.<br/><br/>
                As always, thank you for <a href="https://discord.gg/SEyN2Bs">being part of the conversation!</a>
            </template>
        </Hero>
    </div>
</template>

<script>

import Hero from "../components/global/Hero";

import aluce from "../assets/contributors/aluce.png";
import cakemix from "../assets/contributors/cakemix.png";
import chip from "../assets/contributors/chip.gif";
import lyds from "../assets/contributors/lyds.png";
import niverio from "../assets/contributors/niverio.png";
import noj from "../assets/contributors/noj.png";
import riot from "../assets/contributors/riot.png";
import tw from "../assets/contributors/TW2000.png";
import xatev from "../assets/contributors/xatev.png";

export default {
    components: { Hero }
    
}
</script>

<style>

.grey-bg {
    background-color: gray
}

.no-bg {
    background-color: rgba(0,0,0,0);
}

.profileBorder {
    border: 5px solid gray
}

</style>