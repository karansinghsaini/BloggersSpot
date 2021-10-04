import React, {useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from "react-router-dom";
import MyVerticallyCenteredModal from './uploadPhoto';
import jwt from 'jsonwebtoken';

import { Button, Image, Card, Container,Row,Col } from 'react-bootstrap';
import '../../css/profile/profile.css';
import defimg from '../../images/default.png';
import defcover from '../../images/cover.jpg';
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
            <div className='blog' key={details._id}>
            <Card className="text-center blog-card" bg='light'>
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
        <Container>
            <Row>
                             
                
                    {/* User Profile picture */}
                    <Col>
                        { user_data.image === undefined && 
                            <Image className='profile-img' src={defimg} roundedCircle 
                            onClick={(e) => handleUploadPhoto(e)}
                        />  }   <br/><br/>
                        {  (user_data.image !== undefined && user_data.image !== null) &&
                            <Image className='profile-img' src={user_data.image} roundedCircle 
                            onClick={(e) => handleUploadPhoto(e)} 
                        />  } 
                    </Col>
                    <Col>
                        {/* User Details */}
                        {/* username */}
                        <div className='profile_details'>
                        <div className='profile_bio'>
                        { (user_data.username !== undefined && user_data.username !== null) && <span className = 'username'> {user_data.username}</span>}&nbsp;&nbsp;

                        { (data.id === user_data._id) && <Button variant="secondary" size="sm" onClick={handleUpdate} >Edit</Button>}
                        { (data.id === user_data._id) && <Button variant="danger" size="sm" onClick={deleteUser} >Delete</Button>}

                        {  (( data.id !== user_data._id && user_data.followers !== undefined ) && !user_data.followers.find(obj => obj.user_id === data.id)) && 
                                <span><Button variant="info" onClick = { (e) => handleFollow(data.id,user_data._id,data.username,user_data.username,e,)}>Follow</Button></span>}
                        {  (( data.id !== user_data._id && user_data.followers !== undefined ) && user_data.followers.find(obj => obj.user_id === data.id)) && 
                                <span> <Button variant="info" onClick = { (e) => handleUnFollow(data.id,user_data._id,data.username,user_data.username,e,)}>UnFollow</Button></span>}<br/><br/>
                        </div>
                        <p className='follow_details'>
                        { user_data.followers !== undefined && <span><b>{user_blogs.length}</b> blogs</span> }&nbsp;&nbsp;&nbsp;&nbsp;
                        { user_data.followers !== undefined && <span><b>{user_data.followers.length}</b> followers</span> }&nbsp;&nbsp;&nbsp;&nbsp;
                        { user_data.following !== undefined && <span><b>{user_data.following.length}</b> following</span> }
                        </p>
                        {(user_data.fullname !== undefined && user_data.fullname !== null) && <h6 className='fullname'>{user_data.fullname}</h6>}
                        <p>{user_data.bio}</p> 
                        {/* { (user_data.phone !== undefined && user_data.phone !== null) && <span>Contact:- {user_data.phone}</span>}&nbsp;&nbsp; 
                        { (user_data.email !== undefined && user_data.email !== null) && <span>Email:- {user_data.email}</span>}<br/> */}
                        </div>
                    </Col>
                    
            
            </Row><br/><br/>
            

            <Row>
                <Col >
                <h4>Blogs</h4><br />
                { user_blogs.length === 0 && <p className='no-blogs'>No Blogs yet</p> }
                {blogList}
                </Col>
            </Row>

            <MyVerticallyCenteredModal 
                show={modalShow}
                onHide={() => setModalShow(false)}
                user_data={user_data}
            />
            
        </Container>
    );
}


export default Profile;