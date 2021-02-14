import React, {useState,useEffect} from 'react';
import {InputGroup, FormControl, Button} from 'react-bootstrap';

import {getBlog} from '../../redux/actions/blogs';

import {useDispatch,useSelector} from 'react-redux';
import {createBlog,UpdateBlog} from '../../redux/actions/blogs';

import '../../css/blog.css';

const Blog = (props) => {
    var blogid = props.location.state.blog_id;
    // getting the data from backend
    const blog = useSelector( state => state.blogReducer.blogDetail);

    const [title, setTitle] = useState(blog.title);
    const [content, setContent] = useState(blog.content);

    const dispatch = useDispatch();

    useEffect( () => {
        if (blogid != undefined){
            dispatch(getBlog(blogid));
        }
        setTitle(blog.title);
        setContent(blog.content);
    },[]);

    const handleBlogSubmit = (e) => {
        e.preventDefault();  
        
        const data = {
            "title": title,
            "content": content,
            "likes": 0
        };

        dispatch(createBlog(data));
    };

    const handleUpdateBlog = (e) => {
        e.preventDefault();
        const data = {
            "title": title,
            "content": content,
        };
        dispatch(UpdateBlog(blogid,data));
    }
console.log("Checking Bloga:- ",blog);
console.log("Checking Blog Detail:- ",title);
    return (
        <div>
            <h3 className='blog-head'>New Blog</h3>
            <div className='blog-container'>

                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">Title</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    value = {title}
                    onChange={ (e) => setTitle(e.target.value)}
                    />
                </InputGroup>
                
                <InputGroup>
                    <InputGroup.Prepend>
                    <InputGroup.Text>Blog Content</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl 
                    as="textarea" 
                    aria-label="With textarea" 
                    value = {content}
                    onChange={ (e) => setContent(e.target.value)} />
                </InputGroup><br />

                { blogid==undefined && <Button variant="primary" type="submit" onClick={handleBlogSubmit}>
                        Post Blog
                </Button> }

                { blogid!=undefined && <Button variant="primary" type="submit" onClick={handleUpdateBlog}>
                    Update Blog
                </Button> }
            </div>
        </div>
    );
}

export default (Blog);