<template>
    <div class="sea-bg">
        <b-container v-if="lobby != null">
            <b-card>
                <b-container class="pb-4" v-if="currentUserAccount.claims.includes('Administrator')">
                    <b-row>
                        <b-col :key="updateKey">
                            <b-button variant="warning" v-if="isGamePaused()" @click="unpauseGame">Unpause Game</b-button>
                            <b-button variant="warning" v-else @click="pauseGame">Pause Game</b-button>
                            <b-button variant="danger">Kick Player</b-button>
                            <b-button variant="danger">Close Lobby</b-button>
                        </b-col>
                    </b-row>
                </b-container>
                <h2>{{ lobby.roomName }} <b-badge class="m-1" pill :variant=getBadgeColor()>{{ lobby.roomStatus }}</b-badge></h2>

                <b-row class="p-3">
                        Created By: {{ lobby.creator.username }}<br/>
                        Created On: {{ getFriendlyDate(lobby.timeCreated) }} <br/>
                        Started At: {{ getFriendlyDate(lobby.timeStarted) }} <br/>
                        Game Duration: {{ getLobbyDuration() }} <br/>
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

                        <b-table :items="lobby.playersInLobby" :fields="playerFields" show-empty responsive selectable small @row-selected="(event) => goToUser(event[0].id)">
                            <template #cell(claims)="data">
                                {{ data.item.claims.join(", ") }}
                            </template>

                            <template #cell(pseudonyms)="data">
                                {{ data.item.pseudonyms.map(it => it.username).join(", ") }}
                            </template>
                        </b-table>
                    </b-tab>
                    <b-tab>
                        <template #title>
                            <div><h4>Game Events<b-badge pill>{{ gameEvents.length }}</b-badge></h4></div>
                        </template>

                        <b-table :items="gameEvents" :fields="gameEventFields" show-empty responsive selectable small>
                            <template #cell(timeIssued)="data">
                                {{ getFriendlyDate(data.item.timeIssued) }}
                            </template>
                            <template #cell(issuedBy)="data">
                                <div @click="goToUser(data.item.issuedBy.id)">{{ data.item.issuedBy.username }}</div>
                            </template>
                        </b-table>
                    </b-tab>
                    <b-tab>
                        <template #title>
                            <div><h4>Group Chats <b-badge pill>{{ groups.length }}</b-badge></h4></div>
                        </template>

                        <div class="accordion" role="tablist">
                            <b-card no-body class="mb-1" v-for="group in groups" :key="group.id">
                                <b-card-header header-tag="header" class="p-1" role="tab">
                                    <b-button block v-b-toggle="group.id" variant="info" @click="getGroupMessages(group.id)">{{ getGroupMembers(group) }}</b-button>
                                </b-card-header>
                                <b-collapse :id="group.id" accordion="message-group-accordion" role="tabpanel">
                                    <b-card-body :key="updateKey">
                                        <b-card-text>
                                            <div v-for="message in groupMessages[group.id]" :key=message.id>
                                                {{ new Date(message.unixTimeCreatedAt) }} - <b>{{ message.sentBy.username}}:</b> {{ message.message}}
                                            </div>
                                        </b-card-text>
                                    </b-card-body>
                                </b-collapse>
                            </b-card>
                        </div>
                    </b-tab>
                </b-tabs>
            </b-card>
            </b-card>
        </b-container>
    </div>
</template>

<script>
import api from "../classes/Api";
import moment from "moment";

export default {
    name: 'lobby',
    data() {
        return {
            selectedTab: "lobbies",
            lobbyId: this.$route.query.id,
            lobby: null,
            currentUserAccount: JSON.parse(localStorage.getItem('user')),
            gameEvents: [],
            groups: [],
            groupMessages: {},
            updateKey: 1,
            gameEventFields: [
                { key: 'timeIssued', label: 'Time Issued' },
                { key: 'occursAtTick', label: 'Occurs At Tick' },
                { key: 'issuedBy', label: 'Issued By' },
                { key: 'eventData', label: 'Event Data' },
            ],
            playerFields: [
                { key: 'username', label: 'Username' },
                { key: 'claims', label: 'Claims' },
                { key: 'pseudonyms', label: 'Aliases' },
            ]
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
                    this.updateKey += 1;
                    this.gameEvents = response.data.gameEvents
                }
            )
        },
        getLobbyMessageGroups() {
            api.getGroups(this.lobbyId).then(
                (response) => {
                    this.updateKey += 1;
                    this.groups = response.data.messageGroups;
                }
            )
        },
        getGroupMessages(groupId) {
            api.getGroupMessages(this.lobbyId, groupId).then(
                (messageResponse) => {
                    this.updateKey += 1;
                    this.groupMessages[groupId] = messageResponse.data.messages;
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
            return moment(this.lobby.timeStarted).fromNow();
        },
        getCurrentTick() {
            return moment().diff(moment(this.lobby.timeStarted), 'minutes') / this.lobby.gameSettings.minutesPerTick
        },
        getGroupMembers(group) {
            return group.groupMembers.map(it => it.username).join(", ");
        },
        goToUser(userId) {
            console.log(userId);
            this.$router.push({ path: 'account', query: { id: userId }})
        },
        getFriendlyDate(time) {
            return moment(time).format('MMMM Do YYYY, h:mm:ss a');
        },
        isGamePaused() {
            if(this.gameEvents.length > 0) {
                if(this.gameEvents[this.gameEvents.length - 1].eventDataType == 'PauseGameEventData') {
                    return true;
                } else {
                    return false;
                }
            }
            return false;
        },
        pauseGame() {
            var pauseGameEvent = {
                GameEventRequest: {
                    OccursAtTick: Math.floor(this.getCurrentTick()) + 2,
                    EventData: {
                        EventDataType: "PauseGameEventData",
                        TimePaused: new Date().toJSON()
                    }
                }
            }

            api.submitGameEvent(this.lobbyId, pauseGameEvent).then(
                (response) => {
                    console.log("Paused game.");
                    this.getLobbyGameEvents();
                }
            )
        },
        unpauseGame() {

        },
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