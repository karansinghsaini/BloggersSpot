import axios from 'axios';

// connecting to redux after creating a new blog
export function newBlog (data) {
    return {
        type: 'NEW_BLOG',
        data
    };
}

// connecting to redux after getting all the blogs
export function postGetBlogs () {
    return {
        type: 'GOTBLOGS'
    };
}

// setting the id of the blog for its detail
export function setBlogID (id) {
    return {
        type: 'SETBLOGID',
        payload: id
    };
}

// creating a new blog here
export function createBlog (data,token) {
    return function (dispatch) {
        axios.post('/blogs/newblog', data, { headers: { 'authorization': `Bearer ${token}` }})
        .then( (res) => {
            dispatch(newBlog(res.data));
            window.location.href = '/home';
        })
        .catch(function (error) {
            console.log(error);
          });
    };
}

// getting all the blogs here
export function getBlogs() {
    return dispatch =>{
        axios.get('/blogs/getBlogs')
        .then( (data) => {
            dispatch( {type: 'BLOGS', payload: data.data} );
        });
    };
}

// getting a single blog detail here
export function getBlog(id){
    return dispatch => {
        axios.get(`/blogs/getBlog/${id}`)
        .then( (res) => {
            dispatch({type: 'BLOGDETAIL', payload: res});
        });
    };
}

export function GetUserBlogs(id){
    return dispatch => {
        axios.get(`/profile/userblogs/${id}`)
        .then( data => {
            dispatch({type: 'BLOGS', payload: data.data});
        });
    }
}

export function DeleteBlog(id){
    return dispatch => {
        axios.delete(`/blogs/deleteBlogs/${id}`)
        .then ( data => {
            dispatch({type: 'BLOGDELETED', payload: data});
        });
    }
}