import React, { Component } from 'react';

class RemoveButton extends Component {

    deletePost = ID => {
        this.props.removePost(ID);
    };

    render() {
        return (
            <div>
                {this.props.value}
                <button onClick ={() => this.deletePost(this.props.ID)}>Hide</button>          
            </div>
        );
    }
}

export default RemoveButton;