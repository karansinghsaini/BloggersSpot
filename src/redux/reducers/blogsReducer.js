const myState = {
    blogs: [],
    blogDetail: {},
    blogid: null
};

export const blogReducer =  (state = myState, action) => {
    switch (action.type) {
        case 'BLOGS':
            console.log("Loading Blogs ....... ");
            return Object.assign(myState,{blogs: action.payload}); 
        
        case 'NEW_BLOG':
            return state;

        case 'GOTBLOGS':
            return state;

        case 'BLOGDETAIL':
            return Object.assign(myState,{blogDetail: action.payload.data});

        case 'SETBLOGID':
            return Object.assign(myState,{blogid: action.payload});

        case 'BLOGDELETED':
            // console.log('Blog deleted successfully:- ' + action.payload);
            window.location.href = '/home';
            return state;

        default:
            //returning previous state
            return state;
    }   
};