import React, { Component } from 'react';
import axios from 'axios'

class Register extends Component {
  constructor(props) {
    super(props);
    
  }


  sendIt(){
    axios.post('/api/send')
    .then(
      alert('Email Sent!!!')
    )
  }
  
  render() {
    return (
      <div>
        
      <button onClick = {()=> this.sendIt()}>Send Email</button>
      </div>
    );
  }
}

export default Register;