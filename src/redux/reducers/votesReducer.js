var myState = {
    votes: 0,
    isliked: false,
    allvotes: []
};

export const votesReducer = (state=myState, action) => {
    switch(action.type){
        case 'GETTINGVOTES':
            console.log('Getting Votes');
            return state;

        case 'GOTALLVOTES': 
            return Object.assign({}, state, {allvotes: action.payload.data});

        case 'GOTVOTES':
            return Object.assign({}, state, {votes: action.payload.data.votes, isliked: action.payload.data.user_vote});
        case 'VOTEADDED':
            return state;

        case 'USERVOTE':
            return Object.assign(state, {isliked: action.payload.data});
        
        default:
            return myState;
    }
};

