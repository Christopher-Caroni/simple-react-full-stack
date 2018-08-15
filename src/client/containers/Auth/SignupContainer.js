import { connect } from 'react-redux';

import { signup } from '../../actions/Auth/authActions';
import { Signup } from '../../components/Auth/Signup';

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
