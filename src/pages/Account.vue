<template>
    <div>
        <div v-if="account != null">
            <b-container class="p-5">
                <b-form>               
                    <h2 class="white">
                        {{account.username}} <b-badge class="m-1" pill v-for="item in account.claims" :key=item :variant=getBadgeColor(item)>{{ item }}</b-badge>
                        <b-badge class="m-1" pill v-if="isBanned()" variant="danger">Banned</b-badge>
                        </h2>

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
                    <TextContent class="m-2 p-2" v-if="currentUserAccount.claims.includes('Administrator') && currentUserAccount.id != account.id">
                        <h4>Administrative Actions</h4>
                        <b-row>
                            <b-col>
                                <b-button variant="danger" v-if="!isBanned()" @click="confirmAction('ban player')">Ban Player</b-button>
                                <b-button variant="danger" @click="confirmAction('ban ip')">Ban IP</b-button>
                                <b-button variant="secondary" @click="confirmAction('update player roles')">Update Role</b-button>
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
                                    <b-table :items="friends" responsive selectable small show-empty @row-selected="goto">
                                        <template #cell(id)="data">
                                            <div v-b-popover.hover.top="data.item.id" title="Id">
                                                {{ data.item.id.slice(0, 10) + "....." }}
                                            </div>
                                        </template>
                                        <template #empty="scope">
                                            <b-alert show variant="warning">No Friends</b-alert>
                                        </template>
                                    </b-table>
                                </b-col>
                                <b-col>
                                    <h2>Friend Requests</h2>
                                    <b-table :items="friendRequests" responsive selectable small show-empty @row-selected="goto">
                                        <template #cell(id)="data">
                                            <div v-b-popover.hover.top="data.item.id" title="Id">
                                                {{ data.item.id.slice(0, 10) + "....." }}
                                            </div>
                                        </template>
                                        <template #empty="scope">
                                            <b-alert show variant="warning">No Friend Requests</b-alert>
                                        </template>
                                    </b-table>
                                </b-col>
                                <b-col>
                                    <h2>Blocked Users</h2>
                                    <b-table :items="blockedUsers" responsive selectable small show-empty @row-selected="goto">
                                        <template #cell(id)="data">
                                            <div v-b-popover.hover.top="data.item.id" title="Id">
                                                {{ data.item.id.slice(0, 10) + "....." }}
                                            </div>
                                        </template>
                                        <template #empty="scope">
                                            <b-alert show variant="warning">No Blocked Users</b-alert>
                                        </template>
                                    </b-table>
                                </b-col>
                            </b-row>
                        </b-container>

                        <b-table :items="queryResults" responsive selectable small show-empty v-else @row-selected="goto">
                            <template #cell(id)="data">
                                <div v-b-popover.hover.top="data.item.id" title="Id">
                                    {{ data.item.id.slice(0, 10) + "....." }}
                                </div>
                            </template>

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

                            <!-- Ban overrides -->
                            <template #cell(dateExpires)="data">
                                {{ getFriendlyDate(data.item.dateExpires) }}
                            </template>

                            <template #cell(dateApplied)="data">
                                {{ getFriendlyDate(data.item.dateApplied) }}
                            </template>

                            <template #empty="scope">
                                <b-alert show variant="warning">No Results</b-alert>
                            </template>
                        </b-table>
                    </TextContent>
                </TextContent>
            </b-container>
        </div>
        <div v-else>
            <b-alert variant="info" show>Loading profile...</b-alert>
        </div>

        <b-modal id="confirm-modal" title="Confirm" v-model="confirm.show" @ok="confirm.onConfirm">
            <div v-if="this.confirm.confirmAction === 'ban player'">
                <b-alert variant="danger" show>You are about to ban: <b>{{ account.username }}</b></b-alert>
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
            <div v-else-if="this.confirm.confirmAction === 'ban ip'">
                <b-form class="m-3">
                    <b-container>
                        <b-input-group prepend="Ip Address" class="p-3">
                            <b-form-input v-model="banData.ipOrRegex" placeholder="Ip address to Ban" trim></b-form-input>
                        </b-input-group>
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
            <div v-else-if="this.confirm.confirmAction === 'update player roles'">
                <b-alert variant="info" show>You are about to update the roles for: <b>{{ account.username }}</b></b-alert>
                <b-form>
                    <b-container>
                         <b-form-group
                            label="Player Roles"
                            v-slot="{ ariaDescribedby }">
                        <b-form-checkbox-group
                            v-model="selectedUserRoles"
                            :options="roles"
                            :aria-describedby="ariaDescribedby"
                            switches
                            stacked
                        ></b-form-checkbox-group>
                        </b-form-group>
                    </b-container>
                </b-form>
            </div>

            <b-alert variant="warning" show class="my-4">Are you sure you want to {{ confirm.confirmAction }}?</b-alert>
        </b-modal>
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
            roles: [
                "User",
                "Moderator",
                "Administrator",
                "EmailVerified",
                "PhoneVerified",
                "DiscordVerified"
            ],
            selectedTab: "lobbies",
            accountId: this.$route.query.id,
            account: null,
            currentUserAccount: JSON.parse(localStorage.getItem('user')),
            queryResults: [],
            friends: [],
            friendRequests: [],
            blockedUsers: [],
            confirm: {
                show: false,
                onConfirm: () => {},
                confirmAction: "",
            },
            banData: {
                ipOrRegex: "",
                until: new Date(),
                reason: "",
                adminNotes: ""
            },
            selectedUserRoles: [],
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
                    console.log(response.data.users[0].banHistory);
                    if(response.data.users.length == 1) {
                        this.queryResults = response.data.users[0].banHistory;
                    } else {
                        this.queryResults = [];
                    }
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
        goto(selectedItem) {
            if(this.selectedTab == 'lobbies') {
                this.$router.push({ path: 'lobby', query: { id: selectedItem[0].id }})
            } else if (this.selectedTab == 'chats') {
            } else if (this.selectedTab == "specialists") {
            }  else if (this.selectedTab == "specialists-packages") {
            } else if (this.selectedTab == "ban-history") {
            } else if (this.selectedTab == "social") {
                this.$router.push({ path: 'account', query: { id: selectedItem[0].id }})
            }
        },
        confirmAction(action, data = null) {
            this.confirm.confirmAction = action;
            this.confirm.show = true;
            if(this.confirm.confirmAction === "ban player") {
                this.confirm.onConfirm = this.banPlayer;
            } else if (this.confirm.confirmAction === "ban ip") {
                this.confirm.onConfirm = this.banIp;
            } else if (this.confirm.confirmAction === "update player roles") {
                this.selectedUserRoles = this.account.claims;
                this.confirm.onConfirm = this.updateRoles;
            }
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
        banPlayer() {
            var banRequest = {
                userId: this.account.id,
                until: this.banData.until.toJSON(),
                reason: this.banData.reason,
                adminNotes: this.banData.adminNotes,
            }

            api.banPlayer(banRequest);
        },
        banIp() {
            var banIpRequest = {
                directIpOrRegex: this.banData.ipOrRegex,
                until: this.banData.until.toJSON(),
                reason: this.banData.reason,
                adminNotes: this.banData.adminNotes,
            }

            api.banIp(banIpRequest);
        },
        updateRoles() {
            var updateRoleRequest = {
                claims: this.selectedUserRoles
            }

            api.updateRoles(this.account.id, updateRoleRequest);
        }
    },
    created() {
        this.getAccountDetails();
    }
}
</script>

<style>
.table {
    color: rgb(201, 201, 201);
}
</style>