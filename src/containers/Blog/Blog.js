import React, { Component } from 'react';
import axiosInstance from '../../axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    postSelectedHandler = this.postSelectedHandler.bind(this);
    state = {
        posts: [],
        selectedPostId: null,
        error: false,
    };

    componentDidMount() {
        axiosInstance.get('/posts')
            .then(response => {
            const posts = response.data.slice(0, 10).map(post => {
                return {
                    ...post,
                    author: 'Rhys',
                }
            });
            this.setState({posts})
        }).catch(error=> this.setState({ error: true }));
    }

    postSelectedHandler(id) {
        this.setState({ selectedPostId: id });
    }

    render () {
        const { posts, selectedPostId, error } = this.state;
        let postsComponents = <p style={{ textAlign: 'center' }}>Something went wrong!</p>
        if (!error) {
            postsComponents = posts.map(post => {
                return <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)}
                    />
            })
        }
        return (
            <div>
                <section className="Posts">
                    {postsComponents}
                </section>
                <section>
                    <FullPost id={selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;