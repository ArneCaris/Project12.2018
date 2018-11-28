import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';

class Wholepost extends Component {
    render() {
        return (
            <div>
            <Jumbotron>
                <h1 className="display-3">Hiiohoi halojatapäivää!</h1>
                <p className="lead">liirum laarum</p>
                <hr className="my-2" />
                <p>text here / tekstiä tässä</p>
                <p className="lead">
                <Button color="primary">nappula</Button>
                </p>
            </Jumbotron>
            </div>
        );
    }
}

export default Wholepost;