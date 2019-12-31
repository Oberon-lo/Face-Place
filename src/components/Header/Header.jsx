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
  this.getUser()
  }
  getUser(){
    axios.get("/api/session").then(res => {
      this.setState({
        profPic: res.data.profilePic,
        firstName: res.data.firstName,
        lastName: res.data.lastName
      })
    })
  }
  
  render() {
    const {profPic, firstName, lastName} = this.state
    return (
      <header>
        <div className="logo">
          <Link to = '/'>
        <img className = "logo-pic" src="https://helios-devmountain-group-project.s3-us-west-1.amazonaws.com/anime-face-png-7403-256x256.ico" alt="oops"/> 
          </Link>
        <h1> FacePlace! </h1>
        </div>
        <nav className = 'bar'>
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
      </header>
    );
  }
}
