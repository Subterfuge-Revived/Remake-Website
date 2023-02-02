<template>
    <div>
        <b-container class="p-5" v-if="account != null">
            <b-form>               
                <h2 class="white">{{account.username}} <b-badge class="m-1" pill v-for="item in account.claims" :key=item :variant=getBadgeColor(item)>{{ item }}</b-badge></h2>

                <TextContent class="white p-4">
                    <b-form-group label="Account Created">
                        <b-form-input
                        id="input-1"
                        :value="new Date(account.dateCreated).toString()"
                        type="datetime"
                        disabled
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group label="Banned Until" v-if="isBanned()">
                        <b-form-input
                        id="input-1"
                        :value="new Date(account.bannedUntil).toString()"
                        type="datetime"
                        disabled
                        ></b-form-input>
                    </b-form-group>
                </TextContent>
            </b-form>
        </b-container>

        <b-container>
            <TextContent class="p-2">
                <TextContent class="m-2 p-2" v-if="currentUserAccount.claims.includes('Administrator')">
                    <h4>Administrative Actions</h4>
                    <b-row>
                        <b-col>
                            <b-button variant="danger" v-if="!isBanned()">Ban Player</b-button>
                            <b-button variant="success" v-if="isBanned()">Unban Player</b-button>
                            <b-button variant="danger">Ban IP</b-button>
                            <b-button variant="secondary">Update Role</b-button>
                        </b-col>
                    </b-row>
                </TextContent>
                
                <TextContent class="m-2 p-2">
                    <b-nav tabs>
                        <b-nav-item :active="isActive('lobbies')" @click="setTab('lobbies')"><h5>Lobbies</h5></b-nav-item>
                        <b-nav-item :active="isActive('specialists')" @click="setTab('specialists')"><h5>Specialists</h5></b-nav-item>
                        <b-nav-item :active="isActive('specialists-packages')" @click="setTab('specialists-packages')"><h5>Specialist Packages</h5></b-nav-item>
                        <b-nav-item :active="isActive('chats')" @click="setTab('chats')" v-if="currentUserAccount.claims.includes('Administrator')"><h5>Chats</h5></b-nav-item>
                        <b-nav-item :active="isActive('ban-history')" v-if="currentUserAccount.claims.includes('Administrator')" @click="setTab('ban-history')"><h5>Ban History</h5></b-nav-item>
                        <b-nav-item :active="isActive('social')" v-if="currentUserAccount.claims.includes('Administrator')" @click="setTab('social')"><h5>Social</h5></b-nav-item>
                    </b-nav>

                    <b-container class="p-4" v-if="selectedTab == 'social'">
                        <b-row>
                            <b-col>
                                <h2>Friends</h2>
                                <b-table :items="friends" responsive selectable small show-empty>
                                    <template #empty="scope">
                                        <b-alert show variant="warning">No Friends</b-alert>
                                    </template>
                                </b-table>
                            </b-col>
                            <b-col>
                                <h2>Friend Requests</h2>
                                <b-table :items="friendRequests" responsive selectable small show-empty>
                                    <template #empty="scope">
                                        <b-alert show variant="warning">No Friend Requests</b-alert>
                                    </template>
                                </b-table>
                            </b-col>
                            <b-col>
                                <h2>Blocked Users</h2>
                                <b-table :items="blockedUsers" responsive selectable small show-empty>
                                    <template #empty="scope">
                                        <b-alert show variant="warning">No Blocked Users</b-alert>
                                    </template>
                                </b-table>
                            </b-col>
                        </b-row>
                    </b-container>

                    <b-table :items="queryResults" responsive selectable small show-empty v-else>

                        <!-- Lobby overrides -->
                        <template #cell(creator)="data">
                            {{ data.item.creator.username }}
                        </template>

                        <template #cell(timeCreated)="data">
                            {{ getFriendlyDate(data.item.timeCreated) }}
                        </template>

                        <template #cell(timeStarted)="data">
                            {{ getFriendlyDate(data.item.startedAt) }}
                        </template>

                        <template #cell(expiresAt)="data">
                            {{ getFriendlyDate(data.item.expiresAt) }}
                        </template>

                        <template #cell(playersInLobby)="data">
                            <b-badge pill v-if="data.item.gameSettings.maxPlayers == data.item.playersInLobby.length" variant="danger">{{ data.item.playersInLobby.length }} / {{ data.item.gameSettings.maxPlayers }}</b-badge>
                            <b-badge pill v-else variant="success">{{ data.item.playersInLobby.length }} / {{ data.item.gameSettings.maxPlayers }}</b-badge>
                            {{ data.item.playersInLobby.map(it => it.username).join(", ") }}
                        </template>

                        <template #cell(gameSettings)="data">
                            <b-badge pill>{{ data.item.gameSettings.goal }}</b-badge><b-badge pill>Minutes Per Tick: {{ data.item.gameSettings.minutesPerTick }}</b-badge>
                            <b-badge pill>Specialists: {{ data.item.gameSettings.allowedSpecialists.length }}</b-badge>
                            <b-badge pill v-if="data.item.gameSettings.isPrivate" variant="danger">Private</b-badge>
                            <b-badge pill v-if="data.item.gameSettings.isAnonymous" variant="success">Anonymous</b-badge>
                            <b-badge pill v-if="data.item.gameSettings.isRanked" variant="warning">Ranked</b-badge>
                        </template>

                        <template #cell(mapConfiguration)="data">
                            Player Outposts: {{ data.item.mapConfiguration.outpostsPerPlayer }}
                        </template>

                        <!-- Chat overrides -->
                        <template #cell(sentAt)="data">
                            {{ getFriendlyDate(data.item.sentAt) }}
                        </template>

                        <template #cell(sentBy)="data">
                            {{ data.item.sentBy.username }}
                        </template>

                        <!-- Specialist overrides -->
                        <template #cell(specialistEffects)="data">
                            <p v-for="effect in data.item.specialistEffects" :key="effect">
                                {{ effect.effectTarget }} {{ effect.value > 0 ? "Gain" : "Lose" }} {{ Math.abs(effect.value) }} {{ effect.effectModifier }} When {{ effect.effectTriggerRange }} {{ effect.effectTrigger }} 
                            </p>
                        </template>

                        <template #empty="scope">
                            <b-alert show variant="warning">No Results</b-alert>
                        </template>
                    </b-table>
                </TextContent>
            </TextContent>
        </b-container>
    </div>
