<template>
    <div class="sea-bg">
        <Hero class="no-bg">
            <template slot="title">We are subterfuge</template>
            <template slot="description">This project is an <a href="/participate">open-sourced</a> initiative to revitalize <a href="http://subterfuge-game.com/">Subterfuge</a>, a week-long game of strategy and diplomacy.
        Subterfuge plays out in real-time over a week, allowing players to form alliances, plan attacks, and assault their enemies. Our goal with this
        project is to create a game that takes the subterfuge gameplay and builds upon it. The remake will provide some much needed bug fixes while also adding customization and new features to keep the game unique.</template>
        </Hero>

        <Hero class="no-bg">
            <template slot="title">Our Team</template>
            <template slot="description">Our development team collaborates through Discord. <a href="https://discord.gg/SEyN2Bs">Join the conversation!</a></template>
            <b-container class="text-center p-4">
                <b-row>
                    <b-col>
                        <img class="rounded-circle profileBorder" src="https://cdn.discordapp.com/avatars/87985104596533248/a_30a0ecc809e4a20b1b8539509e6ec2aa.gif?size=256" aria-hidden="true">
                        <h3>Chipmunk</h3>
                        <p>Supervisor</p>
                    </b-col>
                    <b-col>
                        <img class="rounded-circle profileBorder" src="https://cdn.discordapp.com/avatars/448561928521121794/cce7b913a07a4e3f0615a4e81282041f.png?size=256" aria-hidden="true">
                        <h3>Lyds</h3>
                        <p>Community Engagement</p>
                    </b-col>
                    <b-col>
                        <img class="rounded-circle profileBorder" src="https://cdn.discordapp.com/avatars/239570647116677120/6c0294e2fdce35f115c6c7e5ad10dc26.png?size=256" aria-hidden="true">
                        <h3>R10t--</h3>
                        <p>Systems Design / Developer</p>
                    </b-col>
                    <b-col>
                        <img class="rounded-circle profileBorder" src="https://cdn.discordapp.com/avatars/209655323751874561/5aaf2225b24f329809235c84f8e06146.png?size=256" aria-hidden="true">
                        <h3>Aluce</h3>
                        <p>Developer</p>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <img class="rounded-circle profileBorder" src="https://cdn.discordapp.com/avatars/150708089560104961/3397fae713f5b4733e8ee6ebc19658c6.png?size=256" aria-hidden="true">
                        <h3>Niverio</h3>
                        <p>Game Design</p>
                    </b-col>
                    <b-col>
                        <img class="rounded-circle profileBorder" src="https://cdn.discordapp.com/avatars/228298213159862272/b22b675f8f5ff44cc414859359e4e5c9.png?size=256" aria-hidden="true">
                        <h3>Nojo</h3>
                        <p>Project Lead</p>
                    </b-col>
                    <b-col>
                        <img class="rounded-circle profileBorder" src="https://cdn.discordapp.com/avatars/541318134699786272/be402b3bb1269123edc6888f1ca4e9dd.png?size=256" aria-hidden="true">
                        <h3>TW2000</h3>
                        <p>Developer</p>
                    </b-col>
                    <b-col>
                        <img class="rounded-circle profileBorder" src="https://cdn.discordapp.com/avatars/315517159902019585/e517b27e1242a9ad1bda6c31e3e7820e.png?size=256" aria-hidden="true">
                        <h3>XATEV</h3>
                        <p>Developer</p>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <img class="rounded-circle profileBorder" src="https://cdn.discordapp.com/avatars/304456817222746112/3e3aa1e9b085338df1ad562b294e9218.webp?size=256" aria-hidden="true">
                        <h3>CakeMixV3</h3>
                        <p>Sound Art</p>
                    </b-col>
                </b-row>
            </b-container>
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