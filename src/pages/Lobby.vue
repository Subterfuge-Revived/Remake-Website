<template>
    <div>
        <b-container v-if="lobby != null">
            <TextContent class="p-4">
                <b-container class="pb-4" v-if="currentUserAccount.claims.includes('Administrator')">
                    <b-row v-if="lobby.roomStatus !== 'Closed'">
                        <b-col :key="updateKey">
                            <b-button-group >
                                <b-button variant="warning" v-if="isGamePaused()" @click="confirmAction('unpause game')">Unpause Game</b-button>
                                <b-button variant="warning" v-else @click="confirmAction('pause game')">Pause Game</b-button>
                                <b-button variant="danger" @click="confirmAction('close lobby')">Close Lobby</b-button>
                            </b-button-group>
                        </b-col>
                    </b-row>
                </b-container>
                <h2>{{ lobby.roomName }} <b-badge class="m-1" pill :variant=getBadgeColor()>{{ lobby.roomStatus }}</b-badge></h2>

                <b-row class="p-3 greyText">
                    <b-col>
                        <b-container>
                            <p>
                                Created On: {{ getFriendlyDate(lobby.timeCreated) }} <br/>
                                Minutes Per Tick: {{ lobby.gameSettings.minutesPerTick }} <br/>
                            </p>
                            
                            <p v-if="isGameStarted()">
                                Started At: {{ getFriendlyDate(lobby.timeStarted) }} <br/>        
                                Game Duration: {{ getLobbyDuration() }} <br/>
                                Current Tick: {{ getCurrentTick() }} <br/>
                            </p>
                        </b-container>
                        <TextContent class="p-3">
                            <b-tabs card content-class="mt-3">
                                <b-tab active title="Game Settings">
                                    <b-container>
                                        <h4>Game Settings</h4>
                                        Goal: {{ lobby.gameSettings.goal }}<br/>
                                        Is Ranked: {{ lobby.gameSettings.isRanked }}<br/>
                                        Is Anonymous: {{ lobby.gameSettings.isAnonymous }}<br/>
                                        Is Private: {{ lobby.gameSettings.isPrivate }}<br/>
                                    </b-container>
                                </b-tab>
                                <b-tab title="Map Settings">
                                    <b-container>
                                        <h4>Map Settings</h4>
                                        Seed: {{ lobby.mapConfiguration.seed }}<br/>
                                        Outposts per Player: {{ lobby.mapConfiguration.outpostsPerPlayer }}<br/>
                                        Min Outpost Distance: {{ lobby.mapConfiguration.minimumOutpostDistance }}<br/>
                                        Max Outpost Distance: {{ lobby.mapConfiguration.maxOutpostDistance }}<br/>
                                        Dormants Per Player: {{ lobby.mapConfiguration.dormantsPerPlayer }}<br/>
                                        Outpost Distribution: {{ lobby.mapConfiguration.outpostDistribution }}<br/>
                                    </b-container>
                                </b-tab>
                            </b-tabs>
                        </TextContent>
                    </b-col>
                    <b-col>
                        <h2>Players in Lobby</h2>
                        <b-table :items="lobby.playersInLobby" :fields="playerFields" show-empty responsive selectable small @row-selected="(event) => goToUser(event[0].id)">
                            <template #cell(username)="data">
                                {{ data.item.username }}<b-badge class="m-1" pill v-for="item in data.item.claims" :key=item>{{ item }}</b-badge>
                                <b-badge class="m-1" pill v-if="isPlayerTheCreator(data.item.id)" variant="success">Creator</b-badge>
                                <b-badge class="m-1" pill v-if="isBanned(data.item)" variant="danger">Banned</b-badge>
                            </template>

                            <template #cell(pseudonyms)="data">
                                {{ data.item.pseudonyms.map(it => it.username).join(", ") }}
                            </template>

                            <template #cell(actions)="data">    
                                <b-button-group>
                                    <b-button variant="danger" v-if="currentUserAccount.claims.includes('Administrator') && lobby.roomStatus !== 'Closed'" @click="confirmAction('kick player', data.item)">Kick player</b-button>
                                    <b-button variant="danger" v-if="currentUserAccount.claims.includes('Administrator')" @click="confirmAction('ban player', data.item)">Ban player</b-button>
                                </b-button-group>
                            </template>
                        </b-table>
                    </b-col>
                </b-row>
            
            <TextContent class="m-3">
                <b-tabs card content-class="mt-3">
                    <b-tab active>
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
                            <TextContent no-body class="mb-1" v-for="group in groups" :key="group.id">
                                <b-button header-tag="header" role="tab" block v-b-toggle="group.id" variant="info" @click="getGroupMessages(group.id)">
                                    <p style="text-align: start;">{{ getGroupMembers(group) }}</p>
                                </b-button>
                                <b-collapse :id="group.id" accordion="message-group-accordion" role="tabpanel">
                                    <b-card-body :key="updateKey">
                                        <b-card-text>
                                            <div v-for="message in groupMessages[group.id]" :key=message.id>
                                                {{ getFriendlyDate(message.sentAt) }} - <b>{{ message.sentBy.username}}:</b> {{ message.message}}
                                            </div>
                                        </b-card-text>
                                    </b-card-body>
                                </b-collapse>
                            </TextContent>
                        </div>
                    </b-tab>
                </b-tabs>
            </TextContent>
            </TextContent>
        </b-container>

        <b-modal id="confirm-modal" title="Confirm" v-model="confirm.show" @ok="confirm.onConfirm">
            <div v-if="this.confirm.confirmAction === 'ban player'">
                <b-alert variant="danger" show>You are about to ban: <b>{{ banData.user.username }}</b></b-alert>
                <b-form class="m-3">
                    <b-container>
                        <b-container>
                            <b-button @click="setOneDayBan">One Day</b-button>
                            <b-button @click="setOneWeekBan">One Week</b-button>
                            <b-button @click="setForeverBan">Forever</b-button>
                        </b-container>
                        <b-input-group prepend="Until" class="p-3">
                            <b-form-datepicker v-model="banData.until" value-as-date></b-form-datepicker>
                        </b-input-group>
                        <b-input-group prepend="Reason" class="p-3">
                            <b-form-textarea v-model="banData.reason" placeholder="Reason for ban (shown to player)" trim></b-form-textarea>
                        </b-input-group>
                        <b-input-group prepend="Admin Notes" class="p-3" is-text>
                            <b-form-textarea v-model="banData.adminNotes" type="text" placeholder="Extra administrator notes (only seen by admins)" trim></b-form-textarea>
                        </b-input-group>
                    </b-container>
                </b-form>
            </div>

            <p class="my-4">Are you sure you want to {{ confirm.confirmAction }}?</p>
        </b-modal>
    </div>
