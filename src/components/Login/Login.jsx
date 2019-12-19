import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Login extends Component {
    constructor() {
        super();
        this.state= {
            email: '',
            password: ''
        }
    }
    render(){
        return(
            <div>
                <input
                    // onChange={e => this.handleChange('email', e.target.value)}
                    value={this.state.email}
                    placeholder='Email'
                    type='email'
                    />
                    <hr/>
                <input
                    onChange={e => this.handleChange('password', e.target.value)}
                    value={this.state.password}
                    placeholder='Password'
                    type='password'
                    />
                    <hr/>
                <Link to='/register'>
                    Not a Member? Register Here!
                </Link>
            </div>
        )
    }
}