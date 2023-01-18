<template>
    <div class="sea-bg">
        <Hero class="no-bg">
            <template slot="title">Login to {{ $t('appName') }}</template>
            <b-container class="login-border">
                <b-container class="p-5">
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
            </b-container>
        </Hero>
        <b-container>
            <h2>No account? Download the app!</h2>
            <app-download></app-download>
        </b-container>
    </div>
</template>

<script>
import Hero from "../components/global/Hero";
import AppDownload from "../components/global/AppDownload.vue";
import api from "../classes/Api";

export default {
    components: { Hero, AppDownload },
    data() {
        return {
            username: '',
            password: '',
            isError: false,
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

.sea-bg {
    background: url("../assets/sea.png");
    color: rgb(204, 204, 204);
}

.no-bg {
    background-color: rgba(0,0,0,0);
}

.login-border {
    width: 30%;
    color: rgb(231,237,240);
    border: 1px solid rgb(15, 20, 24);
    border-radius: 10px;
    background-color: rgba(15, 20, 24, 0.75);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

</style>