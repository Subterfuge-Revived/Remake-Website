<template>
    <div class="sea-bg">
        <Hero class="no-bg">
            <template slot="title">Want to help our project?</template>
            <template slot="description">We are always looking for help and would love any contributions from developers and players alike!
                The best way to get involved is to <a href="https://discord.gg/vYRfPSQ">join our disord server</a> where we have a variety of chat channels
                and ways to get started.<br/>

                <a class="center" href="https://discord.gg/vYRfPSQ" target="_blank"><img style="height: 150px;" src="../assets/discord.png"/></a><br/>
                <a href="https://discord.gg/vYRfPSQ">Join us on Dicsord!</a>
            </template>
        </Hero>

        <b-container class="p-5">
            <h1>Roles</h1>
            <b-container>
                <h2>Developers</h2>
                <b-container>
                    <p>Developers are the most helpful to our project! We currently need more coders who are able to make this project a reality. The project currently has a number of moving parts
                        and all kinds of developers are needed. We program in PHP, C#, HTML and JavaScript.
                    </p>
                    <div>
                        <h3>Project Infrastructure</h3>
                        <ul>
                            <li><h4>Unity (C#)</h4></li>
                            <p>Everything which needs to be rendered in Unity, but nothing more. This shouldn't contain anything the backend requires.</p>
                            <li><h4>Core (C#)</h4></li>
                            <p>Everything else to be included in the app. This includes game mechanics, map topologies, and map generation.</p>
                            <li><h4>Backend (PHP)</h4></li>
                            <p>What the server runs and database structures.</p>
                            <li><h4>Discord (JS)</h4></li>
                            <p>A discord bot to allow interacting with the game through discord</p>
                            <li><h4>Website (HTML, JS)</h4></li>
                            <p>This website, providing information to developers and a portal to new users</p>
                        </ul>
                    </div>
                </b-container>
                
                <h2>Artists</h2>
                <b-container>
                    <p>
                        Artists are greatly appreciated! We need various art and assets to be included in the game and artists help make this happen!
                    </p>
                </b-container>

                <h2>Sound Art</h2>
                <b-container>
                    <p>
                        Songs, sound effects, and music are great additions to the game which submerse the users into the game's asthetic.
                    </p>
                </b-container>

                <h2>Game Designers</h2>
                <b-container>
                    <p>
                        Game design is a huge topic and making game decisions is extremely important to how the game plays out.
                    </p>
                </b-container>

                <h2>Project Managers</h2>
                <b-container>
                    <p>
                        Project manager shelp to keep everyone on task and make sure that development is going smoothly and that nothing is blocking the development.
                        Good project management will ensure that tasks are avaliable, the project is defined, and the goals are understood.
                    </p>
                </b-container>

                <h2>Community Engagement</h2>
                <b-container>
                    <p>
                        Communty Engagement helps to let developers and game progress be broadcast to the community to get input and feedback on the game's development.
                        The community's input is a large part of the game and ensuring that the community is heard is a critical role.
                    </p>
                </b-container>
            </b-container>
        </b-container>
    </div>
</template>

<script>
import Hero from "../components/global/Hero";
import discord from "../assets/discord.png";

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