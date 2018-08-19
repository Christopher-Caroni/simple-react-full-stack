import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

export default class ExcludeRoute extends Component {
    static propTypes = {
        component: PropTypes.node,
        content: PropTypes.func,
        exclusions: PropTypes.arrayOf(PropTypes.string),
        inclusions: PropTypes.arrayOf(PropTypes.string),
    };

    static defaultProps = {
        component: undefined,
        content: () => null,
        exclusions: [],
        inclusions: [],
    };

    excludedRoutes = () => {
        const { exclusions } = this.props;
        return exclusions.map(exclusion => (
            <Route
                key={`exlusion_${exclusion}`}
                exact
                path={exclusion}
                render={() => null}
            />
        ));
    };

    includedRoutes = () => {
        const { inclusions } = this.props;
        return inclusions.map(inclusion => this.child(inclusion));
    };

    child = route => (
        <Route
            key={`exlusion_${route}`}
            exact
            path={route}
            {...this.target()}
        />
    );

    target = () => {
        const { component: TargetComponent, content } = this.props;
        if (TargetComponent) {
            return { component: TargetComponent };
        }
        return { render: content };
    };

    render() {
        return (
            <Switch>
                {this.excludedRoutes()}
                {this.includedRoutes()}
                {this.child()}
            </Switch>
        );
    }
}
