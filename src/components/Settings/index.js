import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {Modal} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {DeleteUser} from '../../redux/actions/profile';
import '../../css/settings/index.css';

const Settings = (props) => {

    const[resetPass,setResetPass] = useState(false);

    const dispatch = useDispatch();

    const handlePassword = () => {
        setResetPass(true);
    }
    if (resetPass){
        return < Redirect to ={ {
            pathname: `/reset-password`
            }} 
            />;
    } 

    const deleteUser = () => {
        if(window.confirm('Are you sure you want to delete your account?')){
            dispatch(DeleteUser(props.user_data._id));
        }
    }

    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
       
        <Modal.Body>
            <div className='settings_container'>
            <p className='settings_button_top' onClick={handlePassword}>Reset Password</p>
            <p className='settings_button' onClick={deleteUser}  >Delete Account</p>
            <p className='settings_button' onClick={props.onHide} >Close</p>
            </div>
        </Modal.Body>
      </Modal>
    );
  }

  export default Settings;