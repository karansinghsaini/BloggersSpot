const myState = {
    blogs: [],
    blogDetail: {},
    votes: []
};

export const blogReducer =  (state = myState, action) => {
    switch (action.type) {
        case 'BLOGS':
            console.log("Loading Blogs ....... ");
            return Object.assign(myState,{blogs: action.payload.blogs, votes: action.payload.votes}); 
        
        case 'NEW_BLOG':
            return state;

        case 'GOTBLOGS':
            return state;

        case 'BLOGDETAIL':
            return Object.assign(myState,{blogDetail: action.payload.data});

        case 'BLOGDELETED':
            // console.log('Blog deleted successfully:- ' + action.payload);
            window.location.href = '/home';
            return state;

        default:
            //returning previous state
            return state;
    }   
};