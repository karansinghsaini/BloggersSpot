import React, {useState, useEffect} from 'react';
import {Form, Button,Col,InputGroup} from 'react-bootstrap';
import '../../css/profile/updateprofile.css';
import {useSelector, useDispatch} from 'react-redux';
import jwt from 'jsonwebtoken';
import {GetUserProfile} from '../../redux/actions/user';
import {UpdateProfile} from '../../redux/actions/profile';

const Profile = () => {
    const data = jwt.decode(localStorage.jwtToken);
    const dispatch = useDispatch();
    const user_data = useSelector( (state) => state.UserProfile.curr_user_data);

    useEffect( () => {
        dispatch(GetUserProfile(data.id));
    },[]);

    const[username,setUsername] = useState(user_data.username);
    const[fullname, setFullname] = useState(user_data.fullname);
    const[bio, setBio] = useState(user_data.bio);
    const[gender, setGender] = useState(user_data.gender);
    const[phone, setPhone] = useState(user_data.phone);
    const[website, setWebsite] = useState(user_data.website);

    const handleSubmit = (event) => {
        event.preventDefault();
        let update_data = new FormData();
        update_data.append('fullname',fullname);
        update_data.append('username',username);
        update_data.append('bio',bio);
        update_data.append('gender',gender);
        update_data.append('phone',phone);
        update_data.append('website',website);
        dispatch(UpdateProfile(data.id, update_data));
    };

    return(
        <div className='profile-div'>
            <h3 className='profile-head'>Welcome To your Profile</h3>
            <div className='profile-container'>
                <Form onSubmit={handleSubmit} encType='multipart/form-data'>
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={fullname}
                            onChange = { (e) => setFullname(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>Username</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                            type="text"
                            value={username}
                            aria-describedby="inputGroupPrepend"
                            onChange = { (e) => setUsername(e.target.value)}
                            required
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationWebsite">
                    <Form.Label>Website</Form.Label>
                    <Form.Control
                        type="text"
                        value={website}
                        onChange = { (e) => setWebsite(e.target.value)}
                    />
                    </Form.Group>

                    
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control 
                        type="number" 
                        value={phone} 
                        onChange = { (e) => setPhone(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationCustom05">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control 
                        type="text" 
                        value={gender}
                        required 
                        onChange = { (e) => setGender(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <InputGroup as={Col}>
                        <InputGroup.Prepend>
                        <InputGroup.Text>Bio</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control 
                        as="textarea" 
                        value={bio}
                        aria-label="With textarea" 
                        onChange={ (e) => setBio(e.target.value)} />
                    </InputGroup>
                </Form.Row><br />
                    
                    <Button type="submit">Update Profile</Button>
                </Form>
            </div>
        </div>
    );

}

export default (Profile);