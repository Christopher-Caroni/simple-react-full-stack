import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Button, Dropdown, Icon, Menu } from 'semantic-ui-react';

import ExcludeRoute from '../generic/ExcludeRoute';
import AdminkLinks from './AdminLinks';

class AccountAction extends Component {
    componentDidMount() {
        this.props.refresh();
    }

    link = (e, { href }) => {
        e.preventDefault();
        this.props.history.push(href);
    };

    logout = e => {
        e.preventDefault();
        this.props.history.push({
            pathname: '/web/logout',
            state: { confirmLogout: true },
        });
    };

    content = () => {
        const {
            auth: {
                authenticated,
                loginInProgress,
                user: { username },
            },
        } = this.props;

        if (authenticated) {
            return (
                <>
                    <AdminkLinks />

                    <Menu.Item>
                        <Icon name="user" />
                        <Dropdown item text={username} pointing button>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    icon="power off"
                                    content="Logout"
                                    href="/web/logout"
                                    onClick={this.logout}
                                />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                </>
            );
        }
        return (
            <Menu.Item>
                <Button
                    loading={loginInProgress}
                    content="Login"
                    href="/web/login"
                    onClick={this.link}
                />
            </Menu.Item>
        );
    };

    render() {
        return (
            <Menu.Menu position="right">
                <ExcludeRoute
                    exclusions={['/web/login']}
                    content={this.content}
                />
            </Menu.Menu>
        );
    }
}

AccountAction.propTypes = {
    auth: PropTypes.shape({
        loginInProgress: PropTypes.bool.isRequired,
        authenticated: PropTypes.bool.isRequired,
        user: PropTypes.shape({
            username: PropTypes.string.isRequired,
        }),
    }).isRequired,
    refresh: PropTypes.func.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
};

export default AccountAction;
