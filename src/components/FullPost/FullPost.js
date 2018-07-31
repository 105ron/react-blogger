import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: {
            title: null,
            content: null,
        },
    };

    componentDidUpdate() {
        const { id: postId } = this.props;
        const { title, id: stateId } = this.state.loadedPost;
        if (postId) {
            if (!title || (title && stateId !== postId)) {
                axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
                    .then(response => 
                        this.setState({ loadedPost: response.data })
                    );
            }
        }
    }

    render () {
        const { title, content } = this.state.loadedPost;
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if (this.props.id) {
            post = <p style={{ textAlign: 'center' }}>Loading...</p>;
        }
        if (title) {
            post = (
                <div className="FullPost">
                    <h1>{title}</h1>
                    <p>{content}</p>
                    <div className="Edit">
                        <button className="Delete">Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;