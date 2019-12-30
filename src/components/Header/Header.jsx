import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Header.css";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state ={
      profPic: '',
      firstName: '',
      lastName: '',
    }
  }

  componentDidMount = () => {
  axios.get("/api/session").then(res => {
    this.setState({
      profPic: res.profilePic,
      firstName: res.firstName,
      lastName: res.lastName
    })
  })
  }
  
  render() {
    const {profPic, firstName, lastName} = this.state
    return (
      <div className="header">
        <div className="logo">
          <Link to = '/'>
        <img className = "logo-pic" src="https://helios-devmountain-group-project.s3-us-west-1.amazonaws.com/SmugMug-icon.png" alt="oops"/> 
          </Link>
        <h1> FacePlace! </h1>
        </div>
        <nav>
        <Link to="/home">
          <button>Home</button>
        </Link>
        <Link to="/profile">
          <button>My Profile</button>
        </Link>
        </nav>
        <div className="header-prof">
          <img src={profPic} alt="oops" className="profilepic-header"/>
        <h2>{firstName} {lastName}</h2>
        </div>
      </div>
    );
  }
}
