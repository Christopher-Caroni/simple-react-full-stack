import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Message, Segment, Header, Grid, Icon } from 'semantic-ui-react';

export class Signup extends Component {
    static propTypes = {
        signup: PropTypes.func.isRequired,

        auth: PropTypes.shape({
            signupError: PropTypes.shape({
                msg: PropTypes.string.isRequired,
            }),
        }).isRequired,
    };

    state = {
        isLoading: false,
        username: '',
        password: '',
        passwordConf: '',
    };

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    };

    submit = () => {
        const { username, password, passwordConf } = this.state;
        const { signup } = this.props;

        signup({ username, password, passwordConf });
    };

    render() {
        const { isLoading, username, password, passwordConf } = this.state;
        const {
            auth: { signupError },
        } = this.props;

        const hasError = !!signupError;
        const errorMessage = hasError ? signupError.msg : 'Unknown error';

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
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                fluid
                                icon="lock"
                                iconPosition="left"
                                placeholder="Confirm your password"
                                type="password"
                                name="passwordConf"
                                value={passwordConf}
                                onChange={this.handleChange}
                            />

                            <Form.Button fluid content="Signup" color="teal" />

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

export default Signup;
