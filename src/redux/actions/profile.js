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
            window.location.href = '/profile';
        });
    }
}