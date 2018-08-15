import React, { Component } from 'react';
import App from './App';

export default class AppContainer extends Component {
    state = { username: null };

    componentDidMount() {
        fetch('/api/getUsername')
            .then(res => res.json())
            .then(user => this.setState({ username: user.username }));
    }

    render() {
        const { username } = this.state;

        return <App username={username} />;
    }
}
