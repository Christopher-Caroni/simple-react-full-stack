import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Dimmer, Loader, Header } from 'semantic-ui-react';

const AuthenticatedRouter = ({
    auth: { authenticated, loginInProgress },
    component: TargetComponent,
    render,
    ...rest
}) => (
    <Route
        {...rest}
        render={props => {
            if (loginInProgress)
                return (
                    <Dimmer active page>
                        <Header as="h2" icon inverted>
                            <Loader active>Logging in...</Loader>
                        </Header>
                    </Dimmer>
                );
            if (authenticated) {
                if (TargetComponent) {
                    return <TargetComponent {...props} />;
                }
                return render();
            }
            console.error(
                'Tried to access authenticated page but not authenticated'
            );
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

AuthenticatedRouter.propTypes = {
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

const Authenticated = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthenticatedRouter);

export default Authenticated;
