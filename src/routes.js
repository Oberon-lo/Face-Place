import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import ProfPage from './components/ProfPage/ProfPage';


export default (
    <Switch>
        <Route path='/home' component={Home}/>
        <Route path='/' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/profile' component={ProfPage}/>
    </Switch>

)