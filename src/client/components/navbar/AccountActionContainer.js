import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { refreshCurrentUser } from '../auth/duck/authActions';
import AccountAction from './AccountAction';

const mapDispatchToProps = dispatch => ({
    refresh: () => dispatch(refreshCurrentUser()),
});

const mapStateToProps = state => {
    const { auth } = state;
    return {
        auth,
    };
};

const AccountActionContainer = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AccountAction)
);

export default AccountActionContainer;