</template>

<script>
import Hero from "../components/global/Hero";
import TextContent from "../components/global/TextContent.vue";
import AppDownload from "../components/global/AppDownload.vue";
import api from "../classes/Api";
import moment from "moment";

export default {
    components: { Hero, AppDownload, TextContent },
    name: 'account',
    state: {},
    data() {
        return {
            selectedTab: "lobbies",
            accountId: this.$route.query.id,
            account: null,
            currentUserAccount: JSON.parse(localStorage.getItem('user')),
            queryResults: [],
            friends: [],
            friendRequests: [],
            blockedUsers: [],
        };
    },
    methods: {
        setTab(tabName) {
            this.selectedTab = tabName;

            if(tabName == 'lobbies') {
                this.getLobbies();
            } else if (tabName == 'chats') {
                this.getChats();
            } else if (tabName == "specialists") {
                this.getPlayerSpecialists();
            }  else if (tabName == "specialists-packages") {
                this.getPlayerSpecialistPackages();
            } else if (tabName == "ban-history") {
                this.getDetailedPlayerInfo();
            } else if (tabName == "social") {
                this.getPlayerRelationships();
            }
        },
        isActive(tabName) {
            return this.selectedTab == tabName;
        },
        getBadgeColor(roleName) {
            switch(roleName) {
                case "Administrator":
                    return "primary";
                case "User":
                    return "secondary";
                case "EmailVerified":
                    return "success";
                case "Banned":
                    return "danger"
            }
        },
        isBanned() {
            return new Date(this.account.bannedUntil) > new Date()
        },
        getAccountDetails() {
            api.getUser(this.accountId).then(
                (success) => { 
                    this.account = success.data.user;
                },
                (fail) => {
                    console.error(fail);
                }
            )
        },
        getLobbies() {
            api.getLobbies({ UserInRoom: this.accountId }).then(
                (response) => {
                    this.queryResults = response.data.lobbies;
                }
            )
        },
        getChats() {
            api.getUserChatMessages({ UserId: this.accountId }).then(
                (response) => {
                    this.queryResults = response.data.messages;
                }
            )
        },
        getPlayerSpecialists() {
            api.getSpecialists({ CreatedByPlayerId: this.accountId }).then(
                (response) => {
                    this.queryResults = response.data.customSpecialists;
                }
            )
        },
        getPlayerSpecialistPackages() {
            api.getSpecialistPackages({ CreatedByPlayerId: this.accountId }).then(
                (response) => {
                    this.queryResults = response.data.specialistPackages;
                }
            )
        },
        getDetailedPlayerInfo() {
            api.getUsers({ UserID: this.accountId }).then(
                (response) => {
                    this.queryResults = response.data.users.banHistory;
                }
            )
        },
        getPlayerRelationships() {
            api.getPlayerBlocks(this.accountId).then(
                (response) => {
                    this.blockedUsers = response.data.blockedUsers.map(it => ({ username: it.username, id: it.id }));
                }
            )
            api.getPlayerFriends(this.accountId).then(
                (response) => {
                    this.friends = response.data.friends.map(it => ({ username: it.username, id: it.id }));
                }
            )
            api.getPlayerFriendRequests(this.accountId).then(
                (response) => {
                    this.friendRequests = response.data.friendRequests.map(it => ({ username: it.username, id: it.id }));
                }
            )
        },
        getFriendlyDate(time) {
            return moment(time).format('MMMM Do YYYY, h:mm:ss a');
        },
    },
    created() {
        this.getAccountDetails();
    }
}
</script>

<style>

</style>