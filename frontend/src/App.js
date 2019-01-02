// =================================== //
// TODO: 
// 
// - Fix warning/errors
// 
// - Re-render posts according to upvote count
// - Fix styling
// = Fix linking routes
// - 
// =================================== //
// =================================== //
// Done: 
// - FIX UPVOTE SYSTEM TO DATABASE!!!!
// - Dynamic post date (Submitted By)
// - 
// -
// - 
// = 
// - 
// =================================== //

import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import axios from "axios";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import { FaReddit, FaRedditAlien } from "react-icons/fa";

function Routes(){
    return(
        <Router>
            <div>
                <Route exact path='/' component={App}/>
                <Route path="/new" component={SubmitPost}/>
            </div>
        </Router>
    );
}
class Header extends React.Component{
  render(){
    return(
      <div className="header">
        <div className="reddit-clone">
          <i><FaReddit/></i>
          <p > reddit-clone </p>
        </div>
        
        <p className="sign-up" onClick={() =>{alert("COMING SOON")}}> Sign Up</p>
        <p className="log-in" onClick={() =>{alert("COMING SOON")}}> Log in</p>
      
      </div>

    )
  }
}
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

class Post extends React.Component{
    state={
      votes: this.props.votes,
    }
    handleUpVote= () => {
      this.updateDbData(this.props.mID, this.state.votes+1);
      this.setState({votes: this.state.votes+1});
    }
    handleDownVote= () => {
      this.updateDbData(this.props.mID, this.state.votes-1);
      this.setState({votes: this.state.votes-1});
    }
    updateDbData = (updateId, updateToApply) => {
      // console.log(updateId);
      axios.post('/api/updateData', {
        id: updateId,
        update: {votes: updateToApply}
      })
      .then(function(res){
        console.log(res);
      })
      .catch(function(err){
        console.log(err);
      })

    };
    // TODO: Make date DYNAMIC and icons for
    // upvote/downvote and have voting system!!
    render(){
        const date = new Date(this.props.date).toDateString();
        return(
            <div>
                <div className="post">
                    <div className="upvote"> 
                      <MdArrowDropUp className="buttons" onClick={this.handleUpVote}/> 
                    </div>
                    <div className="votes"> {this.state.votes} </div>
                    <div className="downvote"> 
                      <MdArrowDropDown className="buttons" onClick={this.handleDownVote}/>
                    </div>
                    <div className="title"> {this.props.title} </div>
                    <div className="submitted">Submitted {date}</div>
                </div>
                <hr/>
            </div>
 

        )
    }
}

class HomeBox extends React.Component{
  state = {
    redirect: false,
    target: "",
  }
  handleRedirectToAllPosts = () => {
    this.setState({redirect: true, target: "/", });
  }

  handleRedirectToCreatePost = () => {
    this.setState({redirect: true, target: "/new", });
  }
  renderRedirect = () => {

    if(this.state.redirect){
      return <Redirect to={this.state.target}/>
    }
  }
  render(){
    return(
      
      <div id="home-box" className="side-box">
       {this.renderRedirect()}
        <h1 id="side-logo"> <FaRedditAlien/> </h1>
        <div id="button-div">
          <button id="posts-btn" className="nav-buttons" onClick={this.handleRedirectToAllPosts}>  All Posts  </button>
          <button id="create-btn" className="nav-buttons" onClick={this.handleRedirectToCreatePost}> Create Post   </button>
        </div>

      </div>
    )
  }
}

class ProfileBox extends React.Component{
  render(){
    return(
      <div id="profile-box" className="side-box">
        <h1>Andy Le</h1>
        <ul>
     
          <li> 
            <a href="https://leal1.github.io/" target="_blank" rel="noopener noreferrer">
              Personal Portfolio
            </a>
          </li>
          <li> 
            <a href="https://www.linkedin.com/in/leal1/" target="_blank" rel="noopener noreferrer">
              Connect on LinkedIn
            </a>
          </li>
          <li> 
            <a href="https://github.com/leal1" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>          
        </ul>

      </div>
    )
  }
}

class SideBox extends React.Component{
  render(){
    return(
      <div id="side-div" className="float-right">
        <HomeBox/>
        <ProfileBox/>
      </div>
    )
  }
}

class App extends React.Component{
    state = {
      data: [],
      intervalSet: false,
      title: "",
    }
    // When the component mounts, periodically check for changes in db
    // and re-renders data
    componentDidMount(){
      this.getDbData();
      if(!this.state.intervalSet){
        let interval = setInterval(this.getDbData, 1000);
        this.setState({intervalSet: interval});
      }
    }
    // When component unmounts, clear interval
    componentWillUnmount(){
      if(this.state.intervalSet){
        clearInterval(this.state.intervalSet);
        this.setState({intervalSet: null});
      }
    }
    // Gets data from DB with back end api
    getDbData = () => {
      fetch("/api/getData")
        .then(data => data.json())
        // .then(res => res.text())
        // .then(text => console.log(text))
        .then(res => this.setState({data: res.data}));
    };
  

    render(){
        
        const {data} = this.state;
        const posts = data.map((dat, i) => (<Post key = {i} title={dat.title} votes={dat.votes} date={dat.added} mID={dat._id}/>))
        return(
          <div>
            <Header/>
            <div >
              <SideBox/>
              <div className="container">
                {posts}
              </div>


            </div>
          </div>
   
            
         
        )
    }
}



export default Routes;