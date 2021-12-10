const myState = {
    blogs: [],
    blogDetail: {},
    userBlogs: [],
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
            return Object.assign(myState,{blogDetail: action.payload.blogs, votes: action.payload.votes});

        case 'BLOGDELETED':
            window.location.href = '/home';
            return state;

        case 'USERBLOGS':
            return Object.assign(myState, {userBlogs: action.payload.blogs, votes: action.payload.votes});

        default:
            //returning previous state
            return state;
    }   
};