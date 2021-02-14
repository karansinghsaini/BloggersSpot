import React, {useEffect,useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Redirect, useParams} from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import {Card, Dropdown} from 'react-bootstrap';
import jwt from 'jsonwebtoken';
// importing comments component
import Comments from './comments';
// functions to dispatch for api calls
import {getBlog, DeleteBlog} from '../../redux/actions/blogs';
import {addVote,removeVote} from '../../redux/actions/votes';
import {getComments} from '../../redux/actions/comments';
// heart icons
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaEllipsisV } from "react-icons/fa";
import { FaShareSquare } from "react-icons/fa";

import '../../css/home.css';

//Blog Detail component
const Detail = () => {
    // getting blogid from url params
    const { blogid } = useParams();
    //data of user
    const data = jwt.decode(localStorage.jwtToken);
    // getting the data from backend
    const blog = useSelector( state => state.blogReducer.blogDetail);
    // total number of likes the selected blog has got
    var vote = useSelector( state => state.blogReducer.votes);
    // checking if the current user has liked this blog or not
    var isliked = vote.some( vt => vt.user_id === data.id);
    // for changing state and updating component only
    const [profileNav, setProfileNav] = useState(false);
    const [editNav, setEditNav] = useState(false);
    // storing blog and author id to pass as props in Redirect component
    const [author,setAuthor] = useState();


    // initializing dispatch function
    const dispatch = useDispatch();
    // defining the foll var to pass props to comments component
    const propsData={
        blog_id:blogid,
        user_id:data.id
    };

    // running functions on loading and updating the component
    useEffect( () => {
        dispatch(getBlog(blogid));
        dispatch(getComments(blogid));
    }, [isliked]);

    const handleDelete = () => {
        if(window.confirm('Are you sure you want to delete this blog?')){
            dispatch(DeleteBlog(blogid));
        }
    };

    // adding the like to the backend
    const handleVote = (e) => {
        isliked = true;
        dispatch(addVote(data.id,blogid));
        dispatch(getBlog(blogid));
    };

    // unvoting the blog 
    const handleUnvote = (e) => {
        isliked = false;
        dispatch(removeVote(data.id,blogid));
        dispatch(getBlog(blogid));
    };

    const handleEdit = (e) => {
        e.preventDefault();
        setEditNav(true);
        console.log("Editing");
    }

    const handleProfileClick = (id,e) => {
        setAuthor(id)
        //localStorage.setItem('userid', id);
        setProfileNav(true);
    };

    // if user clicked on username then redirecting to user-profile
    if(profileNav){
        return < Redirect to ={ {
            pathname: `/profile/${author}`
          }} 
          />;
    }

    // if user clicked on edit button then redirecting to new-blog component and passing blog_id as prop
    if(editNav){
        return < Redirect to ={ {
            pathname: "/new-blog",
            state: { blog_id: blogid }
          }} 
          />;
    }

    return (
        <div className='blogs-detail'>
            <Card className="text-center blog-card" key={blog._id} bg='info'>
                <Card.Header className='card-title-home'>
                    <div>
                    <span onClick={(e) => handleProfileClick(blog.user_id,e)}>@{blog.author}</span>

                    </div>

                </Card.Header>
                <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text className='card-text'>
                {ReactHtmlParser(blog.content)}
                </Card.Text>
                </Card.Body>
                <Card.Footer style={{ textAlign: 'left' }}>
                    { !isliked && <FaRegHeart className='blog-detail-icon'  onClick={handleVote} />}&nbsp;
                    { isliked && <FaHeart className='blog-detail-icon' onClick={handleUnvote} />}&nbsp;
                    <span>{vote.length}</span>&nbsp;
                    {/* { (data.id === blog.user_id) && <FaEdit className='blog-detail-edit edit' onClick={ (e) => handleEdit(e)}/>}
                    { (data.id === blog.user_id) && <MdDelete className='blog-detail-icon delete' onClick={handleDelete}/>} */}

                    <Dropdown size="sm" className='blog_dropdown'>
                        <Dropdown.Toggle variant="secondary">
                            
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            { (data.id === blog.user_id) && <Dropdown.Item onClick={ (e) => handleEdit(e)}><FaEdit className='blog-detail-edit' />&nbsp; Edit</Dropdown.Item>}
                            { (data.id === blog.user_id) && <Dropdown.Item onClick={handleDelete}><MdDelete className='blog-detail-edit' />&nbsp; Delete</Dropdown.Item>}
                            <Dropdown.Item ><FaShareSquare/>&nbsp;Share</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </Card.Footer>
            </Card><br/>

            <Comments data={propsData}/>
        </div>
    );
};

export default Detail;