import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { resetSession } from './../../ducks/reducer';
import Swal from "sweetalert2";
import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profPic: "",
      firstName: "",
      lastName: ""
    };
  }

  componentDidMount = () => {
    this.getUser();
  };
  getUser() {
    axios.get("/api/session").then(res => {
      this.setState({
        profPic: res.data.profilePic,
        firstName: res.data.firstName,
        lastName: res.data.lastName
      });
    });
  }

  logout() {
    axios.delete("/api/logout").then(res => {
      resetSession();
      Swal.fire({
        icon: "warning",
        title: "Logged Out.",
        text: res.data.message,
        confirmButtonText: "Continue",
        timer: 1200,
        timerProgressBar: true
      }).then(result => {
        if (result.value) {
          this.props.history.push("/");
          window.location.reload();
        } else if (result.dismiss === Swal.DismissReason.timer) {
          this.props.history.push("/");
          window.location.reload();
        }
      })
    });
  }

  render() {
    const { profPic, firstName, lastName } = this.state;
    return (
      <header>
        <div className="logo">
          <Link to="/home">
            <img
              className="logo-pic"
              src="https://helios-devmountain-group-project.s3-us-west-1.amazonaws.com/anime-face-png-7403-256x256.ico"
              alt="oops"
            />
          </Link>
          <h1>
            <Link to="/home">FacePlace!</Link>
          </h1>
        </div>
        <nav className="bar">
          <Link to="/home">
            <button>Home</button>
          </Link>
          <Link to="/profile">
            <button>My Profile</button>
          </Link>
          <button onClick = {() => this.logout() }>Logout</button>
        </nav>
        <div className="header-prof">
          <img src={profPic} alt="oops" className="profilepic-header" />
          <h2>
            {firstName} {lastName}
          </h2>
        </div>
      </header>
    );
  }
}

export default connect(null, {})(withRouter(Header));
