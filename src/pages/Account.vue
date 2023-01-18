<template>
    <div class="sea-bg">
        <b-container class="p-5">
            <b-form>                    
                <h2>{{account.username}} <b-badge class="m-1" pill v-for="item in account.claims" :key=item :variant=getBadgeColor(item)>{{ item }}</b-badge></h2>
                
                <b-form-group label="Account Created">
                    <b-form-input
                    id="input-1"
                    :value="new Date(account.dateCreated)"
                    type="datetime"
                    disabled
                    ></b-form-input>
                </b-form-group>

                <b-form-group label="Banned Until" v-if="isBanned()">
                    <b-form-input
                    id="input-1"
                    :value="new Date(account.bannedUntil)"
                    type="datetime"
                    disabled
                    ></b-form-input>
                </b-form-group>

                
            </b-form>
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
            account: JSON.parse(localStorage.getItem('user')),
        };
    },
    methods: {
        getBadgeColor(roleName) {
            switch(roleName) {
                case "Administrator":
                    return "danger";
                case "User":
                    return "secondary";
                case "EmailVerified":
                    return "success";
            }
        },
        isBanned() {
            return new Date(this.account.bannedUntil) > new Date()
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