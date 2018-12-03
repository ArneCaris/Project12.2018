import React, { Component } from 'react';
import axios from 'axios';

class ShareEntry extends Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Owner = this.Owner.bind(this);
        this.state = {
            ID: '',
            PostID: '',
            Owner: '',
            Viewer: ''
        };

        super();
            this.getUsers = this.getUsers.bind(this);
            this.state = {
              Users: []
            }; 
        }

        getUsers() {
            const username = document.getElementById("username").value;
            const loginUsername = JSON.parse(sessionStorage.getItem("userUsername"));
            axios.get(`http://localhost:3000/Users/` + username).then(res => {
              const Users = res.data;
              this.setState({ Users });
             
              var Viewer = this.state.Users.map(user => (user.username));

              if( Viewer == username && Viewer != loginUsername ){
                document.getElementById("share").disabled = false;
              } else {
                document.getElementById("share").disabled = true;
                }
            
            });
            
          } 

        onChange = e => {
            const state = this.state;
            state[e.target.name] = e.target.value;
            this.setState(state);
        };

        Owner() {
            const state = this.state;
            state["Owner"] = JSON.parse(sessionStorage.getItem("userUsername"));
            this.setState(state);
            console.log(this.state.Owner);
        };
    
    handleSubmit = event => {
        event.preventDefault();
        this.Owner();
        const { PostID, Owner, Viewer } = this.state;

        axios
            .post('http://localhost:3000/Shared/', { PostID, Owner, Viewer })
            .then(res => {
            console.log(res);
            console.log(res.data);
            });
        };


    render() {
        return (

            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>FOR TEST PURPOSES POST ID:
                    <input type="number" name="PostID" placeholder="PostID" onChange={this.onChange}></input>
                    </label>
                    <br/>
                    <label>Share entry with:
                    <input onKeyUp={this.getUsers} onChange={this.onChange} type="text" name="Viewer" placeholder="type in username" id="username"></input>
                    </label> 
             
                    <button id="share" onSubmit={this.handleSubmit} type="submit" disabled>Share</button>
                </form>

            </div>

           

            
        );
    }
}

export default ShareEntry;