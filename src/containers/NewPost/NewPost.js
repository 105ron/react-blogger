import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './NewPost.css';

class NewPost extends Component {
    postDataHandler = this.postDataHandler.bind(this);
    state = {
        title: '',
        content: '',
        author: 'Rhys',
        // submitted: false,
    }

    postDataHandler() {
        const { title, content, author } = this.state;
        const data = { title, content, author }
        axios.post(`/posts/`, data)
            .then(response => {
                console.log(response)
                this.props.history.push("/posts")
                //replace and redirect remove current page from history stack
                // this.setState({ submitted: true })
            });
    }

    render () {
        const { author, content, submitted, title } = this.state;
        // let redirect = null;
        // if (submitted) {
        //     redirect = <Redirect to="/posts" />
        // }
        return (
            
            <div className="NewPost">
                {/*redirect*/}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;