import axios from 'axios';

export function setCurrentUser (data) {
    return {
        type: 'USER_LOGIN', 
        payload: data
    }
}

export function loggedIn () {
    return {
        type: 'LOGGEDIN'
    }
}

export function userLogin(data){
    return dispatch => {
        axios.post('user/loginUser', data)
        .then(function (response) {
            localStorage.setItem('jwtToken', response.data.token);
            dispatch(loggedIn());
            window.location.href = '/home'; 
          })        
        .catch(function (error) {
            alert('Sorry, your username or password was incorrect.');
          });
    };
}