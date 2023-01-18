<template>
    <div class="sea-bg text-center">
        <b-container class="p-5">
            <b-nav tabs>
                <b-nav-item :active="isActive('users')" @click="setTab('users')">Users</b-nav-item>
                <b-nav-item :active="isActive('lobbies')" @click="setTab('lobbies')">Game Lobbies</b-nav-item>
                <b-nav-item :active="isActive('server-logs')" @click="setTab('server-logs')">Server Logs</b-nav-item>
                <b-nav-item :active="isActive('server-exceptions')" @click="setTab('server-exceptions')">Server Exceptions</b-nav-item>
            </b-nav>

            <b-container class="m-5" v-if="selectedTab == 'users'">
                <b-card style="color: black" title="Search Users">
                    <b-form class="m-5">
                        <b-row class="m-5">
                            <b-col>
                                <b-form-group label="Username">
                                    <b-form-input v-model="userQuery.usernameSearch" placeholder="Username Search"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label="Email">
                                    <b-form-input v-model="userQuery.emailSearch" placeholder="Email Search"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label="Device Id">
                                    <b-form-input v-model="userQuery.deviceIdSearch" placeholder="Device Id Search"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row class="m-5">
                            <b-col>
                                <b-form-group label="User ID">
                                    <b-form-input v-model="userQuery.userIdSearch" placeholder="User ID"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label="Has Role">
                                    <b-form-select v-model="userQuery.hasRole" :options="roleOptions"></b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-checkbox v-model="userQuery.isBanned">Is Banned?</b-form-checkbox>
                            </b-col>
                        </b-row>
                        <b-button variant="success" @click="queryUsers">Query</b-button>
                    </b-form>

                    <b-table :items="userResponse"></b-table>
            </b-card>            
        </b-container>

        <b-container v-if="selectedTab == 'lobbies'">
            Lobby List Here
        </b-container>

        <b-container v-if="selectedTab == 'server-logs'">
            Server Logs Here
        </b-container>

        <b-container v-if="selectedTab == 'server-exceptions'">
            Server Exceptions Here
        </b-container>


        </b-container>
    </div>
</template>

<script>
import api from "../classes/Api";

export default {
    components: {  },
    name: 'admin',
    data() {
        return {
            roleOptions: [
                "Unknown",
                "User",
                "Moderator",
                "Administrator",
                "EmailVerified",
                "Banned",
                "Muted",
                ""
            ],
            selectedTab: 'users',
            account: JSON.parse(localStorage.getItem('user')),
            userQuery: {
                usernameSearch: "",
                emailSearch: "",
                deviceIdSearch: "",
                userIdSearch: "",
                hasRole: "",
                isBanned: false,
                pagination: 1,
            },
            userResponse: [],
        };
    },
    methods: {
        setTab(tabName) {
            this.selectedTab = tabName;
        },
        isActive(tabName) {
            return this.selectedTab == tabName;
        },
        queryUsers() {
            api.getUsers(this.userQuery).then(
                (response) => {
                    this.userResponse = response.data.users;
                },
                (fail) => {
                    console.error(fail);
                }
            );
        },
    }
}
</script>

<style>

.sea-bg {
    background: url("../assets/sea.png");
    color: rgb(204, 204, 204)
}

</style>