</template>

<script>
import TextContent from "../components/global/TextContent.vue";
import api from "../classes/Api";
import moment from "moment";

export default {
    name: 'lobby',
    components: { TextContent },
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
                { key: 'gameEventData.occursAtTick', label: 'Occurs At Tick' },
                { key: 'issuedBy', label: 'Issued By' },
                { key: 'gameEventData.eventData', label: 'Event Data' },
            ],
            playerFields: [
                { key: 'username', label: 'Username' },
                { key: 'pseudonyms', label: 'Aliases' },
                { key: 'actions', label: 'Actions' },
            ],
            confirm: {
                show: false,
                confirmAction: "",
                onConfirm: () => {},
            },
            banData: {
                user: {},
                until: new Date(),
                reason: "",
                adminNotes: ""
            }
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

                // Go backwards through recent events.
                // If there is a pause event, it is paused, otherwise unpaused.
                // Note: Because of pagination this is a rough estimate. Real clients will be more accurate.
                for(var index = this.gameEvents.length - 1; index >= 0; index--) {
                    if(this.gameEvents[index].gameEventData.eventData.eventDataType === "PauseGameEventData") {
                        return true;
                    } else if (this.gameEvents[index].gameEventData.eventData.eventDataType === "UnpauseGameEventData") {
                        return false;
                    }
                }
            }
            return false;
        },
        isGameStarted() {
            return this.lobby.roomStatus === "Ongoing";
        },
        isPlayerTheCreator(userId) {
            return this.lobby.playersInLobby[0].id == userId;
        },
        confirmAction(action, data = null) {
            this.confirm.confirmAction = action;
            this.confirm.show = true;
            if(this.confirm.confirmAction === "unpause game") {
                this.confirm.onConfirm = this.unpauseGame;
            } else if(this.confirm.confirmAction === "pause game") {
                this.confirm.onConfirm = this.pauseGame;
            } else if (this.confirm.confirmAction === "close lobby") {
                this.confirm.onConfirm = this.closeGame;
            } else if (this.confirm.confirmAction === "kick player") {
                this.confirm.onConfirm = this.kickPlayer(data);
            } else if (this.confirm.confirmAction === "ban player") {
                this.banData.user = data;
                this.setOneDayBan();
                this.confirm.onConfirm = this.banPlayer;
            }
        },
        pauseGame() {
            var pauseGameEvent = {
                GameEventData: {
                    OccursAtTick: Math.floor(this.getCurrentTick()) + 2,
                    EventData: {
                        EventDataType: "PauseGameEventData",
                        TimePaused: new Date().toJSON()
                    }
                }
            }

            api.submitGameEvent(this.lobbyId, pauseGameEvent).then(
                (response) => {
                    this.getLobbyGameEvents();
                }
            )
        },
        unpauseGame() {
            var unpauseGameEvent = {
                GameEventData: {
                    OccursAtTick: Math.floor(this.getCurrentTick()) + 2,
                    EventData: {
                        EventDataType: "UnpauseGameEventData",
                        TimeUnpaused: new Date().toJSON()
                    }
                }
            }

            api.submitGameEvent(this.lobbyId, unpauseGameEvent).then(
                (response) => {
                    this.getLobbyGameEvents();
                }
            )
        },
        closeGame() {
            var endGameEvent = {
                GameEventData: {
                    OccursAtTick: Math.floor(this.getCurrentTick()) + 2,
                    EventData: {
                        EventDataType: "GameEndEventData",
                        ClosedByAdmin: true,
                        WinningPlayer: null,
                    }
                }
            }

            api.submitGameEvent(this.lobbyId, endGameEvent).then(
                (response) => {
                    this.getLobbyGameEvents();
                }
            )
        },
        kickPlayer(user) {
            var leaveGameEvent = {
                GameEventData: {
                    OccursAtTick: Math.floor(this.getCurrentTick()) + 2,
                    EventData: {
                        EventDataType: "PlayerLeaveGameEventData",
                        Player: {
                            id: user.id,
                            username: user.username,
                        }
                    }
                }
            }

            api.submitGameEvent(this.lobbyId, leaveGameEvent).then(
                (response) => {
                    this.getLobbyGameEvents();
                }
            )
        },
        banPlayer() {
            var banRequest = {
                userId: this.banData.user.id,
                until: this.banData.until,
                reason: this.banData.reason,
                adminNotes: this.banData.adminNotes,
            }

            api.banPlayer(banRequest);
        },
        setForeverBan() {
            var today = moment()
            today.add('9999', 'y')
            this.banData.until = new Date(today)
        },
        setOneDayBan() {
            var oneDay = moment()
            oneDay.add('1', 'd')
            this.banData.until = new Date(oneDay)
        },
        setOneWeekBan() {
            var oneDay = moment()
            oneDay.add('7', 'd')
            this.banData.until = new Date(oneDay)
        },
        relativeTime(currentTime) {
            return moment(currentTime).fromNow()
        },
        isBanned(player) {
            return new Date(player.bannedUntil) > new Date()
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
.table {
    color: rgb(201, 201, 201);
}

.greyText {
    color: rgb(201, 201, 201);
}
</style>