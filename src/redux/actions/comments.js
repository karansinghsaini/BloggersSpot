import axios from 'axios';

// connecting to redux after posting new comment
export function newComment(data){
    return {
        type: 'NEWCOMMENT',
        payload: data
    };
}

export function createComment(data,blog_id,user_id){
    return function (dispatch){
        axios.post(`/comments/${blog_id}/add-comment/${user_id}`, data)
        .then( (res) => {
            dispatch(newComment(res.data));
        })
        .catch(function (error) {
            console.log(error);
          });
    };
}

// Getting comments for a particular blog
export function gotComments(data){
    return {
        type: 'GOTCOMMENTS',
        payload: data
    };
}

export function getComments(blog_id){
    return function(dispatch) {
        axios.get(`/comments/${blog_id}/get-comment`)
        .then( (res) => {
            dispatch(gotComments(res.data));
        })
        .catch(function(error){
            console.log(error);
        });
    };
}

// delete the selected comment
export function deleteComment(user_id,comment_id){
    return dispatch => {
        axios.delete(`/comments/${user_id}/delete-comment/${comment_id}`)
        .then( (res) => {
            dispatch({type:'DELETEDCOMMENT'});
        })
        .catch(function(error){
            console.log(error);
        });
    };
}