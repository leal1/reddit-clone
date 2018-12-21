import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './index.css';

function Routes(){
    return(
        <Router>
            <div>
                <Link to="/new"> New Post </Link>
                <Route exact path='/' component={Board}/>

                <Route path="/new" component={submitPost}/>
            </div>

       
        </Router>
    );
}

class submitPost extends React.Component{
    render(){
        return(
            <div class="submitPost">
              <form>
                <label>Title: </label>
                <input type="text" name="title"/>
                <input type="submit" value="Submit!"/>
              </form>

            </div>
        )
    }
}

class Post extends React.Component{
 
    render(){
        return(
            <div className="post">
                 <hr/>
                <div className="upvote"> upvote </div>
                <div className="downvote"> downvote </div>
                <div className="post-body">
                    <h1 className="title"> {this.props.title} </h1>
                    <p className="submitted">Submitted 10 days ago...</p>
                </div>

            </div>

        )
    }
}

class Board extends React.Component{
    render(){
        let posts = [];
        for(let i=1; i < 11; i++){
            posts.push(<Post title={"Post Title " + i.toString()}/>)
        }
        return(
            posts
        )
    }
}

// ========================================

ReactDOM.render(
    <Routes/>,
    document.getElementById('root')
  );