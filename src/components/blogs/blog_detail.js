import React, {useEffect,useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Redirect, useParams} from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBIcon } from 'mdbreact';
import jwt from 'jsonwebtoken';
// importing comments component
import Comments from './comments';
// functions to dispatch for api calls
import {getBlog, DeleteBlog} from '../../redux/actions/blogs';
import {addVote,removeVote} from '../../redux/actions/votes';
import {getComments} from '../../redux/actions/comments';

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
    // storing blog and author id to pass as props in Redirect component
    const [author,setAuthor] = useState();
    // getting all the comments
    var comments = useSelector( state => state.commentReducer.comments);
    var comment = comments.filter( comment => comment.blog_id === blog._id);

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
    }, []);

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

    return (
        <div className='blogs-detail'>
            <MDBCard>
                <div className='rounded-top mdb-color lighten-3 text-center pt-3'>
                    <ul className='list-unstyled list-inline font-small'>
                    <li className='list-inline-item pr-2'>
                        <MDBIcon icon="user" className='mr-1 white-text card-title-home' onClick={(e) => handleProfileClick(blog.user_id,e)}>
                        &nbsp; {blog.author}
                        </MDBIcon>
                    </li>
                    </ul>
                </div>
                <MDBCardBody>
                <MDBCardTitle className='card-title-home'>{blog.title}</MDBCardTitle>
                <MDBCardText className='card-text'>
                {ReactHtmlParser( blog.content )}
                </MDBCardText>
                </MDBCardBody>
                <div className='rounded-bottom mdb-color lighten-3 text-center pt-3'>
                    <ul className='list-unstyled list-inline font-small'>
                    {/* <li className='list-inline-item pr-2 white-text'>
                        <MDBIcon far icon='clock' /> {details.date_created}
                    </li> */}
                    <li className='list-inline-item pr-2'>
                        <MDBIcon far icon='comments' className='mr-1 white-text card-title-home' >
                        &nbsp; {comment.length}
                        </MDBIcon>
                    </li>
                    { !isliked && <li className='list-inline-item pr-2'>
                        <MDBIcon far icon="heart" className='mr-1 white-text card-title-home' onClick={handleVote}>
                        &nbsp; {vote.length}
                        </MDBIcon>
                    </li>}
                    { isliked && <li className='list-inline-item'>
                        <MDBIcon icon="heart" className='mr-1 white-text card-title-home' onClick={handleUnvote}> 
                        &nbsp; {vote.length}
                        </MDBIcon>
                    </li>}
                    { (data.id === blog.user_id) &&  <li className='list-inline-item'>
                        <MDBIcon icon="trash" className='mr-1 white-text card-title-home' onClick={handleDelete}/>
                    </li>}
                    </ul>
                </div>
            </MDBCard><br />

            <Comments data={propsData}/>
        </div>
    );
};

export default Detail;