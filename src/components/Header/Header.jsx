import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import {connect} from 'react-redux'
import {getSession} from './../../ducks/reducer'
import "./Header.css";

class Header extends Component {
componentDidMount(){
  // getSession()
}

  logout() {
    axios.delete("/api/logout").then(res =>{
      Swal.fire({
        icon: "warning",
        title: res.data.message,
        text: "Come Back Soon!",
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
      });
    });
  }

myProfile(){
this.props.history.push(`/profile/${this.props.user_id}`)
}

  render() {
    const { profPic, firstName, lastName } = this.props;
    return (
      <header>
        <div className="logo">
          <Link to="/">
            <img
              className="logo-pic"
              src="https://helios-devmountain-group-project.s3-us-west-1.amazonaws.com/anime-face-png-7403-256x256.ico"
              alt="oops"
            />
          </Link>
          <h1>
            <Link to="/">FacePlace!</Link>
          </h1>
        </div>
        <nav className="bar">
          <Link to="/home">
            <button>Home</button>
          </Link>
          <Link to="/profile">
            <button>My Profile</button>
          </Link>
          <button onClick={() => this.logout()}>Logout</button>
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

function mapStateToProps(reduxState){
  const { user_id, first_name, last_name, prof_pic} = reduxState
  return {
    user_id, firstName: first_name, lastName: last_name, profPic: prof_pic
  }
}

export default connect()(withRouter(Header));
