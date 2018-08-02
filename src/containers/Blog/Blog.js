import React, { Component } from 'react';
import Posts from '../../containers/Posts/Posts';
import './Blog.css';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import asyncComponent from '../../hoc/asyncComponent'
//import NewPost from '../NewPost/NewPost';

const AsyncNewPost = asyncComponent(() => import('../NewPost/NewPost'));

class Blog extends Component {
    state = {
        auth: true,
    }
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/posts"
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
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null}
                    <Route path="/posts" component={Posts} />
                    <Route render={() => <p1>Not Found</p1> }/>
                    {/*<Redirect from="/" to="/posts" />*/}
                </Switch>
            </div>
        );
    }
}

export default Blog;
