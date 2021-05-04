import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';
import {useDispatch} from 'react-redux';

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
        <div className='register-div-style'>
            <h3 className='register-head'>Register Today To Start Your Journey</h3>
            <div className='register-box'>
            <div className='register-container'>
                <Form onSubmit={handleSubmit} >
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label className='register-form-text'>Username</Form.Label>
                        <Form.Control type="text" value={username} placeholder="Enter Username" onChange = { (e) => setUsername(e.target.value)} required={true}/>
                    </Form.Group>
                    {/* Email Goes Here */}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className='register-form-text'>Email address</Form.Label>
                        <Form.Control type="email" value={email} placeholder="Enter email" onChange = { (e) => setEmail(e.target.value)} required={true}/>
                        <Form.Text className=" register-form-text" >
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    {/* Password Fields */}
                    <Form.Group controlId="formBasicPassword1">
                        <Form.Label className='register-form-text'>Password</Form.Label>
                        <Form.Control 
                        type="password" placeholder="Password" 
                        aria-describedby="passwordHelpInline"
                        onChange = { (e) => setPass1(e.target.value)} 
                        required={true}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword2">
                        <Form.Label className='register-form-text'>Confirm Password</Form.Label>
                        <Form.Control 
                        type="password" placeholder="Password" 
                        onChange = { (e) => setPass2(e.target.value)} 
                        required={true}/>
                        <Form.Text id="passwordHelpBlock" className='register-form-text'>
                            Your password must be 8-20 characters long.
                        </Form.Text>
                        <Form.Text id="passwordHelpBlock" muted className='register-form-text'>
                            Must contain letters, numbers and special characters only.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Check
                        className='register-form-text'
                        required = {true}
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                        />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit" className='register-form-text register-button'>
                        Register
                    </Button><br /><br />

                    <Form.Group>
                        <Form.Text className='register-form-text'>
                            If already a user then click below to sign in
                        </Form.Text>
                        <a href='/login' className='register-button'>SignIn</a>
                    </Form.Group>
                </Form>
            </div>
            </div>
        </div>
    );

}



export default (Register);