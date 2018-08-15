import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import '../app.css';
import '../../../semantic/dist/semantic.min.css';
import ReactImage from '../react.png';

export default class App extends PureComponent {
    static propTypes = {
        auth: PropTypes.shape({
            authenticated: PropTypes.bool.isRequired,
            loggingIn: PropTypes.bool.isRequired,
            user: PropTypes.shape({
                username: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
    };

    render() {
        const {
            auth: {
                authenticated,
                loggingIn,
                user: { username },
            },
        } = this.props;

        let text;
        if (authenticated) {
            text = username
                ? `Bienvenue ${username}`
                : `Erreur de récupération de votre pseudo`;
        } else if (loggingIn) {
            text = 'Connexion en cours...';
        } else {
            text = `Vous n'êtes pas connecté`;
        }

        return (
            <div>
                <h1>{text}</h1>
                <img src={ReactImage} alt="react" />
            </div>
        );
    }
}
