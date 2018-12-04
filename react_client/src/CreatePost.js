import React, { Component } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer ,toast } from 'react-toastify';
import { FormGroup, Input } from 'reactstrap';

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
                LastEdit: '',
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
        };

        handleSubmit = event => {
            event.preventDefault();
            var x=new Date();
            var day=x.getDate();
            if (day<10) day="0"+day;
            var month = x.getMonth() + 1;
            var date=x.getFullYear()+"-"+month+"-"+day;
            console.log(date);
            this.setState({LastEdit: date});
            
            const { ID, UserID, Title, Content, Category, isPrivate  } = this.state;
            axios
                .post('http://localhost:3000/posts', { ID, UserID, Title, Content, Category, isPrivate })
                .then(res => {
                console.log(this.state.LastEdit);
                console.log(res.data);
                });
            };
    
            closeAfter3 = () => {
                  toast("Post created Successfully!", { autoClose: 3000 });
            }
        render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>

                <ToastContainer autoClose={3000}/>

                <FormGroup>
                    <label>UserID:</label>
                    <Input type="number" className="form-input" name="UserID" onChange={this.onChange} required/>
                </FormGroup>
                <FormGroup>
                    <label>Title</label>
                    <Input type="text" className="form-input" name="Title" onChange={this.onChange} required/>
                </FormGroup>
                <FormGroup>
                    <label>Content</label>
                    <Input type="textarea" className="form-input" name="Content" onChange={this.onChange} required/>
                </FormGroup>
                <FormGroup>
                    <label>Category</label>
                    <Input type="text" className="form-input"  name="Category" onChange={this.onChange} required/>
                </FormGroup>
                <FormGroup>
                    <label>isPrivate?</label>
                    <Input type="number" className="form-input" name="isPrivate" onChange={this.onChange} />
                </FormGroup>

                    {this.state.showButton ?
                    <div className="btns-div">
                    <p>Do you wish to submit this post?</p>
                    <button className="btn-publish" type="submit" onClick={this.closeAfter3}>
                        Publish
                    </button>
                    <button className="btn-discard" onClick={this.hideButton}>
                        Discard
                    </button>
                    </div>
                    :
                    <div className="btns-div">
                    <button className="btn-submit" onClick={this.seeButton}>
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