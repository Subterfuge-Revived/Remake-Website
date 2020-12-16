import Axios from 'axios';

let api = {
    tryLogin(username, password) {
        return Axios.post('http://52.14.116.178/api/login', { username, password});
    }
}

export default api;