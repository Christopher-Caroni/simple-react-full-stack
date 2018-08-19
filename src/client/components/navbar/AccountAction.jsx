import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Button, Menu, Icon, Dropdown } from 'semantic-ui-react';

import AdminkLinks from './AdminLinks';

const AccountAction = ({ auth, history }) => {
    const {
        authenticated,
        loginInProgress,
        user: { username },
    } = auth;

    const link = (e, { href }) => {
        e.preventDefault();
        history.push(href);
    };

    const content = () => {
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
                                    onClick={link}
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
                    onClick={link}
                />
            </Menu.Item>
        );
    };

    return (
        <Menu.Menu position="right">
            <Switch>
                <Route exact path="/web/login" render={() => null} />
                <Route render={() => content()} />
            </Switch>
        </Menu.Menu>
    );
};

AccountAction.propTypes = {
    auth: PropTypes.shape({
        loginInProgress: PropTypes.bool.isRequired,
        authenticated: PropTypes.bool.isRequired,
        user: PropTypes.shape({
            username: PropTypes.string.isRequired,
        }),
    }).isRequired,
    history: ReactRouterPropTypes.history.isRequired,
};

export default AccountAction;
