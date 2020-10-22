export const votesReducer = (state=[], action) => {
    switch(action.type){

        case 'GOTVOTES':
            return state;
        case 'VOTEADDED':
            return state;

        case 'USERVOTE':
            return state;
        
        default:
            return state;
    }
};

