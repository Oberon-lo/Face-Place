import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import routes from './routes.js';
import Footer from './components/Footer/Footer';
import { withRouter } from 'react-router-dom';

function App(props) { 
  return (
    <div className = 'App'>
      <div className = 'body'>
      { props.location.pathname === '/' || props.location.pathname === '/register' ? null : <Header/> }
      {routes}
      </div>
      { props.location.pathname === '/' || props.location.pathname === '/register' ? null : <Footer/> }
    </div>
  );
}

export default withRouter(App);