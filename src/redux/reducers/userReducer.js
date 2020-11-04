<<<<<<< HEAD
const myState = {
    users: [],
    isLoggedIn: false,
    current_user: {}
};

export const userReducer =  (state = myState, action) => {
    switch (action.type) {

        case 'REGISTERED_USER':
            return state;

        case 'USER_LOGIN':
            return Object.assign(myState,{isLoggedIn: true, current_user: action.payload.user_data});    

        case 'LOGGEDIN':
            return Object.assign(myState,{isLoggedIn: true});    

        case 'GOTALLUSERS':
            return Object.assign(myState,{users: action.payload.data});    

        default:
            return state;
    }   
=======
const myState = {
    isLoggedIn: false,
    current_user: {}
};

export const userReducer =  (state = myState, action) => {
    switch (action.type) {

        case 'REGISTERED_USER':
            return state;

        case 'USER_LOGIN':
            return Object.assign(myState,{isLoggedIn: true, current_user: action.payload.user_data});    

        case 'LOGGEDIN':
            return Object.assign(myState,{isLoggedIn: true});    

        default:
            return state;
    }   
>>>>>>> 1cf867146a28eb59fb78fddc18815564829231f0
}