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
                delete Axios.defaults.headers.common['Authorization'];
                return response;
            }
        );
    },
    setToken(token) {
        Axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    },
    getUser(userId) {
        var url = `http://${CONFIG.serverUrl}/api/user?userId=${userId}`
        var token = localStorage.getItem('subterfuge_access_token');
        return Axios.get(url, {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        });
    },
    getUsers(formQueryData) {
        var url = `http://${CONFIG.serverUrl}/api/user/query?`
        var token = localStorage.getItem('subterfuge_access_token');

        if(formQueryData.Username != undefined) {
            url += `UsernameSearch=${formQueryData.Username}&`
        }

        if(formQueryData.Email != undefined) {
            url += `EmailSearch=${formQueryData.Email}&`
        }

        if(formQueryData.DeviceID != undefined) {
            url += `DeviceIdentifierSearch=${formQueryData.DeviceID}&`
        }

        if(formQueryData.UserID != undefined) {
            url += `UserIdSearch=${formQueryData.UserID}&`
        }

        if(formQueryData.HasRole != undefined) {
            url += `RequireUserClaim=${formQueryData.HasRole}&`
        }

        if(formQueryData.IsBanned != undefined) {
            url += `isBanned=${formQueryData.IsBanned}&`
        }

        if(formQueryData.Pagination != undefined) {
            url += `pagination=${formQueryData.Pagination}&`
        }

        return Axios.get(url, {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        });
    },
    getLobbies(formQueryData) {
        var url = `http://${CONFIG.serverUrl}/api/lobby?`
        var token = localStorage.getItem('subterfuge_access_token');

        if(formQueryData.Pagination != undefined) {
            url += `Pagination=${formQueryData.Pagination}&`
        }

        if(formQueryData.RoomStatus != undefined) {
            url += `RoomStatus=${formQueryData.RoomStatus}&`
        }

        if(formQueryData.CreatedBy != undefined) {
            url += `CreatedByUserId=${formQueryData.CreatedBy}&`
        }

        if(formQueryData.UserInRoom != undefined) {
            url += `UserIdInRoom=${formQueryData.UserInRoom}&`
        }

        if(formQueryData.RoomID != undefined) {
            url += `RoomId=${formQueryData.RoomID}&`
        }

        if(formQueryData.Goal != undefined) {
            url += `Goal=${formQueryData.Goal}&`
        }

        if(formQueryData.MinPlayers != undefined) {
            url += `MinPlayers=${formQueryData.MinPlayers}&`
        }

        if(formQueryData.MaxPlayers != undefined) {
            url += `MaxPlayers=${formQueryData.MaxPlayers}&`
        }

        if(formQueryData.IsAnon != undefined) {
            url += `MaxPlayers=${formQueryData.IsAnon}&`
        }

        if(formQueryData.IsRanked != undefined) {
            url += `MaxPlayers=${formQueryData.IsRanked}&`
        }

        return Axios.get(url, {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        });
    },
    getServerLogs(formQueryData) {
        var url = `http://${CONFIG.serverUrl}/api/admin/serverLog?`
        var token = localStorage.getItem('subterfuge_access_token');

        if(formQueryData.Username != undefined) {
            url += `Username=${formQueryData.Username}&`
        }

        if(formQueryData.UserID != undefined) {
            url += `UserId=${formQueryData.UserID}&`
        }

        if(formQueryData.HttpMethod != undefined) {
            url += `HttpMethod=${formQueryData.HttpMethod}&`
        }

        if(formQueryData.RequestUrl != undefined) {
            url += `RequestUrl=${formQueryData.RequestUrl}&`
        }

        if(formQueryData.Pagination != undefined) {
            url += `Pagination=${formQueryData.Pagination}&`
        }

        return Axios.get(url, {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        });
    },
    getServerExceptions(formQueryData) {
        var url = `http://${CONFIG.serverUrl}/api/admin/exceptions?`
        var token = localStorage.getItem('subterfuge_access_token');

        if(formQueryData.Username != undefined) {
            url += `Username=${formQueryData.Username}&`
        }

        if(formQueryData.UserID != undefined) {
            url += `UserId=${formQueryData.UserID}&`
        }

        if(formQueryData.HttpMethod != undefined) {
            url += `HttpMethod=${formQueryData.HttpMethod}&`
        }

        if(formQueryData.RequestUrl != undefined) {
            url += `RequestUrl=${formQueryData.RequestUrl}&`
        }

        if(formQueryData.Pagination != undefined) {
            url += `Pagination=${formQueryData.Pagination}&`
        }

        if(formQueryData.ExceptionSource != undefined) {
            url += `ExceptionSource=${formQueryData.ExceptionSource}&`
        }

        if(formQueryData.RemoteIpAddress != undefined) {
            url += `RemoteIpAddress=${formQueryData.RemoteIpAddress}&`
        }

        return Axios.get(url, {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        });
    },
    getUserChatMessages(queryData) {
        var url = `http://${CONFIG.serverUrl}/api/user/messages?`
        var token = localStorage.getItem('subterfuge_access_token');

        if(queryData.UserId != undefined) {
            url += `playerId=${queryData.UserId}&`
        }

        if(queryData.Pagination != undefined) {
            url += `pagination=${queryData.Pagination}&`
        }

        return Axios.get(url, {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        });
    },
    getSpecialists(queryData) {
        var url = `http://${CONFIG.serverUrl}/api/specialist?`
        var token = localStorage.getItem('subterfuge_access_token');

        if(queryData.Pagination != undefined) {
            url += `Pagination=${queryData.Pagination}&`
        }

        if(queryData.SearchTerm != undefined) {
            url += `SearchTerm=${queryData.SearchTerm}&`
        }

        if(queryData.PromotesFromSpecialistId != undefined) {
            url += `PromotesFromSpecialistId=${queryData.PromotesFromSpecialistId}&`
        }

        if(queryData.CreatedByPlayerId != undefined) {
            url += `CreatedByPlayerId=${queryData.CreatedByPlayerId}&`
        }

        return Axios.get(url, {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        });
    },
    getSpecialistPackages(queryData) {
        var url = `http://${CONFIG.serverUrl}/api/specialist/package?`
        var token = localStorage.getItem('subterfuge_access_token');

        if(queryData.Pagination != undefined) {
            url += `Pagination=${queryData.Pagination}&`
        }

        if(queryData.SearchTerm != undefined) {
            url += `SearchTerm=${queryData.SearchTerm}&`
        }

        if(queryData.CreatedByPlayerId != undefined) {
            url += `CreatedByPlayerId=${queryData.CreatedByPlayerId}&`
        }

        if(queryData.ContainsSpecialistId != undefined) {
            url += `ContainsSpecialistId=${queryData.ContainsSpecialistId}&`
        }

        if(queryData.ContainsPackageId != undefined) {
            url += `ContainsPackageId=${queryData.ContainsPackageId}&`
        }

        return Axios.get(url, {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        });
    },
    getPlayerBlocks(userId) {
        var url = `http://${CONFIG.serverUrl}/api/user/${userId}/blocks`
        var token = localStorage.getItem('subterfuge_access_token');

        return Axios.get(url, {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        });
    },
    getPlayerFriends(userId) {
        var url = `http://${CONFIG.serverUrl}/api/user/${userId}/friends`
        var token = localStorage.getItem('subterfuge_access_token');

        return Axios.get(url, {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        });
    },
    getPlayerFriendRequests(userId) {
        var url = `http://${CONFIG.serverUrl}/api/user/${userId}/friendRequests`
        var token = localStorage.getItem('subterfuge_access_token');

        return Axios.get(url, {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        });
    },
    getGameEvents(roomId) {
        var url = `http://${CONFIG.serverUrl}/api/room/${roomId}/events`
        var token = localStorage.getItem('subterfuge_access_token');

        return Axios.get(url, {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        });
    },
    getGroups(roomId) {
        var url = `http://${CONFIG.serverUrl}/api/room/${roomId}/groups`
        var token = localStorage.getItem('subterfuge_access_token');

        return Axios.get(url, {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        });
    }
}

export default api;