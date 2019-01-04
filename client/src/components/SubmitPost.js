import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import { HomeBox} from "./SideBoxes.js";
import Header from "./Header.js";

class SubmitPost extends React.Component{
    constructor(props){
        super(props);
        this.state = {title: "", redirect: false};
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleChange = (e) =>{
        // Updates state when user types into input box
        this.setState({title: e.target.value});
    }

    handleSubmit = (e) =>{
        // Prevents refreshing page and Posts
        // data to DB and redirects
        e.preventDefault();
        this.setState({title: "", redirect: true} );
        this.putDbData(this.state.title);
    }
    // Put data into DB with back end api
    putDbData =  title => {

      //console.log("putting " + title);
      axios.post("/api/putData", {
        title: title
      })
      .then(function(res) {
        console.log(res);
      })
      .catch(function(err){
        console.log(err);
      });
    };

    render(){
        // Redirects to posts if submit, if not show form
        if(this.state.redirect){
     
          
          return(<Redirect to="/"/>);
        }
        return(
            <div >
              <Header/>
              <div className="float-right" id="create-side-box">
                <HomeBox/>
              </div>
              <div className="container" >
              <h1> Create Post!</h1>
                <form id="form-container"> 
                  
                  <input id="form-input" type="text"  placeholder="Post Title"  onChange={this.handleChange}/>
                  <button id="form-submit" onClick={this.handleSubmit}> POST </button>
                </form>
              </div>

            </div>
        )
    }
}

export default SubmitPost;