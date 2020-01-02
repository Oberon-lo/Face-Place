import React, { Component } from "react";
import ChatRail from '../Chat/ChatRail';

class ProfPage extends Component {
  render() {
    return <div className='page'>
      <div className='content'>
      <button onClick = {() => {console.log('hit');
      } }>
      ProfPage
      </button>
      </div>
      <div className='chat'>
        <ChatRail/>
      </div>
      </div>;
  }
}

export default ProfPage;
