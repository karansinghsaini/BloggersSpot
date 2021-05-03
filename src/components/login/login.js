import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useDispatch} from 'react-redux';

import '../../css/userAuth/login.css';
import {userLogin} from '../../redux/actions/login';

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

    return(
        <div className='login-div-style'>
            <h3 className='login-head'>Login Here</h3>
            <div className='login-box'>
            <div className='login-container'>
                <Form onSubmit={handleSubmit}>
                    {/* Email Goes Here */}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className='login-form-text'>Enter Username or Email</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" onChange = { (e) => setIdentifier(e.target.value)} required="true" />
                    </Form.Group>

                    {/* Password Fields */}
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label className='login-form-text'>Password</Form.Label>
                        <Form.Control 
                        type="password" placeholder="Password" 
                        aria-describedby="passwordHelpInline"
                        onChange = { (e) => setPass(e.target.value)} 
                        required="true"/>
                    </Form.Group>
                    
                    <Button variant="primary" type="submit" className='login-button'>
                        Log In
                    </Button><br/><br/>

                    <Form.Group>
                        <Form.Text className='login-form-text'>
                            If not registered then click below to register
                        </Form.Text>
                        <a href='/register' className='login-button'>Register here</a>
                    </Form.Group>
                </Form>
            </div>
            </div>
        </div>
    );

}

export default (Login);