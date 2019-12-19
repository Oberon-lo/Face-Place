import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Main from './components/Main/Main';
// import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import ProfPage from './components/ProfPage/ProfPage';


export default (
    <Switch>
        <Route exact path='/' component={Main}/>
        <Route path='/home' component={Home}/>
        {/* <Route path='/Login' component={Login}/> */}
        <Route path='/register' component={Register}/>
        <Route path='/profile' component={ProfPage}/>
    </Switch>

)