import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Message, Segment, Header, Grid, Icon } from 'semantic-ui-react';

export class Signup extends Component {
    static propTypes = {
        signup: PropTypes.func.isRequired,

        auth: PropTypes.shape({
            authError: PropTypes.shape({
                response: PropTypes.shape({
                    status: PropTypes.number.isRequired,
                }).isRequired,
            }),
        }).isRequired,
    };

    state = {
        isLoading: false,
        username: '',
        password: '',
        passwordConf: '',
        errMessage: '',
    };

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    };

    submit = () => {
        const { username, password, passwordConf } = this.state;
        const { signup } = this.props;

        signup({ username, password, passwordConf });
    };

    errorMessage = () => {
        const { errMessage } = this.state;
        const {
            authError: { response: { status } } = { response: { status: 0 } },
        } = this.props;

        if (errMessage) return errMessage;

        switch (status) {
            default:
            case 401:
                return 'Login failed, please verify your credentials';
        }
    };

    render() {
        const {
            isLoading,
            username,
            password,
            passwordConf,
            errMessage,
        } = this.state;
        const { authError } = this.props;

        const error = !!errMessage || !!authError;

        return (
            <Grid verticalAlign="middle" centered>
                <Grid.Column width="4">
                    <Header textAlign="center" icon>
                        <Icon name="settings" />
                        Your app name here
                    </Header>

                    <Form
                        loading={isLoading}
                        error={error}
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
                                content={this.errorMessage()}
                            />
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Signup;
