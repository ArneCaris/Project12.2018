import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';
class Wholepost extends Component {
    render() {
        return (
            <div>
            <Jumbotron>
                <h2 className="display-5">{this.props.Title}</h2>
                <h4 className="lead">{this.props.Content}</h4>
                <hr className="my-2" />
                <p><i>ID:{this.props.ID}</i></p>
                <p className="lead">
                </p>
            </Jumbotron>
            </div>
        );
    }
}

export default Wholepost;