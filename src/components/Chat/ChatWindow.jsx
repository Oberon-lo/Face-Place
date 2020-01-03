import React, { Component } from "react";
import SockJS from "sockjs-client";
import axios from "axios";
import store from "../../ducks/store";

export default class ChatWindow extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      chat_cont: "",
      user_id: 0,
      chat_id: "",
      socket: {}
    };
  }

  getMessages = () => {
    setTimeout(() => {
      let { current_chat_id, user_id } = store.getState();
      this.initSocket(current_chat_id);
    }, 500);

    // setTimeout(() => {
    //     let {current_chat_id, user_id} = store.getState()
    //     console.log('chat window current chat id', current_chat_id)
    //     axios.get(`/chatmessages/${current_chat_id}`)
    //     .then(result => {
    //         let messages = result.data;
    //         console.log(`messages for chat ${current_chat_id}`, messages)
    //         this.setState({messages: messages, user_id: user_id});
    //     });
    // }, 500);
  };
  componentDidMount = () => {
    this.getMessages();
  };
  handleChange = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  sendMessage = () => {
    let { user_id, current_chat_id } = store.getState();
    let { chat_cont, socket } = this.state;
    socket.send(
      JSON.stringify({
        type: "NEW_MESSAGE",
        data: {
          chat_cont: chat_cont,
          user_id: user_id,
          current_chat_id: current_chat_id
        }
      })
    );
    this.setState({ chat_cont: "" });
  };
  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  };

  // sendMessage = () => {
  //     let {user_id, current_chat_id} = store.getState();
  //     let {chat_cont} = this.state;
  //     console.log('am i recieving all these values', chat_cont, user_id, current_chat_id)
  //     axios.post('/chatmessage', {
  //         chat_cont, user_id, current_chat_id
  //     })
  //     .then(response => {
  //         this.setState({chat_cont: ''})
  //     })
  // }
  //Init websocket connection
  initSocket = current_chat_id => {
    let socket = new SockJS("/sockets/chat");
    socket.onopen = () =>
      socket.send(
        JSON.stringify({
          type: "GET_MESSAGES",
          data: {
            current_chat_id: current_chat_id
          }
        })
      );
    socket.onmessage = msg => this.receiveSocketMessage(JSON.parse(msg.data));
    socket.onerror = error => console.error("chat-socket-error", error);
    socket.onclose = event => {
      console.log("chat-socket-disconnect", event.code, event.reason);
    };
    this.setState({ socket: socket });
  };

  //Receive message
  receiveSocketMessage = response => {
    let type = response.type;
    if (type === "GET_MESSAGES") {
      let { user_id } = store.getState();
      this.setState({ messages: response.data, user_id: user_id });
    }
  };

  getBubbleClass = user_id => {
    let myClass = "bubble";
    if (user_id == this.state.user_id) {
      myClass += " myBubble";
    }
    return myClass;
  };

  render() {
    const { chat_cont, messages } = this.state;
    return (
      <div className="chatWindow">
        <div className="messageHistory">
          {messages.map(m => (
            <div className={this.getBubbleClass(m.user_id)} key={m.message_id}>
              {m.chat_cont}
            </div>
          ))}
        </div>
        <div className="inputRow">
          <input
            value={chat_cont}
            placeholder="send a message"
            type="text"
            onKeyPress={e => this.handleKeyPress(e)}
            onChange={e => this.handleChange("chat_cont", e.target.value)}
          />
          <button onClick={() => this.sendMessage()}>Send</button>
        </div>
      </div>
    );
  }
}
