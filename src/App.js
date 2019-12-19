import React from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/Header/Header';
import routes from './routes';
import Footer from './components/Footer/Footer';

function App() {

  return (
    <div className="App">
      <Header/>
      {routes}
      <Footer/>
    </div>
  );
}

export default App;
