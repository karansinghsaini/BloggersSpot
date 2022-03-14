var myState = {
    curr_user_data: {},
    user_blogs: {}
};

export const UserProfile = (state = myState, action) => {
    switch(action.type){
        case 'FETCHING_USER':
            console.log("Fetching Data");
        break;

        case 'GOT_USER':
            return Object.assign({}, state, {curr_user_data: action.payload.data});

        case 'UPDATING':
            console.log('Updating Profile');
            return state;

        case 'Updated':
            return Object.assign({}, state, {curr_user_data: action.payload.data});

        case "PROFILEPHOTO":
            return Object.assign({}, state, {curr_user_data: action.payload.data});

        case "Follow":
            return state;

        case "UNFOLLOW":
            return state;

        case "DELETEUSER":
            alert("User deleted successfully");
            localStorage.clear('jwtToken');
            window.location.href = '/register';
            return state;

        default:
            return state;

    }
};