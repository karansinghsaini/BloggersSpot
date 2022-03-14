import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/settings/index.css';

const Settings = () => {

    return(
        <>
            <h3 className='settings_head'> Settings </h3>
            <div className='settings_container'> 
            <span>Click to change your password:- 
            <Link to="/reset-password">here.</Link></span>
            </div>
        </>
    );
};

export default Settings;