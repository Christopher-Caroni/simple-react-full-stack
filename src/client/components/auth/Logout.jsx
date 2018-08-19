import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Dimmer, Header, Loader } from 'semantic-ui-react';

import LoginContainer from './LoginContainer';

export default class Logout extends Component {
    componentDidMount() {
        const {
            location: { state: { confirmLogout } = { confirmLogout: false } },
            history,
            logout,
        } = this.props;

        if (confirmLogout) {
            console.log('logging out');
            logout();
        } else {
            console.log('logout unconfirmed');
            history.push('/web');
        }
    }

    render() {
        return (
            <>
                <LoginContainer />
                <Dimmer active page>
                    <Header as="h2" icon inverted>
                        <Loader>Logging out</Loader>
                    </Header>
                </Dimmer>
            </>
        );
    }
}

Logout.propTypes = {
    location: ReactRouterPropTypes.location.isRequired,
    history: ReactRouterPropTypes.history.isRequired,

    logout: PropTypes.func.isRequired,
};
