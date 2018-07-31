import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    postSelectedHandler = this.postSelectedHandler.bind(this);
    state = {
        posts: [],
        selectedPostId: null,
    };

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
            const posts = response.data.slice(0, 10).map(post => {
                return {
                    ...post,
                    author: 'Rhys',
                }
            });
            this.setState({posts})
        });
    }

    postSelectedHandler(id) {
        this.setState({ selectedPostId: id });
    }

    render () {
        const { posts, selectedPostId } = this.state;
        const postsComponents = posts.map(post => {
            return <Post
                key={post.id}
                title={post.title}
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)}
                />
        })
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