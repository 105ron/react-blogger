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
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData() {
        const { id: paramsId } = this.props.match.params;
        const { title, id: stateId } = this.state.loadedPost;
        if (paramsId) {
            if (!title || (title && stateId !== +paramsId)) {
                axios.get(`/posts/${paramsId}`)
                    .then(response => 
                        this.setState({ loadedPost: response.data })
                    );
            }
        }
    }

    deletePostHandler() {
        const { id: postId } = this.props.match.params;
        axios.delete(`/posts/${postId}`)
            .then(response => console.log(response));
    }

    render () {
        const { title, body } = this.state.loadedPost;
        const { id: paramsId } = this.props.match.params;
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if (paramsId) {
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