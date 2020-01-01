import React from 'react';
import { connect } from 'react-redux';
import './PostMaker.css';

const PostMaker = (props) => {
  return (
    <div className="PostMaker">
      <input className="content-input" value={props.post_cont} type="text" />
    </div>
  );
};

function mapStateToProps(reduxState) {
  const { post_cont } = reduxState;
  return {
    post_cont
  }
}

export default connect(mapStateToProps)(PostMaker);