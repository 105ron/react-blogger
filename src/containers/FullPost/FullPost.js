import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {
    deletePostHandler = this.deletePostHandler.bind(this);
    state = {
        loadedPost: {
            title: null,
            content: null,
        },
    };

    componentDidMount() {
        const { id: postId } = this.props.match.params;
        const { title, id: stateId } = this.state.loadedPost;
        if (postId) {
            if (!title || (title && stateId !== postId)) {
                axios.get(`/posts/${postId}`)
                    .then(response => 
                        this.setState({ loadedPost: response.data })
                    );
            }
        }
    }

    deletePostHandler() {
        const { id: postId } = this.props;
        axios.delete(`/posts/${postId}`)
            .then(response => console.log(response));
    }
    render () {
        const { title, body } = this.state.loadedPost;
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if (this.props.id) {
            post = <p style={{ textAlign: 'center' }}>Loading...</p>;
        }
        if (title) {
            post = (
                <div className="FullPost">
                    <h1>{title}</h1>
                    <p>{body}</p>
                    <div className="Edit">
                        <button
                        className="Delete"
                        onClick={this.deletePostHandler}
                        >
                            Delete
                        </button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;