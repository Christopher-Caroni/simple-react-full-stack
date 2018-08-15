import { connect } from 'react-redux';
import { refreshCurrentUser, login } from '../actions/Auth/authActions';
import App from '../components/App';

const mapDispatchToProps = dispatch => ({
    refreshUser: () => dispatch(refreshCurrentUser()),
    login: user => dispatch(login(user)),
});

const mapStateToProps = state => {
    console.dir(state);
    const { auth } = state;
    return {
        auth,
    };
};

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppContainer;
