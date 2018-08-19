import React from 'react';
import { Menu, Dropdown, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

const Navbar = ({ history }) => {
    const link = (e, { href }) => {
        e.preventDefault();
        history.push(href);
    };

    return (
        <Menu size="large" inverted color="blue" borderless fixed="top">
            <Menu.Item
                link
                header
                content="APP NAME"
                href="/web"
                onClick={link}
            />

            <Menu.Menu position="right">
                <Dropdown item text="Language">
                    <Dropdown.Menu>
                        <Dropdown.Item>English</Dropdown.Item>
                        <Dropdown.Item>Russian</Dropdown.Item>
                        <Dropdown.Item>Spanish</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Menu.Item>
                    <Button content="Login" href="/web/login" onClick={link} />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};

export default withRouter(Navbar);

Navbar.propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
};
