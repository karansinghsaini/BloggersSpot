import React, {useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import jwt from 'jsonwebtoken';
import {Image,Button} from 'react-bootstrap';
import {GetAllUsers} from '../redux/actions/user';
import {Redirect} from 'react-router-dom';
import {FollowUser,UnFollowUser} from '../redux/actions/profile';


import '../css/author.css';
import defimg from '../images/default.png';
import author_card_img from '../images/author_card.png';

const Authors = () => {
    // getting userdata from token
    const data = jwt.decode(localStorage.jwtToken);
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

    // for follow
    const handleFollow = (login_user_id,followed_user_id,login_name,follow_name,e) => {
        const follow_data = {
            follower_id: login_user_id,
            follower_name: login_name,
            follow_id: followed_user_id,
            follow_name: follow_name
        }
        dispatch(FollowUser(login_user_id,followed_user_id,follow_data));
        dispatch(GetAllUsers());
    }

    // for UnFollow
    const handleUnFollow = (login_user_id,followed_user_id,login_name,follow_name,e) => {
        const follow_data = {
            follower_id: login_user_id,
            follower_name: login_name,
            follow_id: followed_user_id,
            follow_name: follow_name
        }
        dispatch(UnFollowUser(login_user_id,followed_user_id,follow_data));
        dispatch(GetAllUsers());
    }

    // if user clicked on username then redirecting to user-profile
    if(profileNav){
        return < Redirect to ={ {
            pathname: `/profile/${author}`
            }} 
            />;
    }

    // storing all the authors in a card to display
    const userList = users.map( user => {
        if (data.id !== user._id) {
            return(
                <div className="author-card">
                    <Image className='overlay_image' src={author_card_img} />
                    { user.image === undefined && 
                        <Image className='author-img' src={defimg} roundedCircle 
                        onClick={(e) =>handleProfileClick(user._id)}
                    />  }
                    {  (user.image !== undefined && user.image !== null) &&
                        <Image className='author-img' src={user.image} roundedCircle 
                        onClick={(e) => handleProfileClick(user._id)} 
                    />  } 
                    <div className='author-name-container'>
                    <h4 className='author-name' onClick= { (e) => handleProfileClick(user._id)}>{user.username}</h4><br />
                    </div>
                    <div className='authors_buttons_container'>
                    {  (( data.id !== user._id && user.followers !== undefined ) && !user.followers.find(obj => obj.user_id === data.id)) && 
                            // <Button variant="outline-info" className='authors-buttons' onClick = { (e) => handleFollow(data.id,user._id,data.username,user.username,e,)}>Follow</Button>}
                            <button type="button" class="authors-buttons">
                                <span>Follow</span>
                            </button>
                        }
                        {  (( data.id !== user._id && user.followers !== undefined ) && user.followers.find(obj => obj.user_id === data.id)) && 
                        // <Button variant="outline-info" className='authors-buttons' onClick = { (e) => handleUnFollow(data.id,user._id,data.username,user.username,e,)}>UnFollow</Button>}
                            <button type="button" class="authors-buttons">
                                <span>UnFollow</span>
                            </button>
                        }
                    </div>
                </div>
            );
        }
    });

    return(
        <div className='author-container'>
            <h1 className='authors-head'>Authors</h1>
            {userList}
        </div>
    );
};

export default Authors;