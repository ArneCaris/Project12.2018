import React, { Component } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer ,toast } from 'react-toastify';
import { FormGroup, Input } from 'reactstrap';
import './CreatePost.css'

class CreatePost extends Component {
    
        constructor() {
            super();
            this.onChange = this.onChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.state = {
                ID: '',
                UserID: '',
                Title: '',
                Content: '',
                Category: '',
                isPrivate: '',
                showButtons: false,
            }; 
            this.seeButton = this.seeButton.bind(this);
            this.hideButton = this.hideButton.bind(this);
        }
        seeButton(){
            this.setState({'showButton':true})
        }
        hideButton(){
            this.setState({'showButton':false})
        }

        onChange = e => {
            const state = this.state;
            state[e.target.name] = e.target.value;
            this.setState(state);

            const currUserId = sessionStorage.getItem("userID");
            this.setState({UserID: currUserId});

            var userTitle = document.getElementById('inputTitle').value;
            var userContent = document.getElementById('inputContent').value;

            var userTitleLenght = userTitle.length;
            var userContentLength = userContent.length;
            console.log(userContentLength);

            if(userContentLength > 255) {
                document.getElementById('inputContent').style.height = '300px';
            }
            if(userContentLength < 255) {
                document.getElementById('inputContent').style.height = '225px';
            }

            if(userTitleLenght != null){
                this.setState({Title: userTitle});
            }   else {
                this.setState({TTitle: ''});
            }

            if(userContentLength != null){
                this.setState({Content: userContent});
            }   else {
                this.setState({Content: ''});
            }

            console.log(this.state.Title);
            console.log(this.state.Content);
            console.log(this.state.isPrivate);

        };

        handleSubmit = event => {
            event.preventDefault();


            const { ID, UserID, Title, Content, Category, isPrivate } = this.state;

            if( this.state.Title.length !== 0 && this.state.Content.length !== 0 && this.state.isPrivate.length !== 0){
                axios.post('http://localhost:3000/posts', { ID, UserID, Title, Content, Category, isPrivate })
                .then(res => {
                console.log(res);
                if(res.statusText == "OK"){
                    toast("Post created Successfully!", { autoClose: 3000 });
                } else {
                    toast.error("Something went wrong.", { autoClose: 3000 });
                }
            });
            } else {
                    toast.error("Every field is needs to be filled in.", { autoClose: 3000 });
                }
  
                console.log(this.state);
            
            };
    
           
            
        render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>

                <ToastContainer autoClose={3000}/>
                
                <FormGroup>
                    <label>Title</label>
                    <Input type="text" id="inputTitle" className="form-input" onChange={this.onChange} maxLength='50'/>
                </FormGroup>
                <FormGroup>
                    <label>Content</label>
                    <Input type="textarea" id="inputContent" className="form-input" onKeyUp={this.onChange} />
                </FormGroup>
                <FormGroup>
                    <label required>Category <br/> <br/>
                        <label className="ChackboxContainer">Gaming
                            <input onChange={this.onChange} type="radio" value="Gaming" name="Category"/>
                            <span className="checkmark"></span>
                        </label>
                        <label className="ChackboxContainer">Lifestyle
                            <input onChange={this.onChange} type="radio" value="Lifestyle" name="Category"/>
                            <span className="checkmark"></span>
                        </label>
                        <label className="ChackboxContainer">Vehicles
                            <input onChange={this.onChange} type="radio" value="Vehicles" name="Category"/>
                            <span className="checkmark"></span>
                        </label>
                        <label className="ChackboxContainer">Technology
                            <input onChange={this.onChange} type="radio" value="Technology" name="Category"/>
                            <span className="checkmark"></span>
                        </label>
                    </label>
                </FormGroup>
                <FormGroup>
                <label>Do you want this post to be Private?</label>
                    <br/>

                    <label className="ChackboxContainer">No
                        <input onChange={this.onChange} type="radio" value="false" name="isPrivate" />
                        <span className="checkmark"></span>
                    </label>
                    
                    <label className="ChackboxContainer">Yes
                        <input onChange={this.onChange} type="radio" value="true" name="isPrivate"/>
                        <span className="checkmark"></span>
                    </label>
                </FormGroup>
                    
                    
                    {this.state.showButton ?
                    <div className="btns-div">
                    <p>Do you wish to submit this post?</p>
                    <button className="btn-publish" type="submit">
                        Publish
                    </button>
                    <button className="btn-discard" onClick={this.hideButton}>
                        Discard
                    </button>
                    </div>
                    :
                    <div className="btns-div">
                    <button className="btn-submit" onClick={this.seeButton} name="Proceed">
                        Proceed
                    </button>
                    </div>
                    }
                </form>
            </div>
        );
    }
}
export default CreatePost;