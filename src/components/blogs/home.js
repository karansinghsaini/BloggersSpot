import React, {useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Card} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import {getBlogs} from '../../redux/actions/blogs';
import {addVote,removeVote} from '../../redux/actions/votes';
import ReactHtmlParser from 'react-html-parser';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import jwt from 'jsonwebtoken';

import '../../css/home.css';


const Home = () => {
    // decoding the token to get logged in user data
    const data = jwt.decode(localStorage.jwtToken);
    //getting all blogs
    const blogs = useSelector(state => state.blogReducer.blogs);
    // getting all votes
    var votes = useSelector( state => state.blogReducer.votes);
    // storing boolean value on the bassis on clicks
    const [blogNav,setBlogNav] = useState(false);
    const [profileNav, setProfileNav] = useState(false);
    // storing blog and author id to pass as props in Redirect component
    const [author,setAuthor] = useState();
    const [blogid, setBlogId] = useState();
    
    const dispatch = useDispatch();

    // adding the like to the backend
    const handleVote = (blogid,e) => {
        dispatch(addVote(data.id,blogid));
        dispatch(getBlogs());
    };

    // unvoting the blog 
    const handleUnvote = (blogid,e) => {
        dispatch(removeVote(data.id,blogid));
        dispatch(getBlogs());       
    };

    useEffect (() => {
        dispatch(getBlogs());        
    }, [votes]);

    const handleBlogClick = (id,e) => {
        setBlogId(id);
        setBlogNav(true);
    };

    const handleProfileClick = (id,e) => {
        setAuthor(id)
        setProfileNav(true);
    };

    // If user clicked on Blogs then redirecting to blogs-detail
    if(blogNav){
        return < Redirect to ={ {
            pathname: `/blog-detail/${blogid}`
          }} 
          />;
    }

    // if user clicked on username then redirecting to user-profile
    if(profileNav){
        return < Redirect to ={ {
            pathname: `/profile/${author}`
          }} 
          />;
    }

    var blogList = blogs.map( (details) => {
        var vote = votes.filter( vote => vote.blog_id === details._id);
        var isliked = votes.some( vote => (vote.blog_id === details._id && vote.user_id === data.id));
        return(
            <div key={details._id}>
            <Card className="text-center blog-card" bg='info'>
                <Card.Header className='card-title-home' onClick={(e) => handleProfileClick(details.user_id,e)}>
                    @{details.author}
                </Card.Header>
                <Card.Body>
                <Card.Title className='card-title-home' onClick={(e) => handleBlogClick(details._id,e)}>{details.title}</Card.Title>
                <Card.Text className='card-text'>
                {ReactHtmlParser(details.content)}
                </Card.Text>
                </Card.Body>
                <Card.Footer >
                    { isliked && <FaHeart className='blog-detail-icon' onClick={ (e) => handleUnvote(details._id,e)}/>}&nbsp;
                    {!isliked && <FaRegHeart className='blog-detail-icon' onClick={ (e) => handleVote(details._id,e)}/>}&nbsp;
                    <span>{vote.length}</span>
                </Card.Footer>
            </Card><br />
            </div>
        )
    });


    return(
        <div>
            <h3>Welcome To Blogs</h3>
            <div className='blogs-list'>
                {blogList}
            </div>
        </div>
    );
}


export default (Home);
