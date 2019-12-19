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
    handleChange = (key, value) => {
        this.setState({
          [key]: value
        })
      }
    render(){
    const { email, password } = this.state;
        return(
            <div>
                <input
                    onChange={e => this.handleChange('email', e.target.value)}
                    value={email}
                    placeholder='Email'
                    type='email'
                    />
                    <hr/>
                <input
                    onChange={e => this.handleChange('password', e.target.value)}
                    value={password}
                    placeholder='Password'
                    type='password'
                    />
                    <hr/>
                <Link to='/register'>
                    Not a member? Register here!
                </Link>
            </div>
        )
    }
}