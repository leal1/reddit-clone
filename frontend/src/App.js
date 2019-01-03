// =================================== //
// TODO: 
// - Re-render posts according to upvote count
// - Authentication/Authorization using
// =================================== //
import React from "react";
import { BrowserRouter as  Router, Route } from "react-router-dom";
import App from "./components/App.js";

import SubmitPost from "./components/SubmitPost.js"




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



export default Routes;