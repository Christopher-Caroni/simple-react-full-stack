import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AccountAction from './AccountAction';

const mapDispatchToProps = dispatch => ({});

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
