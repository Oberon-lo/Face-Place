import React, {Component} from 'react';
import Comments from './Comments';


export default class Post extends Component {
    render(){
        return(
            <div>
                Post
                <Comments/>
            </div>
        )
    }
}