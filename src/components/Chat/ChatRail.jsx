import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import store from "../../ducks/store";
import { setCurrentChat } from "../../ducks/reducer";
import session from "express-session";

export default class ChatRail extends Component {
  constructor() {
    super();
    this.state = {
      current_user: {},
      users_names: [],
      friendIds: [],
      friends: []
    };
  }

  componentDidMount = () => {
    this.getFriendIds();
  };

  getFriendIds = () => {
    axios.get(`/api/userFriends/${session.user_id}`).then(res => {
      console.log(session.user_id);
      this.setState({ friendIds: res.data });
    });
  };

getFriends =() => {
this.state.friendIds.map(f => {
axios.get(`/api/userInfo/${f.friend_id}`)
.then(res => {this.state.friends.push(res.data)})
})
};

  startConvo = clickedUserId => {
    //get current user session.user_id
    axios.get("/api/session").then(res => {
      let user = res.data;

      //save current user into state
      this.setState({
        current_user: user
        //   users_names: [(`${} and ${} convo`)]
      });

      //check and see if previous convo exists
      axios.get(`/chat/${user.id}/${clickedUserId}`).then(response => {
        let chat_ids = response.data;
        if (chat_ids.length > 0) {
          let currentChatId = chat_ids[0].chat_id;
          store.dispatch(setCurrentChat(user.id, currentChatId));
        } else if (chat_ids.length === 0) {
          console.log("creating new chat!");
          let title = "newChat";
          //create a new chat
          axios.post(`/chat/${title}`).then(r => {
            let chat_id_list = r.data;
            if (chat_id_list.length === 1) {
              let chat_id = chat_id_list[0].chat_id;

              //create two entries on the user_chat table
              let user_id = clickedUserId;
              axios.post("/userchat", { user_id, chat_id });
              user_id = user.id;
              axios.post("/userchat", { user_id, chat_id });

              //save the new chat ID to the store
              store.dispatch(setCurrentChat(user.id, chat_id));
            }
          });
        }
      });

      //create a new row on chat table
      //All of this code is made to create a new chat!
      // let title = 'newChat';
      // axios.post(`/chat/${title}`)
      // .then(r => {
      //     console.log('new chat response', r);
      //     let chat_id_list = r.data;
      //     if(chat_id_list.length === 1){
      //         let chat_id = chat_id_list[0].chat_id;

      //         // this.setState({})
      //         console.log('new chat_id', chat_id);

      //         let user_id = clickedUserId;
      //         axios.post('/userchat', {user_id, chat_id})

      //         user_id = user.id
      //         axios.post('/userchat', {user_id, chat_id})
      //     }

      // })
    });
  };

  render() {
    const { friends } = this.state;
    return (
      <div>
        Chat
        <div className="chatContent">
          {friends.map(u => (
            <Link key={u.user_id} to="/chat">
              <div
                onClick={() => this.startConvo(u.user_id)}
              >{`${u.first_name} ${u.last_name}`}</div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
