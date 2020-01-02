<<<<<<< HEAD
import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import ProfPage from "./components/ProfPage/ProfPage";
import MyProfPage from "./components/ProfPage/MyProfPage";

export default (
  <Switch>
    <Route path="/home" component={Home} />
    <Route exact path="/" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/myProfile/:id" component={MyProfPage} />
    <Route path="/profile/:id" component={ProfPage} />
  </Switch>
);
=======
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import ProfPage from './components/ProfPage/ProfPage';
import ChatWindow from './components/Chat/ChatWindow';


export default (
    <Switch>
        <Route exact path='/' component={Login}/>
        <Route path='/home' component={Home}/>
        <Route path='/register' component={Register}/>
        <Route path='/profile' component={ProfPage}/>
        <Route path='/chat' component={ChatWindow}/>
    </Switch>
);
>>>>>>> master
