import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logout } from './duck/authActions';
import Logout from './Logout';

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
});

const mapStateToProps = state => {
    const { auth } = state;
    return {
        auth,
    };
};

const LogoutContainer = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Logout)
);

export default LogoutContainer;
