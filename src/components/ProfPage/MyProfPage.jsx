import React, { Component } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { GridLoader } from "react-spinners";
import { v4 as randomString } from "uuid";
import ChatRail from "../Chat/ChatRail";
import EditProf from "./EditProf";
import "./ProfPage.css";

class MyProfPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      profPic: "",
      coverPic: "",
      firstName: "",
      lastName: "",
      bio: "",
      toggle: false
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo() {
    axios.get(`/api/userInfo/${this.props.match.params.id}`).then(res => {
      // console.log("hit", res.data[0]);
      this.setState({
        id: this.props.match.params.id,
        profPic: res.data[0].prof_pic,
        coverPic: res.data[0].cover_pic,
        firstName: res.data[0].first_name,
        lastName: res.data[0].last_name,
        bio: res.data[0].bio
      });
    });
  }

  toggleEdit() {
    this.setState({
      toggle: !this.state.toggle
    });
    // console.log(this.state.id);
    
  }

  render() {
    const {
      id,
      coverPic,
      toggle,
      firstName,
      lastName,
      bio,
      profPic
    } = this.state;
    return (
      <div className="ProfPage">
        <div className="mainBox" key={id}>
          <div className="userPics">
            <img src={coverPic} alt="oops" className="coverPic" />
            {!toggle ? (
              <button
                className="profEdit-button"
                onClick={() => this.toggleEdit()}
              >
                Edit Info
              </button>
            ) : (
              <EditProf
                id={id}
                coverPic={coverPic}
                firstName={firstName}
                lastName={lastName}
                bio={bio}
                profPic={profPic}
                closePopup={() => this.toggleEdit()}
              />
            )}
            <img src={profPic} alt="oops" className="profPic" />
          </div>
          <div className="userStuffs">
            <h2>
              {firstName} {lastName}{" "}
            </h2>
            <h3>{bio}</h3>
          </div>
          <div className="lowerBox"></div>

          {/* <div className='chat'>
        <ChatRail/>
      </div> */}
        </div>
      </div>
    );
  }
}

export default MyProfPage;
