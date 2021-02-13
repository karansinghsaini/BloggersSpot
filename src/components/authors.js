import React, {useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Image} from 'react-bootstrap';
import {GetAllUsers} from '../redux/actions/user';
import {Redirect} from 'react-router-dom';

import '../css/author.css';
import defimg from '../images/default.png';

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
            pathname: `/profile/${author}`
            }} 
            />;
    }

    const userList = users.map( user => {
        return(
            <div key={user._id} classname='flex-container'>
                <div>
                { user.image === undefined && 
                    <Image className='author-img' src={defimg} roundedCircle 
                    onClick={(e) =>handleProfileClick(user._id)}
                />  }
                {  (user.image !== undefined && user.image !== null) &&
                     <Image className='author-img' src={user.image} roundedCircle 
                     onClick={(e) => handleProfileClick(user._id)} 
                />  } 
                </div>
                <div>
                <h4 className='author-name' onClick= { (e) => handleProfileClick(user._id)}>{user.username}</h4><br />
                <p className='author-bio'>{user.bio}</p>
                </div>
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