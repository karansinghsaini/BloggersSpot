import React from 'react';
import {Navbar, Nav, Button, Form, FormControl, NavDropdown} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import jwt from 'jsonwebtoken';

const Menu = () => {
    var isLoggedIn = useSelector( state => state.userReducer.isLoggedIn);
    // decoding the token to get logged in user data
    const data = jwt.decode(localStorage.jwtToken);

    return(
        <>
            <Navbar sticky="top" bg="light" variant="light">
                {isLoggedIn && <Navbar.Brand href="/home">Blogs</Navbar.Brand> }
                <Nav className="mr-auto">
                {isLoggedIn && <Nav.Link href="/home">Home</Nav.Link>} 
                {isLoggedIn && <Nav.Link href="/new-blog">New Blog</Nav.Link>}

                {isLoggedIn && <NavDropdown title="Profile" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                    {/* <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                    <NavDropdown.Item href="#">Something</NavDropdown.Item> */}
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/logout">LogOut</NavDropdown.Item>
                </NavDropdown>}
                </Nav>

                <Nav className="mr-auto">
                {!isLoggedIn && <Nav.Link href="/login">Login</Nav.Link>}
                {!isLoggedIn && <Nav.Link href="/register">Register</Nav.Link>}
                </Nav>
    
                {isLoggedIn && <Form inline>
                {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button> */}
                Welcome {data.username}
                </Form>}
            </Navbar>
        </>
    );
}

export default (Menu);