import React, { Component } from "react";
import axiosInstance from '../../axios';
import { Route } from 'react-router-dom';
import Post from '../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import './Posts.css';

class Posts extends Component {
  postSelectedHandler = this.postSelectedHandler.bind(this);
  state = {
    posts: [],
    selectedPostId: null,
    error: false
  };

  componentDidMount() {
    axiosInstance
      .get("/posts")
      .then(response => {
        const posts = response.data.slice(0, 10).map(post => {
          return {
            ...post,
            author: "Rhys"
          };
        });
        this.setState({ posts });
      })
      .catch(error => console.log(error));
  }

  postSelectedHandler(id) {
    this.props.history.push({ pathname:`/posts/${id}` })
  }

  render() {
    const { posts, error } = this.state;
    let postsComponents = (
      <p style={{ textAlign: "center" }}>Something went wrong!</p>
    );
    if (!error) {
      postsComponents = posts.map(post => {
        return (
            <Post
              key={post.id}
              title={post.title}
              author={post.author}
              clicked={() => this.postSelectedHandler(post.id)}
            />
        );
      });
    }
    return (
      <div>
        <section className="Posts">
          {postsComponents}
        </section>
        <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
      </div>
    );
  }
}

export default Posts;
