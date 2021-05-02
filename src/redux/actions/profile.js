import axios from "axios";

export function Updating (){
    return {
        type: 'UPDATING'
    }
}

export function Updated(data){
    return{
        type: 'UPDATEDPROFILE',
        payload: data
    }
}

export function UpdateProfile(id, data){
    return dispatch => {
        dispatch(Updating());
        axios.put(`/profile/updateprofile/${id}`, data)
        .then( res => {
            dispatch(Updated(res));
            alert('Profile Updated Successfully');
            window.location.href = `/profile/${id}`;
        });
    };
}


export function UpdateProfilePhoto(id,data){
    return dispatch => {
        axios.put(`/profile/updateprofilephoto/${id}`, data)
        .then( res => {
            dispatch({type: 'PROFILEPHOTO', payload: res})
            alert("Profile Photo updated successfully");
            window.location.href = `/profile/${id}`;
        });
    };
}

//for Follow
export function FollowUser(login_user_id,profile_user_id,data){
    return dispatch => {
        axios.put(`/profile/${login_user_id}/follow/${profile_user_id}`, data)
        .then( res => {
            dispatch({type:'FOLLOW', payload:res});
        });
    };
}

// for UnFollow
export function UnFollowUser(login_user_id,profile_user_id,data){
    return dispatch => {
        axios.put(`/profile/${login_user_id}/unfollow/${profile_user_id}`, data)
        .then( res => {
            dispatch({type:'UNFOLLOW', payload:res});
        });
    };
}

export function DeleteUser(id){
    return dispatch => {
        axios.delete(`/user/deleteUser/${id}`)
        .then( res => {
            dispatch({type: 'DELETEUSER', payload: res});
        });
    };
}