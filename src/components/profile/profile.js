import React, {useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from "react-router-dom";
import MyVerticallyCenteredModal from './uploadPhoto';
import jwt from 'jsonwebtoken';

import { Button, Image, Card } from 'react-bootstrap';
import '../../css/profile/profile.css';
import defimg from '../../images/default.png';
import {addVote,removeVote} from '../../redux/actions/votes';
import {GetUserProfile} from '../../redux/actions/user';
import {GetUserBlogs} from '../../redux/actions/blogs';
import {FollowUser,UnFollowUser,DeleteUser} from '../../redux/actions/profile';
import ReactHtmlParser from 'react-html-parser';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";


const Profile = () => {
    // getting userid from the url params
    const { userid } = useParams();
    const [modalShow, setModalShow] = useState(false);  
    // getting userdata from token
    const data = jwt.decode(localStorage.jwtToken);
    // for update-profile
    const [navigate,setNavigate] = useState(false);
    const [blognavigate, setBlogNavigate] = useState(false);
    const [blogid, setBlogId] = useState();
    // getting the full user profile for the selected user
    const user_data = useSelector( state => state.UserProfile.curr_user_data);
    // getting all the blogs for the selected user
    const user_blogs = useSelector( state => state.blogReducer.blogs);
    const votes = useSelector( state => state.blogReducer.votes);
    const dispatch = useDispatch();
    
    useEffect( () => {
        dispatch(GetUserProfile(userid));
        dispatch(GetUserBlogs(userid));
    },[]);

    const handleUploadPhoto = (e,id) =>{
        if(data.id === user_data._id){
            setModalShow(true);
        }
    }

    // adding the like to the backend
    const handleVote = (blogid,user_id,e) => {
        dispatch(addVote(data.id,blogid));
        dispatch(GetUserBlogs(user_id));
    };

    // unvoting the blog 
    const handleUnvote = (blogid,user_id,e) => {
        dispatch(removeVote(data.id,blogid));
        dispatch(GetUserBlogs(user_id));   
    };
    // for blog-detail page
    const handleClick = (id,e) => {
        setBlogId(id)
        setBlogNavigate(true);
    };
    // for user-profile page
    const handleUpdate = () => {
        dispatch(GetUserProfile(userid));
        setNavigate(true);
    }

    const deleteUser = () => {
        if(window.confirm('Are you sure you want to delete your account?')){
            dispatch(DeleteUser(userid));
            localStorage.clear('jwtToken');
            window.location.href = '/register';
        }
    }

    // for follow
    const handleFollow = (login_user_id,followed_user_id,login_name,follow_name,e) => {
        const follow_data = {
            follower_id: login_user_id,
            follower_name: login_name,
            follow_id: followed_user_id,
            follow_name: follow_name
        }
        dispatch(FollowUser(login_user_id,followed_user_id,follow_data));
        dispatch(GetUserProfile(userid));
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
        dispatch(GetUserProfile(userid));
    }

    if(blognavigate){
        return < Redirect to ={ {
            pathname: `/blog-detail/${blogid}`
          }} 
          />;
    }

    if(navigate){
        return <Redirect to='/update-profile' push={true} />
    }

    var blogList = user_blogs.map( (details) => {
        var vote = votes.filter( vote => vote.blog_id === details._id);
        var isliked = vote.some( vt => (vt.user_id === data.id));
        return(
            <div key={details._id}>
            <Card className="text-center blog-card" bg='info'>
                <Card.Header>@{details.author}</Card.Header>
                <Card.Body>
                <Card.Title className='card-title-home' onClick={(e) => handleClick(details._id,e)}>{details.title}</Card.Title>
                <Card.Text className='card-text'>
                {ReactHtmlParser(details.content)}
                </Card.Text>
                </Card.Body>
                <Card.Footer >
                    {isliked && <FaHeart className='blog-detail-icon' onClick={ (e) => handleUnvote(details._id,details.user_id,e)}/>}&nbsp;
                    {!isliked && <FaRegHeart className='blog-detail-icon' onClick={ (e) => handleVote(details._id,details.user_id,e)}/>}&nbsp;
                    <span>{vote.length}</span>
                </Card.Footer>
            </Card><br />
            </div>
        )
});

    return(
        <div>
            <div className='profile-left-div'>
                {/* User Profile picture */}
                { user_data.image === undefined && 
                    <Image className='profile-img' src={defimg} roundedCircle 
                    onClick={(e) => handleUploadPhoto(e)}
                />  }   <br/><br/>
                {  (user_data.image !== undefined && user_data.image !== null) &&
                     <Image className='profile-img' src={user_data.image} roundedCircle 
                     onClick={(e) => handleUploadPhoto(e)} 
                />  }   <br/><br/>

                {/* User Details */}
                {(user_data.fullname !== undefined && user_data.fullname !== null) && <h6>Fullname:- {user_data.fullname}</h6>}
                { (user_data.username !== undefined && user_data.username !== null) && <p> Username:- @{user_data.username}</p>}
                { (user_data.phone !== undefined && user_data.phone !== null) && <p>Contact:- {user_data.phone}</p>}    
                { (user_data.email !== undefined && user_data.email !== null) && <p>Email:- {user_data.email}</p>}<br/>
                { (user_data.bio !== undefined && user_data.bio !== null) && <h4>Bio</h4> }
                <p>{user_data.bio}</p> 
                { (data.id === user_data._id) && <Button variant="secondary" size="sm" onClick={handleUpdate} >Update profile</Button>}
                { (data.id === user_data._id) && <Button variant="danger" size="sm" onClick={deleteUser} >Delete profile</Button>}
                <div>
                    { user_data.followers !== undefined && <p>Followers:- {user_data.followers.length}</p> }
                    { user_data.following !== undefined && <p>Following:- {user_data.following.length}</p> }
                    {  (( data.id !== user_data._id && user_data.followers !== undefined ) && !user_data.followers.find(obj => obj.user_id === data.id)) && 
                        <Button variant="info" onClick = { (e) => handleFollow(data.id,user_data._id,data.username,user_data.username,e,)}>Follow</Button>}
                    {  (( data.id !== user_data._id && user_data.followers !== undefined ) && user_data.followers.find(obj => obj.user_id === data.id)) && 
                    <Button variant="info" onClick = { (e) => handleUnFollow(data.id,user_data._id,data.username,user_data.username,e,)}>UnFollow</Button>}
                </div>
                
            </div><br />

            <div className='profile-center-div'>
                <h4>Blogs</h4>
                <br />{ user_blogs.length === 0 && <p className='no-blogs'>No Blogs yet</p> }
                {blogList}
            </div>

            <MyVerticallyCenteredModal 
                show={modalShow}
                onHide={() => setModalShow(false)}
                user_data={user_data}
            />
            
        </div>
    );
}


export default Profile;