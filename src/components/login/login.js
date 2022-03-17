import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import '../../css/userAuth/login.css';
import {userLogin} from '../../redux/actions/login';
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdbreact";

const Login = () => {
    const[identifier, setIdentifier] = useState();
    const[pass, setPass] = useState();

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            "identifier": identifier,
            "password": pass
        };
        dispatch(userLogin(data));
    };
    return (
            <div className='login-box'>
            <div className='peach-gradient login_head_div'>
                <h3 className='login-head'>Sign In</h3>
            </div>
            <div className='login-container'></div>
            <MDBContainer className='login_form'>
            <MDBRow>
                <MDBCol md="10">
                <form onSubmit={handleSubmit}>
                    <div className="grey-text">
                    <MDBInput
                        label="Type your email or username"
                        icon="envelope"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        onChange = { (e) => setIdentifier(e.target.value)} 
                        required="true"
                    />
                    <MDBInput
                        label="Type your password"
                        icon="lock"
                        group
                        type="password"
                        validate
                        onChange = { (e) => setPass(e.target.value)} 
                        required="true"
                    />
                    </div>
                    <div className="text-center">
                    <span>
                    <button className='submit_button' type="submit">Sign In</button>
                    <p> Don't have an account? <a href='/register' >Register</a></p>
                    </span>
                </div>
                </form>
                </MDBCol>
            </MDBRow>
            </MDBContainer>
            </div>
        );
}

export default (Login);