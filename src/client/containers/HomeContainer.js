import { connect } from 'react-redux';

import { login, refreshCurrentUser } from '../components/auth/duck/authActions';
import Home from '../components/Home';

const mapDispatchToProps = dispatch => ({
    refreshUser: () => dispatch(refreshCurrentUser()),
    login: user => dispatch(login(user)),
});

const mapStateToProps = state => {
    const { auth } = state;
    return {
        auth,
    };
};

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default HomeContainer;
