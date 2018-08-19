import { connect } from 'react-redux';

import { signup } from './duck/authActions';
import { Signup } from './Signup';

const mapDispatchToProps = dispatch => ({
    signup: user => dispatch(signup(user)),
});

const mapStateToProps = state => {
    const { auth } = state;
    return {
        auth,
    };
};

const SignupContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup);

export default SignupContainer;
