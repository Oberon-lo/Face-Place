import React, { useState, useEffect } from "react";
import axios from "axios";
import Comment from "../Comments/Comment";
import { connect } from "react-redux";
import { postContSelect } from "../../../ducks/reducer";
import ComMaker from "../ComMaker/ComMaker";
import ImageViewer from "./../ImageViewer/ImageViewer";
import ImageEditor from "./../ImageEditor/ImageEditor";
import "./Post.css";
import { Swal } from "sweetalert2";

const Post = props => {
  const {
    user_id,
    first_name,
    last_name,
    prof_pic,
    post_id,
    postcont
  } = props.post;

  const [comArr, addComArr] = useState([]);
  const [comCount, setComCount] = useState(0);
  const [edit, toggleEdit] = useState(false);
  const [post_cont, setPost_cont] = useState(postcont);

  useEffect(() => {
    getComments();
  }, [post_id]);

  function getComments() {
    axios.get(`/post/comments/${post_id}`).then(response => {
      addComArr([...response.data.comments]);
      setComCount(response.data.comNumber[0].count);
    });
  }

  function postDeleter() {
    axios.delete(`/post/${post_id}`).then(response => {
      Swal.fire({
        icon: "success",
        title: "Post Deleted!",
        text: response.data.message,
        confirmButtonText: "Continue"
      }).then(result => {
        if (result.value) {
          window.location.reload();
        }
      });
    });
  }

  function cancelHandler() {
    setPost_cont(postcont);
    toggleEdit(!edit);
  }

  function editPost(body) {
    axios
      .put(`/post/${post_id}`, body)
      .then(response => {Swal.fire({
        icon: "success",
        title: "Changes Saved!",
        text: response.data.message,
        confirmButtonText: "Continue"
      }).then(result => {
        if (result.value) {
          window.location.reload();
        }
      });
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="Post">
      <div className="author">
        <img src={prof_pic} alt={first_name + "" + last_name} height="40px" />
        <h3>{first_name}&nbsp;</h3>
        <h3>{last_name}</h3>
      </div>
      <div className="post-content">
        {edit ? (
          <div className="post-info">
            <ImageEditor post_id={post_id} />
            <input
              value={post_cont}
              onChange={e => setPost_cont(e.target.value)}
              type="text"
            />
          </div>
        ) : (
          <div className="post-info">
            <ImageViewer post_id={post_id} />
            <p>{post_cont}</p>
          </div>
        )}
        {props.user_id === user_id ? (
          edit ? (
            <div className="button-holder">
              <button onClick={() => editPost(post_cont)}>Save</button>
              <button onClick={() => cancelHandler()}>Cancel</button>
            </div>
          ) : (
            <div className="button-holder">
              <button onClick={() => toggleEdit(!edit)}>Edit</button>
              <button onClick={() => postDeleter()}>Delete</button>
            </div>
          )
        ) : null}
      </div>
      <div className="comment-section">
        <p>{comCount} comments</p>
        {comArr.map((comment, i) => (
          <div key={i} className="comment-container">
            <Comment
              index={i}
              com={comment}
              comArr={comArr}
              editComArr={addComArr}
            />
          </div>
        ))}
        <ComMaker
          comArr={comArr}
          addComArr={addComArr}
          post_id={post_id}
          setComCount={setComCount}
          comCount={comCount}
        />
      </div>
    </div>
  );
};

function mapStateToProps(reduxState) {
  const { user_id } = reduxState;
  return {
    user_id
  };
}

export default connect(mapStateToProps, { postContSelect })(Post);
