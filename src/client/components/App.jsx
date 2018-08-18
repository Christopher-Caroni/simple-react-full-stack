import '../../../semantic/dist/semantic.min.css';
import '../app.css';

import React from 'react';
import { hot } from 'react-hot-loader';
import { Link, Route, Switch } from 'react-router-dom';
import { List, Segment } from 'semantic-ui-react';

import SignupContainer from '../containers/Auth/SignupContainer';
import HomeContainer from '../containers/HomeContainer';

const App = () => (
    <>
        <Segment>
            <List bulleted>
                <List.Item>
                    <Link to="/web">Home</Link>{' '}
                </List.Item>
                <List.Item>
                    <Link to="/web/login">Login</Link>{' '}
                </List.Item>
                <List.Item>
                    <Link to="/web/signup">Signup</Link>{' '}
                </List.Item>
            </List>
        </Segment>

        <Switch>
            <Route exact path="/web/signup" component={SignupContainer} />
            <Route exact path="/web" component={HomeContainer} />
        </Switch>
    </>
);

export default hot(module)(App);
