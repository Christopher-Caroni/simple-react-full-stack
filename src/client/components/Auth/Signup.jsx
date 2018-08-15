import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Message } from 'semantic-ui-react';

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
        errMessage: '',
    };

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    };

    submit = () => {
        const { username, password } = this.state;
        const { signup } = this.props;

        if (!!username || !!password) {
            this.setState({ errMessage: 'Les champs sont incomplets' });
            return;
        }

        signup({ username, password });
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
                return 'Authentification échouée. Vérifiez votre saisie';
        }
    };

    render() {
        const { isLoading, username, password, errMessage } = this.state;
        const { authError } = this.props;

        const error = !!errMessage || !!authError;

        return (
            <div>
                <Form loading={isLoading} error={error} onSubmit={this.submit}>
                    <Form.Input
                        fluid
                        label="Pseudo"
                        placeholder="Entrez votre pseudo"
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        fluid
                        label="Mot de passe"
                        placeholder="Entrez votre mot de passe"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                    />

                    <Message header="Erreur" content={this.errorMessage()} />
                </Form>
            </div>
        );
    }
}

export default Signup;
