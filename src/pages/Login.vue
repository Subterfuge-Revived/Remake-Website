<template>
    <div>
        <Hero>
            <template slot="title">Login to {{ config.VUE_APP_TITLE }}</template>
            <b-container sm="12" md="4" class="text-center">
                <TextContent class="login-box text-center">
                        <b-container sm="12" md="4" class="p-5">
                                <b-form>
                                <b-form-group>
                                    <b-input-group prepend="Username" class="mb-2 mr-sm-2 mb-sm-0">
                                        <b-input v-model="username" placeholder="Username"></b-input>
                                    </b-input-group>
                                </b-form-group>

                                <b-form-group>
                                    <b-input-group prepend="Password" class="mb-2 mr-sm-2 mb-sm-0">
                                        <b-input v-model="password" type="password" placeholder="Password"></b-input>
                                    </b-input-group>
                                </b-form-group>

                                <b-alert v-model="isError" variant="danger">
                                    Invalid username or password.
                                </b-alert>

                                <div class="text-center">
                                    <b-button variant="dark" @click="tryLogin()"> Login </b-button>
                                </div>
                            </b-form>
                        </b-container>
                </TextContent>
            </b-container>
        </Hero>
        <b-container>
            <h2 class="white">No account? Download the app!</h2>
            <app-download></app-download>
        </b-container>
    </div>
</template>

<script>
import Hero from "../components/global/Hero";
import TextContent from "../components/global/TextContent.vue";
import AppDownload from "../components/global/AppDownload.vue";
import api from "../classes/Api";

export default {
    components: { Hero, AppDownload, TextContent },
    data() {
        return {
            username: '',
            password: '',
            isError: false,
            config: config,
        }
    },
    methods: {
        tryLogin() {
            const self = this;
            api.tryLogin(this.username, this.password).then(
                (response) => {
                    if(response.status == 200 && response.data.token != null) {
                        localStorage.setItem('user', JSON.stringify(response.data.user));
                        localStorage.setItem('access_token', response.data.token);
                        this.$router.push({ path: 'account', query: { id: response.data.user.id }})
                    }
                },
                (fail) => {
                    console.error(fail)
                }
            ).catch(
                (e) => {
                    console.error(e)
                    self.isError = true;
                }
            );
        }
    }
    
}
</script>

<style>

.grey-bg {
    background-color: gray;
}

.login-box {
    border-radius: 10px;
    margin: auto;
}

</style>