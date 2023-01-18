<template>
    <div class="sea-bg">
        <Hero class="no-bg">
            <template slot="title">Want to help our project?</template>
            <template slot="description">Contributions are always appreciated from developers and players alike!
                The best way to get involved is to <a href="https://discord.gg/vYRfPSQ">join our disord server</a> where we have a variety of chat channels
                and ways to get started.<br/>

                <a class="center" href="https://discord.gg/vYRfPSQ" target="_blank"><img style="height: 150px;" src="../assets/discord.png"/></a><br/>
                <a href="https://discord.gg/vYRfPSQ">Join us on Dicsord!</a>
            </template>
        </Hero>

        <b-container class="p-5">
            <h1 class ="p-2">Roles</h1>
            <b-container style="color: black;">
                <b-row class ="m-2">
                    <b-col>
                        <b-card
                        title="Developers"
                        :img-src=role_images.developer
                        img-height=150
                        img-alt="Developers"
                        img-top
                        tag="article"
                        style="max-width: 20rem; height: 100%;"
                        class="mb-2">
                            <b-card-text>
                                Developers are the bread and butter of the project! Our project is completely open source and is made entirely by the community. Our source code is mostly C# but some Javascript and HTLM exist as well.
                            </b-card-text>
                        </b-card>
                    </b-col>
                    <b-col>
                        <b-card
                        title="Artists"
                        :img-src=role_images.artist
                        img-height=150
                        img-alt="Artists"
                        img-top
                        tag="article"
                        style="max-width: 20rem; height: 100%;"
                        class="mb-2">
                            <b-card-text>
                                Artists are greatly appreciated! We need various art and assets to be included in the game and artists help make this happen.
                            </b-card-text>
                        </b-card>
                    </b-col>
                    <b-col>
                        <b-card
                        title="Sound Art"
                        :img-src=role_images.sound
                        img-height=150
                        img-alt="Sound Art"
                        img-top
                        tag="article"
                        style="max-width: 20rem; height: 100%;"
                        class="mb-2">
                            <b-card-text>
                                Songs, sound effects, and music are great additions to the game which submerse the users into the game's aesthetic.
                            </b-card-text>
                        </b-card>
                    </b-col>
                </b-row>
                <b-row class ="m-2">
                    <b-col>
                        <b-card
                        title="Game Design"
                        :img-src=role_images.game_design
                        img-height=150
                        img-alt="Game Design"
                        img-top
                        tag="article"
                        style="max-width: 20rem; height: 100%;"
                        class="mb-2">
                            <b-card-text>
                                Game design makes a balanced game and creates unique and interesting gameplay! Making a unique game with fun gameplay elements is essential to building a game.
                            </b-card-text>
                        </b-card>
                    </b-col>

                    <b-col>
                        <b-card
                        title="Project Managers"
                        :img-src=role_images.management
                        img-height=150
                        img-alt="Managers"
                        img-top
                        tag="article"
                        style="max-width: 20rem; height: 100%;"
                        class="mb-2">
                            <b-card-text>
                                Project managers help to keep everyone on task and make sure that development is going smoothly and that nothing is blocking the development.
                                Good project management will ensure that tasks are avaliable, the project is defined, and the goals are understood.
                            </b-card-text>
                        </b-card>
                    </b-col>

                    <b-col>
                        <b-card
                        title="Community Engagement"
                        :img-src=role_images.community
                        img-height=150
                        img-alt="Community"
                        img-top
                        tag="article"
                        style="max-width: 20rem; height: 100%;"
                        class="mb-2">
                            <b-card-text>
                                Communty Outreach creates an inclusive and diverse player base and builds our community! From general outreach, to getting feedback on the game, outreach is critical to gathering a fan base.
                                The community's input is a large part of the game and ensuring that the community is heard is a critical role.
                            </b-card-text>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </b-container>
    </div>
</template>

<script>
import Hero from "../components/global/Hero";
import discord from "../assets/discord.png";
import developer from "../assets/roles/developer.jpg";
import artist from "../assets/roles/artist.jpg";
import sound from "../assets/roles/sound.jpg";
import game_design from "../assets/roles/game-design.jpg";
import management from "../assets/roles/management.jpg";
import community from "../assets/roles/community.jpg";

export default {
    components: { Hero },
    data() {
        return {
            role_images: {
                developer: developer,
                artist: artist,
                sound: sound,
                game_design: game_design,
                management: management,
                community: community
            }
        }
    }
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