import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { getSession, resetSession } from "./../../ducks/reducer";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import "../Header/Header.css";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      profPic: "",
      firstName: "",
      lastName: ""
    };
  }

  componentDidMount = () => {
    this.getUser();
    this.props.getSession();
  };
  getUser() {
    axios.get("/api/session").then(res => {
      this.setState({
        id: res.data.id,
        profPic: res.data.profilePic,
        firstName: res.data.firstName,
        lastName: res.data.lastName
      });
    });
  }

  logout() {
    axios.delete("/api/logout").then(res => {
      this.props.resetSession();
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

  myProfile() {
    this.props.history.push(`/myProfile/${this.state.id}`);
  }

  render() {
    const { profPic, firstName, lastName } = this.state;
    return (
      <footer>
        <nav className="bar">
          <Link to="/home">
            <button>Home</button>
          </Link>
          <button onClick={() => this.myProfile()}>My Profile</button>
          <button onClick={() => this.logout()}>Logout</button>
        </nav>
        <div className="header-prof">
          <img src={profPic} alt="oops" className="profilepic-header" />
          <h2>
            {firstName} {lastName}
          </h2>
        </div>
      </footer>
    );
  }
}

export default connect(null, { resetSession, getSession })(withRouter(Footer));
