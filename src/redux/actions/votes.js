import axios from 'axios';

export function GotVotes(){
    return {
        type: 'GOTVOTES'
    };
}

//adding votes
export function VoteAdded () {
    return {
        type: 'VOTEADDED',
    };
}

export function addVote(user_id,blog_id){
    return dispatch => {
        axios.post(`/comments/${user_id}/vote/${blog_id}`)
        .then ( data => {
            dispatch(VoteAdded());
        } );
    };
}


export function removeVote(user_id,blog_id){
    return dispatch => {
        axios.get(`/comments/${blog_id}/remove-vote/${user_id}`)
        .then ( data => {
            dispatch(GotVotes());
        });
    };
}