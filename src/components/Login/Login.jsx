import React, { Component } from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import {getSession} from '../../ducks/reducer';
import axios from "axios";
import Swal from "sweetalert2";
import "./login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  async login() {
    const { email, password } = this.state;
    await axios
      .post("/api/login", { email, password })
      .then(res => {
        this.props.getSession();
        Swal.fire({
          icon: "success",
          title: "Logged in!",
          text: res.data.message,
          confirmButtonText: "Continue",
          timer: 1000,
          timerProgressBar: true
        }).then(result => {
          if (result.value) {
            this.props.history.push("/home");
            window.location.reload();
          } else if (result.dismiss === Swal.DismissReason.timer) {
            this.props.history.push("/home");
            window.location.reload();
          }
        });
      })
      .catch(err => {
        Swal.fire({
          icon: "error",
          text: "something went wrong"
        });
      });
  }

  handleChange = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.login();
    }
  };

  render() {
    return (
      <div className="login">
        {/* <img src="https://helios-devmountain-group-project.s3-us-west-1.amazonaws.com/jack-millard-8F885lcKzBQ-unsplash.jpg" alt="background" className="background"/> */}
        <form className="login-form">
          <h1 className="welcome"> Welcome to Face Place. </h1>
          <input
            onChange={e => this.handleChange("email", e.target.value)}
            value={this.state.email}
            placeholder="Email"
            type="email"
          />
          <br />
          <br />
          <input
            onChange={e => this.handleChange("password", e.target.value)}
            onKeyPress = {this.handleKeyPress}
            value={this.state.password}
            placeholder="Password"
            type="password"
          />
          <br />
          <br />
          <button data-testid = 'login' onClick={() => this.login()} className="loginButton">
            Login
          </button>
          <br />
          <br />
          <span>Not a member?</span>
          <br />
          <Link to="/register">Register here!</Link>
        </form>
      </div>
    );
  }
}

export default connect(null, {getSession})(Login);