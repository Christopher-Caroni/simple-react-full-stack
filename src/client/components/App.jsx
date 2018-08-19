import '../../../semantic/dist/semantic.min.css';
import '../app.css';

import React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router-dom';

import HomeContainer from '../containers/HomeContainer';
import NotFound from '../pages/NotFound';
import Authenticated from '../routers/Authenticated';
import LoginContainer from './auth/LoginContainer';
import LogoutContainer from './auth/LogoutContainer';
import SignupContainer from './auth/SignupContainer';
import Navbar from './navbar/Navbar';

const App = () => (
    <>
        <Navbar />

        <Switch>
            <Route exact path="/web/login" component={LoginContainer} />
            <Route exact path="/web/logout" component={LogoutContainer} />
            <Route exact path="/web/signup" component={SignupContainer} />

            <Authenticated exact path="/web" component={HomeContainer} />

            <Route component={NotFound} />
        </Switch>
    </>
);

export default hot(module)(App);
