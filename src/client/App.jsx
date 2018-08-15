import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './app.css';
import ReactImage from './react.png';

export default class App extends PureComponent {
    static propTypes = {
        username: PropTypes.string.isRequired,
    };

    render() {
        const { username } = this.props;

        return (
            <div>
                {username ? (
                    <h1>Hello {username}</h1>
                ) : (
                    <h1>Loading.. please wait!</h1>
                )}
                <img src={ReactImage} alt="react" />
            </div>
        );
    }
}
