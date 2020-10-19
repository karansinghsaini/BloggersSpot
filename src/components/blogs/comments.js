import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {InputGroup,FormControl,Button,Card} from 'react-bootstrap';
import {createComment,deleteComment} from '../../redux/actions/comments';

// import { FaHeart } from "react-icons/fa";
// import { FaRegHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

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
            <Card className="text-left" bg='light'  key={comment._id}>
                <Card.Header >
                    @{comment.user_id.username}
                </Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                    <p>
                        {comment.comment}
                    </p>
                    </blockquote>
                </Card.Body>
                <Card.Footer style={{ textAlign: 'left' }}>
                    {/* { !isliked && <FaRegHeart className='blog-detail-icon'  onClick={handleVote} />}&nbsp;
                    { isliked && <FaHeart className='blog-detail-icon' onClick={handleUnvote} />}&nbsp;
                    <span>{vote}</span> */}
                    { (user_id === comment.user_id._id) && <MdDelete className='blog-detail-icon delete' onClick={ (e) => handleDelete(comment._id,e)}/>}
                </Card.Footer>
            </Card>
        );
    });
   

    return(
        <div>
            <InputGroup>
                    <InputGroup.Prepend>
                    <InputGroup.Text>New Comment</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl 
                    as="textarea" 
                    aria-label="With textarea" 
                    onChange={ (e) => setComment(e.target.value)} />
                    <Button onClick={postNewComment}>Post</Button>
            </InputGroup><br />    

            {commentList}    
        </div>
    );
};

export default Comments;