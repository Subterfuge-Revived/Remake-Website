<template>
    <div class="sea-bg">
        <b-container>
            <b-card>
                <b-container class="pb-4" v-if="currentUserAccount.claims.includes('Administrator')">
                    <b-row>
                        <b-col>
                            <b-button variant="warning">Pause Game</b-button>
                            <b-button variant="warning">Unpause Game</b-button>
                            <b-button variant="danger">Kick Player</b-button>
                            <b-button variant="danger">Close Lobby</b-button>
                        </b-col>
                    </b-row>
                </b-container>
                <h2>{{ lobby.roomName }} <b-badge class="m-1" pill :variant=getBadgeColor()>{{ lobby.roomStatus }}</b-badge></h2>

                <b-row class="p-3">
                        Created By: {{ lobby.creator.username }}<br/>
                        Created On: {{ new Date(lobby.timeCreated) }} <br/>
                        Started At: {{ new Date(lobby.timeStarted) }} <br/>
                        Game Duration: {{ getLobbyDuration() }} Minutes <br/>
                        Minutes Per Tick: {{ lobby.gameSettings.minutesPerTick }} <br/>
                        Current Tick: {{ getCurrentTick() }} <br/>
                </b-row>

                <b-row class="p-3">
                    <b-col>
                        <h4>Game Settings</h4>
                        Goal: {{ lobby.gameSettings.goal }}<br/>
                        Is Ranked: {{ lobby.gameSettings.isRanked }}<br/>
                        Is Anonymous: {{ lobby.gameSettings.isAnonymous }}<br/>
                        Is Private: {{ lobby.gameSettings.isPrivate }}<br/>
                    </b-col>
                    <b-col>
                        <h4>Map Settings</h4>
                        Seed: {{ lobby.mapConfiguration.seed }}<br/>
                        Outposts per Player: {{ lobby.mapConfiguration.outpostsPerPlayer }}<br/>
                        Min Outpost Distance: {{ lobby.mapConfiguration.minimumOutpostDistance }}<br/>
                        Max Outpost Distance: {{ lobby.mapConfiguration.maxOutpostDistance }}<br/>
                        Dormants Per Player: {{ lobby.mapConfiguration.dormantsPerPlayer }}<br/>
                        Outpost Distribution: {{ lobby.mapConfiguration.outpostDistribution }}<br/>
                    </b-col>
                </b-row>

            
            <b-card class="m-3">
                <b-tabs card content-class="mt-3">
                    <b-tab active>
                        <template #title>
                            <div><h4>Players <b-badge pill>{{ lobby.playersInLobby.length }} / {{ lobby.gameSettings.maxPlayers }}</b-badge></h4></div>
                        </template>

                        <b-table :items="lobby.playersInLobby" show-empty responsive selectable small></b-table>
                    </b-tab>
                    <b-tab>
                        <template #title>
                            <div><h4>Game Events<b-badge pill>{{ gameEvents.length }}</b-badge></h4></div>
                        </template>

                        <b-table :items="gameEvents" show-empty responsive selectable small></b-table>
                    </b-tab>
                    <b-tab>
                        <template #title>
                            <div><h4>Group Chats <b-badge pill>{{ groups.length }}</b-badge></h4></div>
                        </template>

                        <b-table :items="groups" show-empty responsive selectable small></b-table>
                    </b-tab>
                </b-tabs>
            </b-card>
            </b-card>
        </b-container>
    </div>
</template>

<script>
import api from "../classes/Api";

export default {
    name: 'lobby',
    state: {},
    data() {
        return {
            selectedTab: "lobbies",
            lobbyId: this.$route.query.id,
            lobby: null,
            currentUserAccount: JSON.parse(localStorage.getItem('user')),
            gameEvents: [],
            groups: [],
        };
    },
    methods: {
        getLobby() {
            api.getLobbies({ RoomID: this.lobbyId }).then(
                (response) => {
                    this.lobby = response.data.lobbies[0];
                },
                (fail) => {
                    console.error(fail);
                }
            )
        },
        getLobbyGameEvents() {
            api.getGameEvents(this.lobbyId).then(
                (response) => {
                    this.gameEvents = response.data.gameEvents
                }
            )
        },
        getLobbyMessageGroups() {
            api.getGroups(this.lobbyId).then(
                (response) => {
                    this.groups = response.data.messageGroups
                }
            )
        },
        getBadgeColor() {
            switch(this.lobby.roomStatus) {
                case "Open":
                    return "primary";
                case "Ongoing":
                    return "warning";
                case "Closed":
                    return "danger";
                case "Completed":
                    return "success"
                case "Expired":
                    return "danger";
            }
        },
        getLobbyDuration() {
            return (new Date().getTime() - new Date(this.lobby.timeStarted).getTime()) / 60000
        },
        getCurrentTick() {
            return this.getLobbyDuration() / this.lobby.gameSettings.minutesPerTick
        }
    },
    created() {
        this.getLobby();
        this.getLobbyGameEvents();
        this.getLobbyMessageGroups();
    }
}
</script>

<style>

</style>