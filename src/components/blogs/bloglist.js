import React, {useState}  from 'react';
import ReactHtmlParser from 'react-html-parser';
import {useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBIcon } from 'mdbreact';
import {getBlogs} from '../../redux/actions/blogs';
import {addVote,removeVote} from '../../redux/actions/votes';
import {getBlog, DeleteBlog} from '../../redux/actions/blogs';
import '../../css/home.css';

const Bloglist = (props) => {
    
    const [blogNav,setBlogNav] = useState(false);
    const [profileNav, setProfileNav] = useState(false);
    // storing blog and author id to pass as props in Redirect component
    const [author,setAuthor] = useState();
    const [blogid, setBlogId] = useState();
    
    const dispatch = useDispatch();

    // adding the like to the backend
    const handleVote = (blogid,e) => {
        dispatch(addVote(props.data.id,blogid));
        dispatch(getBlogs());
    };

    // unvoting the blog 
    const handleUnvote = (blogid,e) => {
        dispatch(removeVote(props.data.id,blogid));
        dispatch(getBlogs());       
    };

    const handleBlogClick = (id,e) => {
        setBlogId(id);
        setBlogNav(true);
    };

    const handleProfileClick = (id,e) => {
        setAuthor(id)
        setProfileNav(true);
    };

    const handleDelete = () => {
        if(window.confirm('Are you sure you want to delete this blog?')){
            dispatch(DeleteBlog(blogid));
        }
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


    var list = props.blogs.map( (details) => {
        var vote = props.votes.filter( vote => vote.blog_id === details._id);
        var isliked = props.votes.some( vote => (vote.blog_id === details._id && vote.user_id === props.data.id));
        var comment = props.comments.filter( comment => comment.blog_id === details._id);
        return(
            <div key={details._id}>
            <MDBCard>
                <div className='rounded-top purple-gradient lighten-3 text-center pt-3'>
                    <ul className='list-unstyled list-inline font-small'>
                    <li className='list-inline-item pr-2'>
                        <MDBIcon icon="user" className='mr-1 white-text card-title-home' onClick={(e) => handleProfileClick(details.user_id,e)}>
                        &nbsp; {details.author}
                        </MDBIcon>
                    </li>
                    </ul>
                </div>
                <MDBCardBody>
                <MDBCardTitle className='card-title-home' onClick={(e) => handleBlogClick(details._id,e)}>{details.title}</MDBCardTitle>
                <MDBCardText className='card-text'>
                {ReactHtmlParser( details.content )}
                </MDBCardText>
                </MDBCardBody>
                <div className='rounded-bottom mdb-color lighten-3 text-center pt-3'>
                    <ul className='list-unstyled list-inline font-small'>
                    {/* <li className='list-inline-item pr-2 white-text'>
                        <MDBIcon far icon='clock' /> {details.date_created}
                    </li> */}
                    <li className='list-inline-item pr-2'>
                        <MDBIcon far icon='comments' className='mr-1 white-text card-title-home' onClick={(e) => handleBlogClick(details._id,e)}>
                        &nbsp; {comment.length}
                        </MDBIcon>
                    </li>
                    { !isliked && <li className='list-inline-item pr-2'>
                        <MDBIcon far icon="heart" className='mr-1 white-text card-title-home' onClick={ (e) => handleVote(details._id,e)}>
                        &nbsp; {vote.length}
                        </MDBIcon>
                    </li>}
                    { isliked && <li className='list-inline-item'>
                        <MDBIcon icon="heart" className='mr-1 white-text card-title-home' onClick={ (e) => handleUnvote(details._id,e)}> 
                        &nbsp; {vote.length}
                        </MDBIcon>
                    </li>}
                    { (props.data.id === details.user_id) &&  <li className='list-inline-item'>
                        <MDBIcon icon="trash" className='mr-1 white-text card-title-home' onClick={handleDelete}/>
                    </li>}
                    </ul>
                </div>
            </MDBCard><br />
            </div>
        )
    });

    return(
        <>
            {list}
        </>
    )
};

export default (Bloglist);