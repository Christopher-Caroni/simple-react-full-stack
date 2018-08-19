import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Dropdown } from 'semantic-ui-react';

const AdminLinks = ({ history }) => {
    const link = (e, { href }) => {
        e.preventDefault();
        history.push(href);
    };

    return (
        <>
            <Dropdown item text="Language" pointing>
                <Dropdown.Menu>
                    <Dropdown.Item
                        content="English"
                        href="/web"
                        onClick={link}
                    />
                    <Dropdown.Item
                        content="Russian"
                        href="/web"
                        onClick={link}
                    />
                    <Dropdown.Item
                        content="Spanish"
                        href="/web"
                        onClick={link}
                    />
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
};

export default withRouter(AdminLinks);

AdminLinks.propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
};
