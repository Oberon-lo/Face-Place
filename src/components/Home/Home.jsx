import React, {Component} from 'react';
import Post from '../PostDisplay/Post';
import ChatThread from '../Chat/ChatThread';

export default class Home extends Component {
    render(){
        return(
            <div>
                Home
                <Post/>
                <ChatThread/>
            </div>
        )
    }
}