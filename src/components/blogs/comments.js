import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Button} from 'react-bootstrap';
import {createComment,deleteComment} from '../../redux/actions/comments';
import { MDBContainer, MDBInputGroup } from "mdbreact";
import { MDBIcon } from 'mdbreact';
import {getComments} from '../../redux/actions/comments';
import {addCommentVote, removeCommentVote} from '../../redux/actions/votes'
import '../../css/comment.css'

const Comments = (props) => {
    var commentList;
    const dispatch = useDispatch();
    const blog_id = props.data.blog_id;
    const user_id = props.data.user_id;
    const [comment,setComment] = useState('');
    // getting comments from the redux state
    const comments = useSelector( state => state.commentReducer.comments);
    // total number of likes the selected blog has got
    var votes = useSelector( state => state.commentReducer.votes);
    
    const handleVote = (comment_id,e) => {
        dispatch(addCommentVote(user_id,comment_id));
        dispatch(getComments(blog_id));
    };

    const handleUnvote = (comment_id,e) => {
        dispatch(removeCommentVote(user_id,comment_id));
        dispatch(getComments(blog_id));
    };

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
        var vote = votes.filter( vt => vt.comment_id ===  comment._id );
        // checking if the current user has liked this blog or not
        var isliked = vote.some( vt => vt.user_id === user_id );
        return(
            <div>
                <p>
                    <span> <strong> {comment.user_id.username} </strong></span>&nbsp;&nbsp;
                    <span> {comment.comment} </span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>{vote.length}</span>&nbsp;&nbsp;
                    <span>
                        { isliked &&  
                        <MDBIcon icon="heart" className='mr-1 card-title-home like' onClick={ (e) => handleUnvote(comment._id,e)} />}
                        { !isliked && 
                        <MDBIcon far icon="heart" className='mr-1 card-title-home like' onClick={ (e) => handleVote(comment._id,e)} /> }
                    </span>
                </p>
                { comment.user_id._id === user_id && <p>
                    <span> <MDBIcon icon="trash" onClick={ (e) => handleDelete(comment._id,e)}/></span>
                </p> }
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