import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Bloglist from './bloglist';
import {getBlogs} from '../../redux/actions/blogs';
import {GetAllComment} from '../../redux/actions/comments';
import jwt from 'jsonwebtoken';
import '../../css/home.css';

const Home = () => {
    // decoding the token to get logged in user data
    const data = jwt.decode(localStorage.jwtToken);
    //getting all blogs
    const blogs = useSelector(state => state.blogReducer.blogs);
    // getting all votes
    var votes = useSelector( state => state.blogReducer.votes);
    // getting all the comments
    var comments = useSelector( state => state.commentReducer.allcomments);

    
    const dispatch = useDispatch();
                                                                                           
    useEffect (() => {
        dispatch(getBlogs());   
        dispatch(GetAllComment());     
    }, []);

    return(
        <div>
            <h3 className='home_head'>Welcome To Blogs</h3>
            <div className='blogs-list'>
            <Bloglist
                blogs={blogs}
                votes={votes}
                comments={comments}
                data={data}
            />
            </div>
        </div>
    );
}


export default (Home);
