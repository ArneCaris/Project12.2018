import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';


class NavigationButton extends Component {

    render() {
        return (
            <div>

                <Link
                to={`/Wholepost/${this.props.ID}`}
                >Open</Link>

            </div>
        );
    }
}

export default NavigationButton;