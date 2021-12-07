import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Button} from 'react-bootstrap';
import {createComment,deleteComment} from '../../redux/actions/comments';
import { MDBContainer, MDBInputGroup } from "mdbreact";
import { MDBCard, MDBCardBody, MDBCardText, MDBIcon } from 'mdbreact';

const Comments = (props) => {
    var commentList;
    const dispatch = useDispatch();
    const blog_id = props.data.blog_id;
    const user_id = props.data.user_id;
    const [comment,setComment] = useState('');
    // getting comments from the redux state
    const comments = useSelector( state => state.commentReducer.comments);

    // function for deleting the comment
    const handleDelete = (comment_id,e) => {
        console.log('Checning comment id:- ' + comment_id);
        if(window.confirm('Are you sure you want to delete this comment?')){
            dispatch(deleteComment(user_id,comment_id));
        }
    };

    // function for posting new comment
    const postNewComment = () =>{
        const data = {
            comment: comment
        };
        dispatch(createComment(data,blog_id,user_id));

    };

    // making the comments list as card.
    commentList = comments.map( (comment) => {
        return(
            // <MDBCard>
            //     <div className='rounded-top mdb-color lighten-3 text-center pt-3'>
            //         <ul className='list-unstyled list-inline font-small'>
            //         <li className='list-inline-item pr-2'>
            //             <MDBIcon icon="user" className='mr-1 white-text card-title-home'>
            //             &nbsp; {comment.user_id.username}
            //             </MDBIcon>
            //         </li>
            //         </ul>
            //     </div>
            //     <MDBCardBody>
            //     <MDBCardText className='card-text'>
            //     {comment.comment}
            //     </MDBCardText>
            //     </MDBCardBody>
            //     <div className='rounded-bottom mdb-color lighten-3 text-center pt-3'>
            //         <ul className='list-unstyled list-inline font-small'>
            //             {/* <li className='list-inline-item pr-2 white-text'>
            //                 <MDBIcon far icon='clock' /> {comment.date_created}
            //             </li> */}
            //         {/* <li className='list-inline-item pr-2'>
            //             <MDBIcon far icon='comments' className='mr-1 white-text card-title-home' onClick={(e) => handleBlogClick(comment._id,e)}>
            //             &nbsp; {comment.length}
            //             </MDBIcon>
            //         </li>
            //         { !isliked && <li className='list-inline-item pr-2'>
            //             <MDBIcon far icon="heart" className='mr-1 white-text card-title-home' onClick={ (e) => handleVote(comment._id,e)}>
            //             &nbsp; {vote.length}
            //             </MDBIcon>
            //         </li>}
            //         { isliked && <li className='list-inline-item'>
            //             <MDBIcon icon="heart" className='mr-1 white-text card-title-home' onClick={ (e) => handleUnvote(comment._id,e)}> 
            //             &nbsp; {vote.length}
            //             </MDBIcon>
            //         </li>} */}
            //         { (user_id === comment.user_id._id) &&  <li className='list-inline-item'>
            //             <MDBIcon icon="trash" className='mr-1 white-text card-title-home' onClick={ (e) => handleDelete(comment._id,e)}/>
            //         </li>}
            //         </ul>
            //     </div>
            // </MDBCard>
            <div>
                <p>
                    <span> <strong> {comment.user_id.username} </strong></span>&nbsp;&nbsp;
                    <span> {comment.comment} </span>&nbsp;&nbsp;&nbsp;&nbsp;
                    {/* <span>
                        { isliked &&  
                        <MDBIcon icon="heart" className='mr-1 card-title-home' onClick={ (e) => handleUnvote(comment._id,e)} />}
                        { !isliked && 
                        <MDBIcon far icon="heart" className='mr-1 card-title-home' onClick={ (e) => handleVote(comment._id,e)} /> }
                    </span> */}
                </p>
                <p>
                    <span> <MDBIcon icon="ellipsis-h" /> </span>
                </p>
            </div>
        );
    });


    return(
        <div>
            <MDBContainer>
                <MDBInputGroup
                    material
                    className="mb-0"
                    prepend="New Comment"
                    type="textarea"
                    onChange={ (e) => setComment(e.target.value)} 
                    append={
                        <Button onClick={postNewComment}>Post</Button>
                    }
                />
            </MDBContainer>
            {commentList}    
        </div>
    );
};

export default Comments;