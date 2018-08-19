import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Button, Menu, Icon, Dropdown } from 'semantic-ui-react';

import AdminkLinks from './AdminLinks';

class AccountAction extends Component {
    componentDidMount() {
        this.props.refresh();
    }

    link = (e, { href }) => {
        e.preventDefault();
        this.props.history.push(href);
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
                                    onClick={this.link}
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
                <Switch>
                    <Route exact path="/web/login" render={() => null} />
                    <Route render={() => this.content()} />
                </Switch>
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
