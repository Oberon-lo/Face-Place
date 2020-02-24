import React, { useState } from "react";
import { connect } from "react-redux";
import { postContentHandler, postResetter } from "./../../ducks/reducer";
import axios from "axios";
import AddPostImage from "../AddImage/AddPostImage";
import Swal from "sweetalert2";
import "./PostMaker.css";

const PostMaker = props => {
  const [imageToggle, setImageToggle] = useState(false);
  const [postcont, setPost_cont] = useState("");
  const [imgArr, setImgArr] = useState([]);

  function submitPost(body) {
    axios
      .post(`/posts/newPost`, body)
      .then(response => {
        props.addPost([
          ...props.postArr,
          {
            user_id: props.user_id,
            last_name: props.last_name,
            first_name: props.first_name,
            prof_pic: props.prof_pic,
            post_id: response.data.post_id,
            postcont
          }
        ]);
        setPost_cont("");
        setImgArr([]);
      })
      .then(
        Swal.fire({
          icon: "success",
          title: "Posted!",
          confirmButtonText: "Continue"
        }).then(result => {
          if (result.value) {
            window.location.reload();
          }
        })
      );
  }

  return (
    <div className="PostMaker">
      <input
        className="content-input"
        value={postcont}
        onChange={e => setPost_cont(e.target.value)}
        type="text"
      />
      {imageToggle ? (
        <AddPostImage imgArr={imgArr} setImgArr={setImgArr} />
      ) : null}
      <div className="button-bar">
        <button onClick={() => setImageToggle(!imageToggle)}>addImage</button>
        <button
          onClick={() =>
            submitPost({
              user_id: props.user_id,
              post_cont: postcont,
              post_img: imgArr
            })
          }
        >
          Post
        </button>
      </div>
    </div>
  );
};

function mapStateToProps(reduxState) {
  const { user_id, first_name, last_name, prof_pic } = reduxState;
  return {
    user_id,
    first_name,
    last_name,
    prof_pic
  };
}

export default connect(mapStateToProps, { postContentHandler, postResetter })(
  PostMaker
);
