<template>
    <div class="text-center">
        <b-container class="p-5" style="color: black;">
            <b-row class="p-5">
                <b-col>
                    <TextContent class="p-3 maxHeight">
                        <h4>Status</h4>
                        <p>Online</p>
                    </TextContent>
                </b-col>
                <b-col>
                    <TextContent class="p-3 maxHeight">
                        <h4>Uptime</h4>
                        <p>TODO</p>
                    </TextContent>
                </b-col>
                <b-col>
                    <TextContent class="p-3 maxHeight">
                        <h4>CPU %</h4>
                        <p>TODO</p>
                    </TextContent>
                </b-col>
                <b-col>
                    <TextContent class="p-3 maxHeight">
                        <h4>Memory %</h4>
                        <p>TODO</p>
                    </TextContent>
                </b-col>
                <b-col>
                    <TextContent class="p-3 maxHeight">
                        <h4>Disk %</h4>
                        <p>TODO</p>
                    </TextContent>
                </b-col>
            </b-row>
            <b-row class="p-5">
                <b-col>
                    <TextContent class="p-3 maxHeight">
                        <!-- https://github.com/samber/chartjs-plugin-datasource-prometheus -->
                        <h4>Total Players</h4>
                        <p>TODO</p>
                    </TextContent>
                </b-col>
                <b-col>
                    <TextContent class="p-3 maxHeight">
                        <h4>Ongoing Lobbies</h4>
                        <p>TODO</p>
                    </TextContent>
                </b-col>
                <b-col>
                    <TextContent class="p-3 maxHeight">
                        <h4>Events Submitted</h4>
                        <p>TODO</p>
                    </TextContent>
                </b-col>
                <b-col>
                    <TextContent class="p-3 maxHeight">
                        <h4>Player Retention</h4>
                        <p>TODO - Account activity after 1 week of account creation</p>
                    </TextContent>
                </b-col>

            </b-row>
        </b-container>

        <b-container>
        <TextContent class="p-5">
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

            <b-container class="p-4 white" style="margin: auto">
                <b-table :items="queryResults" responsive selectable small @row-selected="goTo" show-empty hover>
                    <!-- User Template Fields -->
                    <template #cell(claims)="data">
                        {{ data.item.claims.join(", ") }}
                    </template>

                    <template #cell(multiboxAccounts)="data">
                        {{ data.item.multiboxAccounts.map(it => it.user.username).join(", ") }}
                    </template>

                    <template #cell(dateCreated)="data">
                        {{ getFriendlyDate(data.item.dateCreated) }}
                    </template>

                    <template #cell(bannedUntil)="data">
                        {{ getFriendlyDate(data.item.bannedUntil) }}
                    </template>

                    <!-- Lobby Template Fields -->
                    <template #cell(creator)="data">
                        {{ data.item.creator.username }}
                    </template>

                    <template #cell(roomStatus)="data">
                        {{ data.item.roomStatus }}
                        <b-badge v-if="data.item.roomStatus == 'Ongoing'" variant="success">Tick: {{ getCurrentTick(data.item.timeStarted, data.item.gameSettings.minutesPerTick) }}</b-badge>
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

                    <template #cell(timeCreated)="data">
                        {{ getFriendlyDate(data.item.timeCreated) }}
                    </template>

                    <template #cell(timeStarted)="data">
                        {{ getFriendlyDate(data.item.timeStarted) }}
                    </template>

                    <template #cell(expiresAt)="data">
                        {{ getFriendlyDate(data.item.expiresAt) }}
                    </template>

                    <template #cell(playersInLobby)="data">
                        <b-badge pill v-if="data.item.gameSettings.maxPlayers == data.item.playersInLobby.length" variant="danger">{{ data.item.playersInLobby.length }} / {{ data.item.gameSettings.maxPlayers }}</b-badge>
                        <b-badge pill v-else variant="success">{{ data.item.playersInLobby.length }} / {{ data.item.gameSettings.maxPlayers }}</b-badge>
                        {{ data.item.playersInLobby.map(it => it.username).join(", ") }}
                    </template>

                    
                    <!-- Activity Log Fields -->
                    <template #cell(timeProcessed)="data">
                        {{ getFriendlyDate(data.item.timeProcessed) }}
                    </template>

                    <template #empty="scope">
                        <b-alert show variant="info" v-if="!hasQueried">Perform a query to view results. Adding no filters will query all {{ selectedTab }}</b-alert>
                        <b-alert show variant="warning" v-else>No {{ selectedTab }}</b-alert>
                    </template>
                </b-table>
            </b-container>        
        </TextContent>
        </b-container>
    </div>
</template>

<script>
import api from "../classes/Api";
import moment from "moment";
import DynamicForm from "../components/ApiForms/DynamicForm.vue"
import TextContent from "../components/global/TextContent.vue";

export default {
    components: { DynamicForm, TextContent },
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
            hasQueried: false,
            queryResults: []
        };
    },
    methods: {
        setTab(tabName) {
            this.selectedTab = tabName;
            this.queryResults = [];
            this.hasQueried = false;
        },
        isActive(tabName) {
            return this.selectedTab == tabName;
        },
        getUsers(getUserData) {
            api.getUsers(getUserData).then(
                (response) => {
                    this.hasQueried = true;
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
                    this.hasQueried = true;
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
                    this.hasQueried = true;
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
                    this.hasQueried = true;
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
            } else if (this.selectedTab == 'lobbies') {
                this.$router.push({ path: 'lobby', query: { id: dataSelected[0].id }})
            }
        },
        getUsernameList(userList) {
            return userList.map(it => it.userName);
        },
        getFriendlyDate(time) {
            return moment(time).format('MMMM Do YYYY, h:mm:ss a');
        },
        getCurrentTick(startTime, minutesPerTick) {
            return moment().diff(moment(startTime), 'minutes') / minutesPerTick
        },
    }
}
</script>

<style>

.table {
    color: rgb(201, 201, 201);
}

.maxHeight {
    height: 100%;
}

</style>