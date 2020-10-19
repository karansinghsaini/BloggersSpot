import React from 'react';
import {Button} from 'react-bootstrap';

import '../../css/userAuth/logout.css';

const Logout = () => {

    const handleLogout = () =>{
        localStorage.clear('jwtToken');
        window.location.href = '/login';
    }

    return (
        <div>
            <h6 className="logout-head">Are you sure you want to LogOut? </h6><br />
            <Button variant="danger" size="sm" onClick={handleLogout}>Log Out</Button>
        </div>
    );
}


export default Logout;