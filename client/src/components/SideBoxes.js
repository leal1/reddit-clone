import React from "react";
import { FaRedditAlien } from "react-icons/fa";
// eslint-disable-next-line
import {BrowserRouter as Redirect, Link} from "react-router-dom";


class HomeBox extends React.Component{
    render(){
      return( 
        <div id="home-box" className="side-box">
          <h1 id="side-logo"> <FaRedditAlien/> </h1>
          <div id="button-div">
            <button id="posts-btn" className="nav-buttons" > <Link style={{display: 'block', width: '100%'}} to="/" > All Posts </Link> </button>
            <button id="create-btn" className="nav-buttons" > <Link style={{display: 'block', width: '100%'}} to="/new">Create Post </Link>  </button>
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

export {
    SideBox,
    HomeBox,
    ProfileBox}