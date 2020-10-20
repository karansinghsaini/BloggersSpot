import axios from 'axios';

// getting votes
export function GettingVotes(){
    return {
        type: 'GETTINGVOTES'
    };
}

export function GotVotes(data){
    return {
        type: 'GOTVOTES',
        payload: data
    };
}

export function GetVotes(blog_id,user_id){
    return dispatch => {
        dispatch(GettingVotes());
        axios.get(`/comments/${blog_id}/get-votes/${user_id}`)
        .then ( data => {
            console.log("Action:- " + data);
            dispatch(GotVotes(data));
        });
    };
}

//adding votes
export function VoteAdded (data) {
    return {
        type: 'VOTEADDED',
        payload: data
    };
}

export function addVote(user_id,blog_id){
    return dispatch => {
        axios.post(`/comments/${user_id}/vote/${blog_id}`)
        .then ( data => {
            dispatch(VoteAdded(data));
        } );
    };
}


export function removeVote(user_id,blog_id){
    return dispatch => {
        axios.get(`/comments/${blog_id}/remove-vote/${user_id}`)
        .then ( data => {
            dispatch(GotVotes(data));
        });
    };
}