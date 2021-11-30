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

    const handleLogout = (e) => {
        if(window.confirm('Are you sure you want to LogOut?')){
            localStorage.clear('jwtToken');
            window.location.href = '/login';
        }
    }

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
                    <NavDropdown.Item onClick={e => handleLogout(e)}>LogOut</NavDropdown.Item>
                </NavDropdown>}
                </Nav>

                <Nav className="mr-auto nav-font">
                {!isLoggedIn && <Nav.Link href="/login">Login</Nav.Link>}
                {!isLoggedIn && <Nav.Link href="/register">Register</Nav.Link>}
                </Nav>
    
                
                {/* {isLoggedIn && <Form inline>
                    <FormControl type="text" placeholder="Search Authors" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>&nbsp;&nbsp;
                </Form>} */}
             </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default (Menu);

// import React, { Component } from "react";
// import { MDBSideNavCat, MDBSideNavNav, MDBSideNav, MDBSideNavLink, MDBContainer, MDBIcon, MDBBtn } from "mdbootstrap";

// class Menu extends Component {
//   state = {
//     sideNavLeft: false,
//   }

// sidenavToggle = sidenavId => () => {
//   const sidenavNr = `sideNav${sidenavId}`
//   this.setState({
//     [sidenavNr]: !this.state[sidenavNr]
//   });
// };

// render() {
//     return (
    
//         <MDBContainer>
//           <MDBBtn onClick={this.sidenavToggle("Left")}>
//             <MDBIcon size="lg" icon="bars" />
//           </MDBBtn>
//           <MDBSideNav slim fixed mask="rgba-blue-strong" triggerOpening={this.state.sideNavLeft} breakWidth={1300}
//             className="sn-bg-1">
//             <li>
//               <div className="logo-wrapper sn-ad-avatar-wrapper">
//                 <a href="#!">
//                   <img alt="" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(10).jpg" className="rounded-circle" />
//                   <span>Anna Deynah</span>
//                 </a>
//               </div>
//             </li>

//             <MDBSideNavNav>
//               <MDBSideNavLink to="/other-page" topLevel>
//                 <MDBIcon icon="pencil-alt" className="mr-2" />Submit listing</MDBSideNavLink>
//               <MDBSideNavCat name="Submit blog" id="submit-blog" icon="chevron-right">
//                 <MDBSideNavLink>Submit listing</MDBSideNavLink>
//                 <MDBSideNavLink>Registration form</MDBSideNavLink>
//               </MDBSideNavCat>
//               <MDBSideNavCat name="Instruction" id="instruction" icon="hand-pointer" href="#">
//                 <MDBSideNavLink>For bloggers</MDBSideNavLink>
//                 <MDBSideNavLink>For authors</MDBSideNavLink>
//               </MDBSideNavCat>
//               <MDBSideNavCat name="About" id="about" icon="eye">
//                 <MDBSideNavLink>Instruction</MDBSideNavLink>
//                 <MDBSideNavLink>Monthly meetings</MDBSideNavLink>
//               </MDBSideNavCat>
//               <MDBSideNavCat name="Contact me" id="contact-me" icon="envelope">
//                 <MDBSideNavLink>FAQ</MDBSideNavLink>
//                 <MDBSideNavLink>Write a message</MDBSideNavLink>
//               </MDBSideNavCat>
//             </MDBSideNavNav>
//           </MDBSideNav>
//         </MDBContainer>
//     );
//   }
// }

// export default Menu;