import axios from "axios";

export function GettingUser() {
    return {
        type: 'FETCHING_USER'
    };
}

export function GotUser(data){
    return {
        type: 'GOT_USER',
        payload: data
    };
}

export function GetUserProfile (id) {
    return dispatch => {
        dispatch(GettingUser);
        return axios.get(`/user/getUser/${id}`)
        .then( (res) => {
            dispatch(GotUser(res));
        });
    };
}

export function GetAllUsers () {
    return dispatch => {
        axios.get('/user/getUsers')
        .then( res => {
            dispatch({type: 'GOTALLUSERS', payload: res});
        });
    };
}