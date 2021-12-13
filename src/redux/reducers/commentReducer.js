const commentState = {
    allcomments: [],
    comments: [],
    votes: []
};

export const commentReducer = (state = commentState, action) => {
    switch(action.type){
        case 'NEWCOMMENT':
            alert('Comment posted successfully');
            return state;

        case 'GOTCOMMENTS':
            console.log("Loading Comments ....... ");
            return Object.assign(commentState,{comments: action.payload.comments, votes: action.payload.votes}); 

        case 'DELETEDCOMMENT':
            alert('Comment Deleted successfully. Please refresh the page');
            return state;

        case 'GETALLCOMMENT':
            console.log('Got all the comments');
            return Object.assign(commentState,{allcomments: action.payload.comments}); 
        
        default:
            return state;
    }
};
