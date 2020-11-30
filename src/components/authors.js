import React, {useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {GetAllUsers} from '../redux/actions/user';
import {Redirect} from 'react-router-dom';
import '../css/author.css';

const Authors = () => {
    const dispatch = useDispatch();
    const users = useSelector( state => state.userReducer.users); 
    const [profileNav, setProfileNav] = useState(false);
    // storing blog and author id to pass as props in Redirect component
    const [author,setAuthor] = useState();
    
    useEffect( () => {
        dispatch(GetAllUsers());
    },[dispatch]);

     const handleProfileClick = (id,e) => {
        setAuthor(id)
        setProfileNav(true);
    };

    // if user clicked on username then redirecting to user-profile
    if(profileNav){
        return < Redirect to ={ {
            pathname: '/profile',
            state: { user_id: author }
            }} 
            />;
    }

    const userList = users.map( user => {
        return(
            <div key={user._id} classname='div-list-container'>
                <h4 className='author-name' onClick= { (e) => handleProfileClick(user._id)}>{user.username}</h4>
            </div>
        );
    });

    return(
        <div>
            <h2>Authors</h2><br />
            {userList}
        </div>
    );
};

export default Authors;