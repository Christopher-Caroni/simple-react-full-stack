import '../../../semantic/dist/semantic.min.css';
import '../app.css';

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Button, Container, Segment } from 'semantic-ui-react';

import ReactImage from '../react.png';

export default class App extends PureComponent {
    static propTypes = {
        auth: PropTypes.shape({
            authenticated: PropTypes.bool.isRequired,
            authInProgress: PropTypes.bool.isRequired,
            user: PropTypes.shape({
                username: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,

        refreshUser: PropTypes.func.isRequired,
        login: PropTypes.func.isRequired,
    };

    render() {
        const {
            auth: {
                authenticated,
                authInProgress,
                user: { username },
            },
            refreshUser,
            login,
        } = this.props;

        let text;
        if (authenticated) {
            text = username
                ? `Bienvenue ${username}`
                : `Erreur de récupération de votre pseudo`;
        } else if (authInProgress) {
            text = 'Connexion en cours...';
        } else {
            text = `Vous n'êtes pas connecté`;
        }

        return (
            <Container>
                <Segment>
                    <h1>{text}</h1>
                    <Button
                        content="Refresh login info"
                        onClick={refreshUser}
                    />
                </Segment>
                <Segment>
                    <img src={ReactImage} alt="react" />
                </Segment>
            </Container>
        );
    }
}
