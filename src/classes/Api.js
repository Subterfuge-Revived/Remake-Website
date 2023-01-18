import Axios from 'axios';

let api = {
    tryLogin(username, password) {
        return Axios.post(`http://${CONFIG.serverUrl}/api/user/login`, { "username": username, "password": password}).then(
            (response) => {
                if(response.status == 200 && response.data.token != null) {
                    localStorage.setItem('subterfuge_access_token', response.data.token);
                    Axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                }
                return response;
            },
            (response) => {
                Axios.defaults.headers.common['Authorization'] = null;
                return response;
            }
        );
    },
    setToken(token) {
        Axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    },
    getUsers(formQueryData) {
        var url = `http://${CONFIG.serverUrl}/api/user/query?`
        var token = localStorage.getItem('subterfuge_access_token');

        if(formQueryData.usernameSearch != "") {
            url += `UsernameSearch=${formQueryData.usernameSearch}&`
        }

        if(formQueryData.emailSearch != "") {
            url += `EmailSearch=${formQueryData.emailSearch}&`
        }

        if(formQueryData.deviceIdSearch != "") {
            url += `DeviceIdentifierSearch=${formQueryData.deviceIdSearch}&`
        }

        if(formQueryData.userIdSearch != "") {
            url += `UserIdSearch=${formQueryData.userIdSearch}&`
        }

        if(formQueryData.hasRole != "") {
            url += `RequireUserClaim=${formQueryData.hasRole}&`
        }

        if(formQueryData.isBanned != "") {
            url += `isBanned=${formQueryData.isBanned}&`
        }

        if(formQueryData.pagination != "") {
            url += `pagination=${formQueryData.pagination}&`
        }

        return Axios.get(url, {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
           })
    },
}

export default api;