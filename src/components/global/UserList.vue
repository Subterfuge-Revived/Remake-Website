<template>
    <b-container>
        <b-list-group dark>
            <b-list-group-item button class="list-item-subs grey-text" v-for="user in users" :key="user.id" xs="4" @click="goToUser(user)">
                <b-row>
                    <b-col xs="8">
                        {{user.username}}
                        <b-badge class="m-1" pill v-if="creatorId != null && creatorId != undefined && isPlayerTheCreator(user)" variant="success">Creator</b-badge>
                        <b-badge class="m-1" pill v-for="item in user.claims" :key=item :variant=getBadgeColor(item)>{{ item }}</b-badge>
                        <b-badge class="m-1" pill v-if="isBanned(user)" variant="danger">Banned</b-badge>
                    </b-col>
                    <b-col xs="4" class="text-center">
                        <b-button-group>
                            <b-button variant="danger" v-if="isCurrentUserAdmin && !isBanned(user)" @click="confirmAction('ban player', data.item)">Ban player</b-button>
                        </b-button-group>
                    </b-col>
                </b-row>
            </b-list-group-item>
            <b-alert v-if="users.length == 0" show variant="warning">No users to show</b-alert>
        </b-list-group>
    </b-container>
</template>

<script>
export default {
    props: {
        users: {
            type: Array,
        },
        creatorId: {
            type: String
        }
    },
    data() {
        return {
            currentUser: JSON.parse(localStorage.getItem('user'))
        }
    },
    methods: {
        isCurrentUserAdmin() {
            return this.currentUser.claims.includes('Administrator')
        },
        isPlayerTheCreator(user) {
            return user.id === this.creatorId;
        },
        getBadgeColor(roleName) {
            switch(roleName) {
                case "Administrator":
                    return "primary";
                case "User":
                    return "secondary";
                case "EmailVerified":
                case "DiscordVerified":
                case "PhoneVerified":
                    return "success";
                case "Banned":
                    return "danger"
            }
        },
        isBanned(user) {
            return new Date(user.bannedUntil) > new Date()
        },
        goToUser(user) {
            this.$router.push({ path: '/account', query: { id: user.id } })
        }
    }
}
</script>

<style>

.list-item-subs {
    background-color: rgba(0,0,0,0);
    border-color: white;
}

.grey-text {
    color: rgb(201, 201, 201);
}

</style>