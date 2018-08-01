import React, { Component } from 'react';
import Posts from '../../containers/Posts/Posts';
import './Blog.css';
import { Route, NavLink, Switch } from 'react-router-dom';
import NewPost from '../NewPost/NewPost';
import FullPost from '../FullPost/FullPost';

class Blog extends Component {

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/"
                                exact
                                activeClassName="something-else"
                                activeStyle={{textDecoration: 'underline'}}
                            >
                                Home
                            </NavLink></li>
                            <li><NavLink to="/new-post" exact>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path="/" component={Posts} exact />
                    <Route path="/new-post" component={NewPost} exact />
                    <Route path="/:id" component={FullPost} exact />
                </Switch>
            </div>
        );
    }
}

export default Blog;
