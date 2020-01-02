import React, { Component } from "react";
import axios from "axios";
import ChatRail from '../Chat/ChatRail';
import "./ProfPage.css";

class ProfPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: []
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo() {
    axios.get(`/api/userInfo/${this.props.match.params.id}`).then(res => {
      // console.log("hit", res.data[0]);
      this.setState({
        userInfo: res.data[0]
      });
    });
  }

  render() {
    const user = this.state.userInfo;
    return (
      <div className="ProfPage">
        
        <div className="mainBox" key={user.id}>
          <div className="userPics">
            <img src={user.cover_pic} alt="oops" className="coverPic" />
            
            <img src={user.prof_pic} alt="oops" className="profPic" />
          </div>
            <div className="userStuffs">
              <h2>
                {user.first_name} {user.last_name}{" "}
              </h2>
              <h3>{user.bio}</h3>
            </div>
        </div>
          <div className="lowerBox"></div>

      <div className='chat'>
        <ChatRail/>
      </div>
      </div>
    );
  }
}

export default ProfPage;