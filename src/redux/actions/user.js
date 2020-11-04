import axios from "axios";

export function GettingUser() {
    return {
        type: 'FETCHING_USER'
    }
}

export function GotUser(data){
    return {
        type: 'GOT_USER',
        payload: data
    }
}

export function GetUserProfile (id) {
    return dispatch => {
        dispatch(GettingUser);
        axios.get(`/user/getUser/${id}`)
        .then( (res) => {
            dispatch(GotUser(res));
        });
    };
}

export function GotAllUsers(data){
    return {
        type: 'GOTALLUSERS',
        payload: data
    };
}

export function GetAllUsers(){
    return dispatch => {     
        axios.get('user/getUsers')
        .then( (res) => {
            dispatch(GotAllUsers(res));
        });
    };
}