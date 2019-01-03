import React from "react";
import axios from "axios";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";

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

export default Post;