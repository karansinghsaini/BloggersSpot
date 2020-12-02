import React from 'react';
import {Navbar, Nav, Button, Form, FormControl, NavDropdown,Image} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import jwt from 'jsonwebtoken';
import '../css/navbar.css';
import Logo from '../images/logo.png';

const Menu = () => {
    var isLoggedIn = useSelector( state => state.userReducer.isLoggedIn);
    // decoding the token to get logged in user data
    const data = jwt.decode(localStorage.jwtToken);

    return(
        <>
            <Navbar sticky="top" bg="light" variant="light" expand="lg">
            {isLoggedIn && <Navbar.Brand href="/home"><Image src={Logo}></Image></Navbar.Brand>}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
             <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto nav-font">
                {isLoggedIn && <Nav.Link href="/home">Home</Nav.Link>}
                {isLoggedIn && <Nav.Link href="/new-blog">New Blog</Nav.Link>}
                {isLoggedIn && <Nav.Link href="/authors">Find Authors</Nav.Link>}
                {isLoggedIn && <NavDropdown title={data.username} id="collasible-nav-dropdown">
                    <NavDropdown.Item href = {`/profile/${data.id}`}>Profile</NavDropdown.Item>
                    {/* <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                    <NavDropdown.Item href="#">Something</NavDropdown.Item> */}
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/logout">LogOut</NavDropdown.Item>
                </NavDropdown>}
                </Nav>

                <Nav className="mr-auto nav-font">
                {!isLoggedIn && <Nav.Link href="/login">Login</Nav.Link>}
                {!isLoggedIn && <Nav.Link href="/register">Register</Nav.Link>}
                </Nav>
    
                
                {isLoggedIn && <Form inline>
                    <FormControl type="text" placeholder="Search Authors" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>&nbsp;&nbsp;
                </Form>}
             </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default (Menu);