import React, {useState} from 'react';
import {InputGroup, FormControl, Button} from 'react-bootstrap';

import {useDispatch} from 'react-redux';
import {createBlog} from '../../redux/actions/blogs';

import '../../css/blog.css';

const Blog = () => {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    const dispatch = useDispatch();

    const handleBlogSubmit = (e) => {
        e.preventDefault();  
        const token = localStorage.getItem('jwtToken');
        const data = {
            "title": title,
            "content": content,
            "likes": 0
        };

        dispatch(createBlog(data,token));
};

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
                    onChange={ (e) => setContent(e.target.value)} />
                </InputGroup><br />

                <Button variant="primary" type="submit" onClick={handleBlogSubmit}>
                        Post Blog
                    </Button>
            </div>
        </div>
    );
}

export default (Blog);