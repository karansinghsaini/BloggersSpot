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
            console.log('Updated Profile');
            return Object.assign({}, state, {curr_user_data: action.payload.data});

        default:
            return state;

    }
};