import '../../../semantic/dist/semantic.min.css';
import '../app.css';

import React from 'react';
import { Image, Segment, Container, Button } from 'semantic-ui-react';

import ReactImage from '../react.png';

const Home = props => {
    const {
        auth: {
            authenticated,
            authInProgress,
            user: { username },
        },
        refreshUser,
    } = props;

    let text;
    if (authenticated) {
        text = username
            ? `Welcome ${username}`
            : `Could not find your username`;
    } else if (authInProgress) {
        text = 'Connecting...';
    } else {
        text = `You are not connected`;
    }

    return (
        <Container>
            <Segment>
                <h1>{text}</h1>
                <Button content="Refresh login info" onClick={refreshUser} />
            </Segment>

            <Segment>
                <Image size="medium" centered src={ReactImage} alt="react" />
            </Segment>
        </Container>
    );
};

export default Home;
