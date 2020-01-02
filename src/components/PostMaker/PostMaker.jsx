import React, { useState } from 'react';
import { connect } from 'react-redux';
import { postContentHandler } from './../../ducks/reducer';
import axios from 'axios';
import AddImage from './../AddImage/AddImage';
import './PostMaker.css';

const PostMaker = (props) => {

  const [imageToggle, setImageToggle] = useState(false)

  // ! TODO: Nate please add sweet alert for post submission.
  function submitPost(body) {
    axios
      .post(`/posts/newPost`, body)
      .then(response => {
        
      })
  }

  return (
    <div className="PostMaker">
      <input className="content-input" value={props.post_cont} onChange={e => postContentHandler(e.target.value)} type="text" />
      {imageToggle ?
        <AddImage />
        :
        null
      }
      <div className="button-bar">
        <button onClick={() => setImageToggle(!imageToggle)} >addImage</button>
        <button onClick={() => submitPost({ user_id: props.user_id, post_cont: props.post_cont, post_img: props.post_img })} >Post</button>
      </div>
    </div>
  );
};

function mapStateToProps(reduxState) {
  const { user_id, post_cont, post_img } = reduxState;
  return {
    user_id,
    post_cont,
    post_img
  }
}

export default connect(mapStateToProps, { postContentHandler })(PostMaker);