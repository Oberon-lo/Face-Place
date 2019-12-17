import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  function sendIt(){
    axios.post('/api/send')
    .then(
      alert('Email Sent!!!')
    )
  }
  return (
    <div className="App">
      <button onClick = {()=> sendIt()}>Send Email</button>
    </div>
  );
}

export default App;
