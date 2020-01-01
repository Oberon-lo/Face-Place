import React, { Component } from "react";
import axios from "axios";
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
        <div className="mainbox">
          <div key={user.id}>
            <div className="mypics">
              <img src={user.cover_pic} alt="oops" className="coverPic" />
            </div>
            <div className="name">
              <div className="userStuffs">
                <img src={user.prof_pic} alt="oops" className="myPic" />
                <h2>
                  {user.first_name} {user.last_name}{" "}
                </h2>
              </div>
              <h3>{user.bio}</h3>
            </div>
          </div>
        </div>
        <div className="lowerBox"></div>
      </div>
    );
  }
}

export default ProfPage;
