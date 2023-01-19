<template>
    <div class="sea-bg">
        <b-container class="p-5" v-if="account != null">
            <b-form>               
                <h2>{{account.username}} <b-badge class="m-1" pill v-for="item in account.claims" :key=item :variant=getBadgeColor(item)>{{ item }}</b-badge></h2>

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
            </b-form>
        </b-container>

        <b-container v-if="currentUserAccount.claims.includes('Administrator')">
            <h2>Account Administration</h2>

            <b-card class="p-2">
                <b-card class="m-2 p-2">
                    <h4>Administrative Actions</h4>
                    <b-row>
                        <b-col>
                            <b-button variant="danger">Ban Player</b-button>
                            <b-button variant="danger">Ban IP</b-button>
                            <b-button variant="warning">Mute Player</b-button>
                            <b-button variant="warning">Unmute Player</b-button>
                            <b-button variant="secondary">Update Role</b-button>
                            <b-button variant="success">Unban Player</b-button>
                        </b-col>
                    </b-row>
                </b-card>
                
                <b-card class="m-2 p-2">
                    <b-nav tabs>
                        <b-nav-item :active="isActive('lobbies')" @click="setTab('lobbies')"><h5>Lobbies</h5></b-nav-item>
                        <b-nav-item :active="isActive('chats')" @click="setTab('chats')"><h5>Chats</h5></b-nav-item>
                        <b-nav-item :active="isActive('specialists')" @click="setTab('specialists')"><h5>Specialists</h5></b-nav-item>
                        <b-nav-item :active="isActive('specialists-packages')" @click="setTab('specialists-packages')"><h5>Specialist Packages</h5></b-nav-item>
                        <b-nav-item :active="isActive('ban-history')" @click="setTab('ban-history')"><h5>Ban History</h5></b-nav-item>
                        <b-nav-item :active="isActive('social')" @click="setTab('social')"><h5>Social</h5></b-nav-item>
                    </b-nav>

                    <b-container v-if="selectedTab == 'social'">
                        <b-row>
                            <b-col>
                                <b-table :items="friends" responsive selectable small show-empty>
                                    <template #empty="scope">
                                        <b-alert show variant="warning">No Friends</b-alert>
                                    </template>
                                </b-table>
                            </b-col>
                            <b-col>
                                <b-table :items="friendRequests" responsive selectable small show-empty>
                                    <template #empty="scope">
                                        <b-alert show variant="warning">No Friend Requests</b-alert>
                                    </template>
                                </b-table>
                            </b-col>
                            <b-col>
                                <b-table :items="blockedUsers" responsive selectable small show-empty>
                                    <template #empty="scope">
                                        <b-alert show variant="warning">No Blocked Users</b-alert>
                                    </template>
                                </b-table>
                            </b-col>
                        </b-row>
                    </b-container>

                    <b-table :items="queryResults" responsive selectable small show-empty v-else>
                        <template #empty="scope">
                            <b-alert show variant="warning">No Results</b-alert>
                        </template>
                    </b-table>
                </b-card>
            </b-card>
        </b-container>
    </div>
</template>

<script>
import Hero from "../components/global/Hero";
import AppDownload from "../components/global/AppDownload.vue";
import api from "../classes/Api";

export default {
    components: { Hero, AppDownload },
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
                    this.queryResults = response.data.messages;
                }
            )
        },
        getPlayerSpecialistPackages() {
            api.getSpecialistPackages({ CreatedByPlayerId: this.accountId }).then(
                (response) => {
                    this.queryResults = response.data.messages;
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
                    this.blockedUsers = response.data.blockedUsers;
                }
            )
            api.getPlayerFriends(this.accountId).then(
                (response) => {
                    this.friends = response.data.friendRequests;
                }
            )
            api.getPlayerFriendRequests(this.accountId).then(
                (response) => {
                    this.friendRequests = response.data.friends;
                }
            )
        },

    },
    created() {
        this.getAccountDetails();
    }
}
</script>

<style>

.sea-bg {
    background: url("../assets/sea.png");
    color: rgb(204, 204, 204)
}

</style>