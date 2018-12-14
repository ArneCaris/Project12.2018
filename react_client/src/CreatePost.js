import React, { Component } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert2';
import { FormGroup, Input, Button } from 'reactstrap';
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

            if(userContentLength > 255) {
                document.getElementById('inputContent').style.height = '300px';
            }
            if(userContentLength < 255) {
                document.getElementById('inputContent').style.height = '225px';
            }

            if(userTitleLenght != null){
                this.setState({Title: userTitle});
            }   else {
                this.setState({Title: ''});
            }

            if(userContentLength != null){
                this.setState({Content: userContent});
            }   else {
                this.setState({Content: ''});
            }
        };

        handleSubmit = event => {
            event.preventDefault();

            var error = false;
            const { ID, UserID, Title, Content, Category, isPrivate } = this.state;

            if( this.state.Title && this.state.Content && this.state.isPrivate && this.state.Category){
                axios.post('http://localhost:3000/posts', { ID, UserID, Title, Content, Category, isPrivate })
                .then(res => {
                if(res.statusText == "OK"){
                    const toast = swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    });
                    toast({
                        type: 'success',
                        title: 'Post Created Successfully!'
                    });
                } else {
                    const toast = swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    });

                    toast({
                        type: 'error',
                        title: 'Something Went Wrong!'
                    });
                }
            });
            } else {
                error = true;
                const toast = swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });

                toast({
                    type: 'error',
                    title: 'Every Field Needs To Be Filled!'
                });
                }  
                if (error === false) {

                    setTimeout(
                        function() {
                            this.props.history.push('/')
                        }
                        .bind(this),
                        1500
                    ); 
                    
                }

            };
    
           
            
        render() {

        return (
            <div>
                <br/>
                <form onSubmit={this.handleSubmit}>
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
                        <input onChange={this.onChange} type="radio" value="0" name="isPrivate" />
                        <span className="checkmark"></span>
                    </label>
                    
                    <label className="ChackboxContainer">Yes
                        <input onChange={this.onChange} type="radio" value="1" name="isPrivate"/>
                        <span className="checkmark"></span>
                    </label>
                </FormGroup>
                    <div>
                    <Button className="btn-success" type="submit">
                        Publish
                    </Button>

                    </div>

                </form>
            </div>
        );
    }
}
export default CreatePost;