import React, { Component } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { GridLoader } from "react-spinners";
import { v4 as randomString } from "uuid";
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
      toggle: false,
      isUploading: false
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo() {
    axios.get(`/api/userInfo/${this.props.match.params.id}`).then(res => {
      console.log("hit", res.data[0]);
      this.setState({
        id: res.data[0].id,
        profPic: res.data[0].prof_pic,
        coverPic: res.data[0].cover_pic,
        firstName: res.data[0].first_name,
        lastName: res.data[0].last_name,
        bio: res.data[0].bio
      });
    });
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
        {this.state.toggle ? null : 
        <div className="editProfBox">
          
        </div>
        }
        <div className="mainBox" key={id}>
          <div className="userPics">
            <img src={coverPic} alt="oops" className="coverPic" />
            {toggle === false ? (
              <button onClick={() => this.setState({ toggle: true })}>
                Edit Info
              </button>
            ) : (
              <button onClick={() => this.setState({ toggle: false })}>
                Confirm Changes
              </button>
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
        </div>
      </div>
    );
  }
}

export default MyProfPage;
