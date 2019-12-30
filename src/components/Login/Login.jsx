import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  login = () => {
    const {email, password} = this.state;
    
  }

  handleChange = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  render() {
    return (
      <div>
        <br />
        <input
          onChange={e => this.handleChange('email', e.target.value)}
          value={this.state.email}
          placeholder="Email"
          type="email"
        />
        <br />
        <br />
        <input
          onChange={e => this.handleChange("password", e.target.value)}
          value={this.state.password}
          placeholder="Password"
          type="password"
        />
        <br/>
        <hr />
        <span>Not a member?</span>
        <br />
        <Link to="/register">Register here!</Link>
      </div>
    );
  }
}
