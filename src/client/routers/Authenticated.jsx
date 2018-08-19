import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';

const Authenticated = ({
    auth: { authenticated, loginInProgress },
    component: TargetComponent,
    render,
    ...rest
}) => (
    <Route
        {...rest}
        render={props => {
            if (loginInProgress) return <Loader active>Logging in...</Loader>;
            if (authenticated) {
                if (TargetComponent) {
                    return <TargetComponent {...props} />;
                }
                return render();
            }
            return (
                <Redirect
                    to={{
                        pathname: '/web/login',
                        state: { from: props.location },
                    }}
                />
            );
        }}
    />
);

Authenticated.propTypes = {
    auth: PropTypes.shape({
        loginInProgress: PropTypes.bool.isRequired,
        authenticated: PropTypes.bool.isRequired,
    }).isRequired,
};

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => {
    const { auth } = state;
    return {
        auth,
    };
};

const AuthenticatedContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Authenticated);

export default AuthenticatedContainer;
