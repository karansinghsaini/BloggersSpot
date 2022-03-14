import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import jwt from 'jsonwebtoken';
import { Button } from 'react-bootstrap';
import { MDBInput } from "mdbreact";
import '../../css/settings/password.css';
import { ChangePassword } from '../../redux/actions/user';

const Resetpassword = () => {
    const data = jwt.decode(localStorage.jwtToken);
    const [newpass,setNewpass] = useState();
    const [newpass2,setNewpass2] = useState();

    const dispatch = useDispatch();

    const handleClick = (e,id) => {
        if (newpass === newpass2){
            const data = {
                newpass: newpass
            };
            console.log(data)
            dispatch(ChangePassword(id,data))
        }
        else{
            alert("Passwords don't match");
        }
    };

    return(
        <>
            <h4>Change your Password here.</h4>
            <div className='pass_container'>
                <MDBInput size="sm" label="New Password" type='password' onChange={ (e) => setNewpass(e.target.value)}/>
                <MDBInput size="sm" label="Repeat New Password" type='password' onChange={ (e) => setNewpass2(e.target.value)}/>
                <Button onClick={ (e) => handleClick(e,data.id)} >Confirm</Button>
            </div>
        </>
    );
};

export default Resetpassword;