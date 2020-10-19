import React, {useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import jwt from 'jsonwebtoken';

import { Button, Image, Card } from 'react-bootstrap';
import '../../css/profile/profile.css';
import defimg from '../../images/default.jpg';

import {GetUserProfile} from '../../redux/actions/user';
import {GetUserBlogs} from '../../redux/actions/blogs';
import {getAllVotes} from '../../redux/actions/votes';

import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";


const Profile = (props) => {
    // declaring the userid
    var userid;
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
    const votes = useSelector( state => state.votesReducer.allvotes);
    const dispatch = useDispatch();
    
    useEffect( () => {
        // checking if user_id is passed as props or not ( when we clicked on username on blogs )
        if(props.location.state === undefined){
            userid = data.id;
        }
        else{
            userid = props.location.state.user_id;
        }  
        dispatch(GetUserProfile(userid));
        dispatch(GetUserBlogs(userid));
        dispatch(getAllVotes());
    },[]);

    const handleClick = (id,e) => {
        setBlogId(id)
        setBlogNavigate(true);
        // dispatch(setBlogID(id));
        // localStorage.setItem('blogid',id);
        // window.location.href = '/blog-detail';
    };

    const handleUpdate = () => {
        dispatch(GetUserProfile(userid));
        setNavigate(true);
    }

    if(blognavigate){
        return < Redirect to ={ {
            pathname: '/blog-detail',
            state: { blog_id: blogid }
          }} 
          />;
    }

    if(navigate){
        return <Redirect to='/update-profile' push={true} />
    }
 

    var blogList = user_blogs.map( (details) => {
        var vote = votes.filter( vote => vote.blog_id === details._id);
        var isliked = vote.some( vt => (vt.user_id === userid));
        return(
            <div key={details._id}>
            <Card className="text-center blog-card" bg='info'>
                <Card.Header>@{details.author}</Card.Header>
                <Card.Body>
                <Card.Title className='card-title-home' onClick={(e) => handleClick(details._id,e)}>{details.title}</Card.Title>
                <Card.Text className='card-text'>
                {details.content}
                </Card.Text>
                </Card.Body>
                <Card.Footer >
                    {isliked && <FaHeart className='blog-detail-icon' />}&nbsp;
                    {!isliked && <FaRegHeart className='blog-detail-icon' />}&nbsp;
                    <span>{vote.length}</span>
                </Card.Footer>
            </Card><br />
            </div>
        )
});



    return(
        <div>
            <div className='profile-left-div'>
                <Image className='profile-img' src={defimg} roundedCircle />
                <h6>{user_data.fullname}</h6>
                <p>@{user_data.username}</p>                
                <p>Contact:- {user_data.phone}</p>     
                <p>Email:- {user_data.email}</p><br/>
                <h4>Bio</h4>
                <p>{user_data.bio}</p>
                { (data.id === user_data._id) && <Button variant="secondary" size="sm" onClick={handleUpdate} >Update profile</Button>}
            </div>

            {/* <div className='profile-right-div' >
               
            </div> */}

            <div className='profile-center-div'>
                <h4>Blogs</h4>
                <br />{ user_blogs.length === 0 && <p className='no-blogs'>No Blogs yet</p> }
                {blogList}
            </div>

            
        </div>
    );
}


export default Profile;