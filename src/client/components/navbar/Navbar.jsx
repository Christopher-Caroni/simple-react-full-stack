import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Menu } from 'semantic-ui-react';

import AccountActionContainer from './AccountActionContainer';

const Navbar = ({ history }) => {
    const link = (e, { href }) => {
        e.preventDefault();
        history.push(href);
    };

    return (
        <Menu
            size="large"
            inverted
            color="blue"
            borderless
            style={{
                borderRadius: '0px',
            }}
        >
            <Menu.Item
                link
                header
                content="APP NAME"
                href="/web"
                onClick={link}
            />

            <AccountActionContainer />
        </Menu>
    );
};

export default withRouter(Navbar);

Navbar.propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
};
