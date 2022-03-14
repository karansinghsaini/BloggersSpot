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
        axios.get(`/user/getUser/${id}`)
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

export function ChangePassword (id,data) {
    return dispatch => {
        axios.put(`/user/updatePassword/${id}`, data)
        .then ( res => {
            dispatch({type: 'CHANGEPASS', payload: res});
            alert("Password has been changed successfully");
        })
    }
}