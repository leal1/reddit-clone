import React from "react";
import Header from "./Header.js";
import {SideBox} from "./SideBoxes";
import Post from "./Posts.js"

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

export default App;