// import React from 'react';
import {Nav,Image} from 'react-bootstrap';
// import {useSelector} from 'react-redux';
// import jwt from 'jsonwebtoken';
// import '../css/navbar.css';
import Logo from '../images/logo.png';

// const Menu = () => {
//     var isLoggedIn = useSelector( state => state.userReducer.isLoggedIn);
//     // decoding the token to get logged in user data
//     const data = jwt.decode(localStorage.jwtToken);

//     const handleLogout = (e) => {
//         if(window.confirm('Are you sure you want to LogOut?')){
//             localStorage.clear('jwtToken');
//             window.location.href = '/login';
//         }
//     }

//     return(
//         <>
//             <Navbar collapseOnSelect sticky="top" bg="light" variant="light" expand="lg">
//             {isLoggedIn && <Navbar.Brand href="/home"><Image src={Logo}></Image></Navbar.Brand>}
//             <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//              <Navbar.Collapse id="responsive-navbar-nav">
//                 <Nav className="mr-auto nav-font">
//                 {isLoggedIn && <Nav.Link href="/home">Home</Nav.Link>}
//                 {isLoggedIn && <Nav.Link href="/new-blog">New Blog</Nav.Link>}
//                 {isLoggedIn && <Nav.Link href="/authors">Find Authors</Nav.Link>}
//                 {isLoggedIn && <NavDropdown title={data.username} id="collasible-nav-dropdown">
//                     <NavDropdown.Item href = {`/profile/${data.id}`}>Profile</NavDropdown.Item>
//                     {/* <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
//                     <NavDropdown.Item href="#">Something</NavDropdown.Item> */}
//                     <NavDropdown.Divider />
//                     <NavDropdown.Item onClick={e => handleLogout(e)}>LogOut</NavDropdown.Item>
//                 </NavDropdown>}
//                 </Nav>

//                 <Nav className="mr-auto nav-font">
//                 {!isLoggedIn && <Nav.Link href="/login">Login</Nav.Link>}
//                 {!isLoggedIn && <Nav.Link href="/register">Register</Nav.Link>}
//                 </Nav>
    
                
//                 {/* {isLoggedIn && <Form inline>
//                     <FormControl type="text" placeholder="Search Authors" className="mr-sm-2" />
//                     <Button variant="outline-info">Search</Button>&nbsp;&nbsp;
//                 </Form>} */}
//              </Navbar.Collapse>
//             </Navbar>
//         </>
//     );
// }

// export default (Menu);

import React, { useState } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBIcon } from "mdbreact";
import {useSelector} from 'react-redux';
import jwt from 'jsonwebtoken';

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
    var isLoggedIn = useSelector( state => state.userReducer.isLoggedIn);
    // decoding the token to get logged in user data
    const data = jwt.decode(localStorage.jwtToken);

    const handleLogout = (e) => {
        if(window.confirm('Are you sure you want to LogOut?')){
            localStorage.clear('jwtToken');
            window.location.href = '/login';
        }
    }

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    }

  return (
   
      <MDBNavbar color="stylish-color-dark" dark expand="md">
        <MDBNavbarBrand >
          <strong className="white-text">Bloggers</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={ e => toggleCollapse()} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left>
          {/* {isLoggedIn && <Nav.Link href="/home">Home</Nav.Link>} */}
            { isLoggedIn && <MDBNavItem >
              <Nav.Link href="/home">Home</Nav.Link>
            </MDBNavItem>}
            {  isLoggedIn && <MDBNavItem>
              <Nav.Link href="/new-blog">New Blog</Nav.Link>
            </MDBNavItem>}
            {  isLoggedIn && <MDBNavItem>
              <Nav.Link href="/authors">Find Authors</Nav.Link>
            </MDBNavItem>}
            
          </MDBNavbarNav>

          {/* Right side Nav links */}
          <MDBNavbarNav right>

          { isLoggedIn && <MDBNavItem>
              <Nav.Link className="waves-effect waves-light" href="https://www.instagram.com/">
                <MDBIcon fab icon="instagram" />
              </Nav.Link>
            </MDBNavItem> }

            { isLoggedIn && <MDBNavItem>
              <Nav.Link className="waves-effect waves-light" href="https://www.facebook.com/">
                <MDBIcon fab icon="facebook" />
              </Nav.Link> 
            </MDBNavItem> }

            { isLoggedIn && <MDBNavItem>
              <Nav.Link className="waves-effect waves-light" href="/settings">
                <MDBIcon icon="cog" />
              </Nav.Link> 
            </MDBNavItem> }

            { isLoggedIn &&  <MDBNavItem>            
            <Nav.Link className="waves-effect waves-light" href={`/profile/${data.id}`} >
                <MDBIcon icon="user" />
              </Nav.Link>
            </MDBNavItem> }

            { isLoggedIn && <MDBNavItem>   
                <Nav.Link className="waves-effect waves-light">         
                 <MDBIcon icon="sign-out-alt" onClick={e => handleLogout(e)} />
                </Nav.Link>
            </MDBNavItem> }

            { !isLoggedIn && <MDBNavItem>
              <Nav.Link className="waves-effect waves-light" href="/login">
                  Login
              </Nav.Link> 
            </MDBNavItem> }

            { !isLoggedIn && <MDBNavItem>
              <Nav.Link className="waves-effect waves-light" href="/register">
                  Register
              </Nav.Link> 
            </MDBNavItem> }

          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
}

export default Menu;