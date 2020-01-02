import React, {Component} from 'react';
import SockJS from 'sockjs-client';

export default class ChatWindow extends Component {
    constructor() {
        super();
        this.state = {

        }
        this.initSocket()
    }
     //Init websocket connection
     initSocket = () => {
        let socket = new SockJS('/sockets/chat');
        console.log('socket object', socket);
        socket.onopen = () => socket.send(JSON.stringify({
            type: 'chat-connect',
            data: {
                message: "bacon"
            }
        }));
        socket.onmessage = (msg) => this.receiveSocketMessage(JSON.parse(msg.data));
        socket.onerror = (error) => console.error("chat-socket-error", error);
        socket.onclose = (event) => {
            console.log("chat-socket-disconnect", event.code, event.reason);
        };
    }

    //Receive message
    receiveSocketMessage = (response) => {
        let message = response.data;
        console.log('receiving message', message);
    };
    render() {
        return(
            <div>

            </div>
        )
    }
    
}