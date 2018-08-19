import { connect } from 'react-redux';

import { login } from './duck/authActions';
import Login from './Login';

const mapDispatchToProps = dispatch => ({
    login: credentials => dispatch(login(credentials)),
});

const mapStateToProps = state => {
    const { auth } = state;
    return {
        auth,
    };
};

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default LoginContainer;
