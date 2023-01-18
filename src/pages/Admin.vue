<template>
    <div class="sea-bg text-center">
        <b-container class="p-5" style="color: black;">
            <b-row class="p-5">
                <b-col>
                    <b-card title="Status">
                        Online
                    </b-card>
                </b-col>
                <b-col>
                    <b-card title="Uptime">
                        TODO
                    </b-card>
                </b-col>
                <b-col>
                    <b-card title="CPU %">
                        TODO
                    </b-card>
                </b-col>
                <b-col>
                    <b-card title="Memory %">
                        TODO
                    </b-card>
                </b-col>
                <b-col>
                    <b-card title="Disk %">
                        TODO
                    </b-card>
                </b-col>
            </b-row>
            <b-row class="p-5">
                <b-col>
                    <b-card title="Total Players">
                        <!-- https://github.com/samber/chartjs-plugin-datasource-prometheus -->
                        TODO (graph?)
                    </b-card>
                </b-col>
                <b-col>
                    <b-card title="Ongoing Lobbies">
                        TODO (graph?)
                    </b-card>
                </b-col>
                <b-col>
                    <b-card title="Events Submitted">
                        TODO (graph?)
                    </b-card>
                </b-col>

            </b-row>
        </b-container>

        <b-container class="p-5">
            <b-nav tabs>
                <b-nav-item :active="isActive('users')" @click="setTab('users')"><h3>Users</h3></b-nav-item>
                <b-nav-item :active="isActive('lobbies')" @click="setTab('lobbies')"><h3>Game Lobbies</h3></b-nav-item>
                <b-nav-item :active="isActive('server-logs')" @click="setTab('server-logs')"><h3>Server Logs</h3></b-nav-item>
                <b-nav-item :active="isActive('server-exceptions')" @click="setTab('server-exceptions')"><h3>Server Exceptions</h3></b-nav-item>
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
            <b-card style="color: black" title="Search Server Logs">
                    <b-form class="m-5">
                        <b-row class="m-5">
                            <b-col>
                                <b-form-group label="Username">
                                    <b-form-input v-model="serverLogQuery.usernameSearch" placeholder="Username Search"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label="User Id">
                                    <b-form-input v-model="serverLogQuery.userIdSearch" placeholder="User ID Search"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label="Http Method">
                                    <b-form-input v-model="serverLogQuery.httpMethod" placeholder="Http Method Search"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row class="m-5">
                            <b-col>
                                <b-form-group label="Request URL">
                                    <b-form-input v-model="serverLogQuery.RequestUrl" placeholder="Request URL Search"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label="Page Number (50 per page)">
                                    <b-form-input v-model="serverLogQuery.pagination" placeholder="Page Number"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-button variant="success" @click="queryServerLogs">Query</b-button>
                    </b-form>

                    <b-table :items="serverLogs"></b-table>
            </b-card>
        </b-container>

        <b-container v-if="selectedTab == 'server-exceptions'">
            <b-card style="color: black" title="Search Server Exceptions">
                    <b-form class="m-5">
                        <b-row class="m-5">
                            <b-col>
                                <b-form-group label="Username">
                                    <b-form-input v-model="serverLogQuery.usernameSearch" placeholder="Username Search"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label="User Id">
                                    <b-form-input v-model="serverLogQuery.userIdSearch" placeholder="User ID Search"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label="Http Method">
                                    <b-form-input v-model="serverLogQuery.httpMethod" placeholder="Http Method Search"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row class="m-5">
                            <b-col>
                                <b-form-group label="Exception Source">
                                    <b-form-input v-model="serverLogQuery.ExceptionSource" placeholder="Exception Source"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label="Remote IP">
                                    <b-form-input v-model="serverLogQuery.RemoteIpAddress" placeholder="Remote IP"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label="Request URL">
                                    <b-form-input v-model="serverLogQuery.RequestUrl" placeholder="Request URL Search"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group label="Page Number (50 per)">
                                    <b-form-input v-model="serverLogQuery.pagination" placeholder="Page Number"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-button variant="success" @click="queryServerExceptions">Query</b-button>
                    </b-form>

                    <b-table :items="serverExceptions"></b-table>
            </b-card>
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
            serverLogQuery: {
                pagination: 1,
                usernameSearch: "",
                userIdSearch: "",
                httpMethod: "",
                RequestUrl: "",
            },
            serverExceptionQuery: {
                usernameSearch: "",
                userIdSearch: "",
                httpMethod: "",
                RequestUrl: "",
                pagination: 1,
                ExceptionSource: "",
                RemoteIpAddress: ""
            },
            serverOnline: false,
            userResponse: [],
            serverLogs: [],
            serverExceptions: [],
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
        queryServerLogs() {
            api.getServerLogs(this.serverLogQuery).then(
                (response) => {
                    this.serverLogs = response.data.actions;
                },
                (fail) => {
                    console.error(fail);
                }
            );
        },
        queryServerExceptions() {
            api.getServerExceptions(this.serverExceptionQuery).then(
                (response) => {
                    this.serverExceptions = response.data.exceptions;
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