import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class ChatRail extends Component {
    constructor() {
        super();
        this.state = {
            current_user: {},
            users: []
        }
    }

    getAllUsers = () => {
        axios.get(`/api/users`)
            .then(res => {
                console.log('stuff', res.data);
                this.setState(
                    { users: res.data }
                );
            });
    }
    componentDidMount = () => {
        this.getAllUsers()
    }

    startConvo= (clickedUserId) => {  
        
        axios.get("/api/session").then(res => {
            let user = res.data;
            this.setState({
              current_user: user
            });
            console.log('clicked user', clickedUserId)
            console.log('current user', user)

          });



       
    }

   
   
    render() {
        const {users} = this.state;
        return (
            <div>
                Chat
           <div className='chatContent'>{users.map(u => <Link to='/chat'>
               <div onClick={() => this.startConvo(u.user_id)}>{`${u.first_name} ${u.last_name}`}</div>
               </Link>
               )}</div>
            </div>
        )
    }
}
