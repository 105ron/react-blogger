import React, { Component } from "react";
import axiosInstance from '../../axios';
import Post from '../../components/Post/Post';
import { Link } from 'react-router-dom';
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
    this.setState({ selectedPostId: id });
  }

  render() {
    const { posts, error } = this.state;
    let postsComponents = (
      <p style={{ textAlign: "center" }}>Something went wrong!</p>
    );
    if (!error) {
      postsComponents = posts.map(post => {
        return (
          <Link to={`/${post.id}`} key={post.id}>
            <Post
              title={post.title}
              author={post.author}
              clicked={() => this.postSelectedHandler(post.id)}
            />
          </Link>
        );
      });
    }
    return (
      <section className="Posts">
        {postsComponents}
      </section>
    );
  }
}

export default Posts;
