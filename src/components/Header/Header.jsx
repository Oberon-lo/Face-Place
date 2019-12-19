import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

export default class Header extends Component {
    render(){
        return(
            <div className='header'>
                <h1>FacePlace!</h1>
                <Link to='/profile'>
                    <button>
                        My Profile
                    </button>
                </Link>
            </div>
        )
    }
}