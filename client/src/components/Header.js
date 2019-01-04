import React from "react";
import { FaReddit } from "react-icons/fa";


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

export default Header;