<template>
    <div>
        <Hero>
            <template slot="title">Want to help our project?</template>
            <template slot="description">Contributions are always appreciated from developers and players alike!
                The best way to get involved is to <a href="https://discord.gg/vYRfPSQ">join our disord server</a> where we have a variety of chat channels
                and ways to get started.<br/>

                <a class="center" href="https://discord.gg/vYRfPSQ" target="_blank"><img style="height: 150px;" src="../assets/discord.png"/></a><br/>
                <a href="https://discord.gg/vYRfPSQ">Join us on Dicsord!</a>
            </template>
        </Hero>

        <b-container class="p-5">
            <h1 class ="p-2 white">Roles</h1>
            <b-container style="color: black;">
                <b-row class ="m-2 fit-height">
                    <b-col>
                        <TextContent class="fit-height">
                            <img :src="role_images.developer" class="img-fit"/>
                            <div class="p-4">
                                <h2>Developers</h2>
                                <p>Developers are the bread and butter of the project! Our project is completely open source and is made entirely by the community. Our source code is mostly C# but some Javascript and HTLM exist as well.</p>
                            </div>
                        </TextContent>
                    </b-col>
                    <b-col>
                        <TextContent class="fit-height">
                            <img :src="role_images.artist" class="img-fit"/>
                            <div class="p-4">
                                <h2>Artists</h2>
                                <p>Artists are greatly appreciated! We need various art and assets to be included in the game and artists help make this happen.</p>
                            </div>
                        </TextContent>
                    </b-col>
                    <b-col>

                        <TextContent class="fit-height">
                            <img :src="role_images.sound" class="img-fit"/>
                            <div class="p-4">
                                <h2>Sound Art</h2>
                                <p>Songs, sound effects, and music are great additions to the game which submerse the users into the game's aesthetic.</p>
                            </div>
                        </TextContent>
                    </b-col>
                </b-row>
                <b-row class ="m-2">
                    <b-col>
                        <TextContent class="fit-height">
                            <img :src="role_images.game_design" class="img-fit"/>
                            <div class="p-4">
                                <h2>Game Design</h2>
                                <p>Game design makes a balanced game and creates unique and interesting gameplay! Making a unique game with fun gameplay elements is essential to building a game.</p>
                            </div>
                        </TextContent>
                    </b-col>

                    <b-col>
                        <TextContent class="fit-height">
                            <img :src="role_images.management" class="img-fit"/>
                            <div class="p-4">
                                <h2>Project Management</h2>
                                <p>Project managers help to keep everyone on task and make sure that development is going smoothly and that nothing is blocking the development.
                                Good project management will ensure that tasks are avaliable, the project is defined, and the goals are understood.</p>
                            </div>
                        </TextContent>
                    </b-col>

                    <b-col>
                        <TextContent class="fit-height">
                            <img :src="role_images.community" class="img-fit"/>
                            <div class="p-4">
                                <h2>Community Engagement</h2>
                                <p>Communty Outreach creates an inclusive and diverse player base and builds our community! From general outreach, to getting feedback on the game, outreach is critical to gathering a fan base.
                                The community's input is a large part of the game and ensuring that the community is heard is a critical role.</p>
                            </div>
                        </TextContent>
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
import TextContent from "../components/global/TextContent.vue";

export default {
    components: { Hero, TextContent },
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

.fit-height {
    height: 100%;
}

.img-fit {
    width: 100%;
    height: 150px;
}

.grey-bg {
    background-color: gray
}

.profileBorder {
    border: 5px solid gray
}

</style>