const commentState = {
    comments: []
};

export const commentReducer = (state = commentState, action) => {
    switch(action.type){
        case 'NEWCOMMENT':
            alert('Comment posted successfully');
            return state;

        case 'GOTCOMMENTS':
            console.log("Loading Comments ....... ");
            return Object.assign(commentState,{comments: action.payload.comment}); 

        case 'DELETEDCOMMENT':
            alert('Comment Deleted successfully. Please refresh the page');
            return state;
        
        default:
            return state;
    }
};
