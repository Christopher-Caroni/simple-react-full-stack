import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Message, Segment, Header, Grid, Icon } from 'semantic-ui-react';

export default class Login extends Component {
    static propTypes = {
        login: PropTypes.func.isRequired,

        auth: PropTypes.shape({
            loginError: PropTypes.shape({
                msg: PropTypes.string.isRequired,
                usernameError: PropTypes.bool,
                passwordError: PropTypes.bool,
            }),
        }).isRequired,
    };

    state = {
        isLoading: false,
        username: '',
        password: '',
    };

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    };

    submit = () => {
        const { username, password } = this.state;
        const { login } = this.props;

        login({ username, password });
    };

    render() {
        const { isLoading, username, password } = this.state;
        const {
            auth: { loginError },
        } = this.props;

        const {
            msg: errorMessage,
            usernameError,
            passwordError,
        } = loginError || {
            noError: true,
            usernameError: false,
            passwordError: false,
        };

        const hasError = !!loginError && !loginError.noError;

        return (
            <Grid verticalAlign="middle" centered>
                <Grid.Column width="4">
                    <Header textAlign="center" icon>
                        <Icon name="settings" />
                        Your app name here
                    </Header>

                    <Form
                        loading={isLoading}
                        error={hasError}
                        onSubmit={this.submit}
                        size="large"
                    >
                        <Segment stacked>
                            <Form.Input
                                fluid
                                icon="user"
                                iconPosition="left"
                                placeholder="Username"
                                type="text"
                                name="username"
                                value={username}
                                error={usernameError}
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                fluid
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                type="password"
                                name="password"
                                value={password}
                                error={passwordError}
                                onChange={this.handleChange}
                            />

                            <Form.Button fluid content="Login" color="teal" />

                            <Message
                                error
                                header="Error"
                                content={errorMessage}
                            />
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}
