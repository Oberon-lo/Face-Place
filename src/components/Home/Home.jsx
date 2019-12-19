import React, {Component} from 'react';
import Post from '../PostDisplay/Post';

export default class Home extends Component {
    render(){
        return(
            <div>
                Home
                <Post/>
            </div>
        )
    }
}