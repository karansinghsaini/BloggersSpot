import React, {useState} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdbreact";
import '../../css/userAuth/register.css';

const Register = () => {
    const[username, setUsername] = useState("");
    const[email, setEmail] = useState("");
    const[pass1, setPass1] = useState("");
    const[pass2, setPass2] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if ( pass1 !== pass2 ){
            alert("Passwords don't match. Try Again")
        }
        else{
            const data = {
                "username": username,
                "email": email,
                "password": pass1
            }
            axios.post('/user/createUser', data)
              .then(function (response) {
                console.log("Status:- " + response.status);
                dispatch({type: 'REGISTERED_USER', payload: response});
                window.location.href = '/success-register';
              })
              .catch(function (error) {
                console.log(error);
              });
    }
}

        return(
            <div className='register-box'>
            <div className='peach-gradient register_head_div'>
                <h3 className='register-head'>Register</h3>
            </div>
            <div className='register-container'>
            <MDBContainer className='register_form'>
            <MDBRow>
            <MDBCol md="10">
                <form onSubmit={handleSubmit}>
                <div className="grey-text">
                    <MDBInput
                    label="Your Username"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={username} 
                    onChange = { (e) => setUsername(e.target.value)} 
                    required={true}
                    />
                    <MDBInput
                    label="Your email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    value={email} 
                    onChange = { (e) => setEmail(e.target.value)} 
                    required={true}
                    />
                    <MDBInput
                    label="Your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                    onChange = { (e) => setPass1(e.target.value)} 
                    required={true}
                    />
                    <MDBInput
                    label="Confirm Your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                    onChange = { (e) => setPass2(e.target.value)} 
                    required={true}
                    />
                </div>
                <div className="custom-control custom-checkbox pl-3">
                    <input
                        className="custom-control-input"
                        type="checkbox"
                        value=""
                        id="invalidCheck"
                        required
                    />
                    <label className="custom-control-label" htmlFor="invalidCheck">
                        Agree to terms and conditions
                    </label>
                    <div className="invalid-feedback">
                        You must agree before submitting.
                    </div>
                </div><br/>
                <div className="text-center">
                    <span>
                    <button className='submit_button' type="submit">Register</button>
                    <p> Have an account? <a href='/login' >SignIn</a></p>
                    </span>
                </div>
                </form><br/>
            </MDBCol>
            </MDBRow>
            </MDBContainer>
            </div>
            </div>
        );

}



export default (Register);