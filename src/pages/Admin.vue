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

        <b-container>
        <b-card class="p-5">
            <b-nav tabs>
                <b-nav-item :active="isActive('users')" @click="setTab('users')"><h3>Users</h3></b-nav-item>
                <b-nav-item :active="isActive('lobbies')" @click="setTab('lobbies')"><h3>Game Lobbies</h3></b-nav-item>
                <b-nav-item :active="isActive('server-logs')" @click="setTab('server-logs')"><h3>Activity Logs</h3></b-nav-item>
                <b-nav-item :active="isActive('server-exceptions')" @click="setTab('server-exceptions')"><h3>Server Exceptions</h3></b-nav-item>
            </b-nav>

            <dynamic-form title="Search Users" :options="userOptions" @query="getUsers" v-if="selectedTab == 'users'" key="users"></dynamic-form>
            <dynamic-form title="Search Lobbies" :options="lobbyOptions" @query="getLobbies" v-else-if="selectedTab == 'lobbies'" key="lobbies"></dynamic-form>
            <dynamic-form title="Search Activity Log" :options="serverLogOptions" @query="getServerLogs" v-else-if="selectedTab == 'server-logs'" key="server-logs"></dynamic-form>
            <dynamic-form title="Search Exceptions" :options="serverExceptionOptions" @query="getServerExceptions" v-else-if="selectedTab == 'server-exceptions'" key="server-exceptions"></dynamic-form>
        
            <b-table :items="queryResults" responsive selectable small @row-selected="goTo"></b-table>
        </b-card>
        </b-container>
    </div>
</template>

<script>
import api from "../classes/Api";
import DynamicForm from "../components/ApiForms/DynamicForm.vue"

export default {
    components: { DynamicForm },
    name: 'admin',
    data() {
        return {
            userOptions: [
                {
                    name: "Username",
                    type: "text",
                    description: "Search for a specific username",
                },
                {
                    name: "Email",
                    type: "text",
                    description: "Search for user with a specific email",
                },
                {
                    name: "Device ID",
                    type: "text",
                    description: "Search for user with a specific Device ID",
                },
                {
                    name: "User ID",
                    type: "text",
                    description: "Search for specific User ID",
                },
                {
                    name: "Has Role",
                    type: "select",
                    options: [
                        "Unknown",
                        "User",
                        "Moderator",
                        "Administrator",
                        "EmailVerified",
                        "Banned",
                        "Muted",
                    ],
                    description: "Search for users that have a particular role",
                },
                {
                    name: "Is Banned",
                    type: "boolean",
                    description: "Search for only banned or unbanned users",
                },
                {
                    name: "Pagination",
                    type: "number",
                    description: "Page number",
                }
            ],
            lobbyOptions: [
                {
                    name: "Room ID",
                    type: "text",
                    description: "Search for a specific Room ID"
                },
                {
                    name: "Created By",
                    type: "text",
                    description: "Search for a UserID that created the lobby"
                },
                {
                    name: "User In Room",
                    type: "text",
                    description: "Search for lobbies that a user is in"
                },
                {
                    name: "Goal",
                    type: "select",
                    options: [
                        "Mining", 
                        "Domination"
                    ],
                    description: "Search for lobbies with a specific game type"
                },
                {
                    name: "Min Players",
                    type: "number",
                    description: "Search for lobbies with at least this many players"
                },
                {
                    name: "Max Players",
                    type: "number",
                    description: "Search for lobbies with at most this many players"
                },
                {
                    name: "Is Anon",
                    type: "boolean",
                    description: "Search for Anonymous lobbies"
                },
                {
                    name: "Is Ranked",
                    type: "boolean",
                    description: "Search for ranked lobbies"
                },
                {
                    name: "Room Status",
                    type: "select",
                    options: [
                        "Open",
                        "Ongoing",
                        "Closed",
                        "Completed",
                        "Expired"
                    ],
                    description: "Search for a specific room status"
                },
                {
                    name: "Pagination",
                    type: "number",
                    description: "Page number"
                },
            ],
            serverLogOptions : [
                {
                    name: "Pagination",
                    type: "number",
                    description: "Page number"
                },
                {
                    name: "Username",
                    type: "text",
                    description: "Search for actions by a specific user"
                },
                {
                    name: "User ID",
                    type: "text",
                    description: "Search for actions by a specific user"
                },
                {
                    name: "Http Method",
                    type: "text",
                    description: "Search for actions to a specific method"
                },
                {
                    name: "Request Url",
                    type: "text",
                    description: "Search for actions to a specific url"
                },
            ],
            serverExceptionOptions: [
                {
                    name: "Username",
                    type: "text",
                    description: "Search for exceptions caused by a specific player"
                },
                {
                    name: "User ID",
                    type: "text",
                    description: "Search for exceptions caused by a specific player"
                },
                {
                    name: "Http Method",
                    type: "text",
                    description: "Search for exceptions on a specific Http Method"
                },
                {
                    name: "Request Url",
                    type: "text",
                    description: "Search for exceptions at a specific URL"
                },
                {
                    name: "Exception Source",
                    type: "text",
                    description: "Search for exceptions generated by a specific class"
                },
                {
                    name: "Remote IP Address",
                    type: "text",
                    description: "Search for exceptions generated by a specific IP address"
                },
            ],
            selectedTab: 'users',
            queryResults: []
        };
    },
    methods: {
        setTab(tabName) {
            this.selectedTab = tabName;
            this.queryResults = [];
        },
        isActive(tabName) {
            return this.selectedTab == tabName;
        },
        getUsers(getUserData) {
            api.getUsers(getUserData).then(
                (response) => {
                    this.queryResults = response.data.users;
                },
                (fail) => {
                    console.error(fail);
                }
            );
        },
        getLobbies(lobbyQuery) {
            api.getLobbies(lobbyQuery).then(
                (response) => {
                    this.queryResults = response.data.lobbies;
                },
                (fail) => {
                    console.error(fail);
                }
            );
        },
        getServerLogs(serverQuery) {
            api.getServerLogs(serverQuery).then(
                (response) => {
                    this.queryResults = response.data.actions;
                },
                (fail) => {
                    console.error(fail);
                }
            );
        },
        getServerExceptions(exceptionQuery) {
            api.getServerExceptions(exceptionQuery).then(
                (response) => {
                    this.queryResults = response.data.exceptions;
                },
                (fail) => {
                    console.error(fail);
                }
            );
        },
        goTo(dataSelected) {
            if(this.selectedTab == 'users') {
                this.$router.push({ path: 'account', query: { id: dataSelected[0].id }})
            }
        }
    }
}
</script>

<style>

.sea-bg {
    background: url("../assets/sea.png");
    color: rgb(204, 204, 204)
}

</style>