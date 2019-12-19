import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      first_name: '',
      last_name: '',
      password1: '',
      password2: ''
    }
  }
  handleChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  sendIt(){
    axios.post('/api/send')
    .then(
      alert('Email Sent!!!')
    )
  }
  
  render() {
    const { email, first_name, last_name, password1, password2 } = this.state;
    return (
      <div>
        <input
          value={email}
          onChange={e => this.handleChange('email', e.target.value)}
          placeholder="Email"
          type="text"
        />
        <hr/>
        <input
          value={first_name}
          onChange={e => this.handleChange('first_name', e.target.value)}
          placeholder="First name"
          type="text"
        />
        <hr/>
        <input 
        value={last_name}
        onChange={e => this.handleChange('last_name', e.target.value)}
        placeholder="Last name"
        type="text"/>
        <hr/>
        <input
          value={password1}
          onChange={e => this.handleChange('password1', e.target.value)}
          placeholder="Password"
          type="password"
        />
        <hr/>
        <input
          value={password2}
          onChange={e => this.handleChange('password2', e.target.value)}
          placeholder="Retype password"
          type="password"
        />
        <hr/>
      <button onClick = {()=> this.sendIt()}>Send e-mail</button>
      Send Confirmation e-mail
      <hr/>
      <Link to='/'>
        Already registered? Login here!
      </Link>
      </div>
    );
  }
}

export default Register;