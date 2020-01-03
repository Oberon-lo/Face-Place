import React, {useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {comResetter, comContentHandler} from './../../../ducks/reducer';
import AddComImage from '../../AddImage/AddComImage';

const ComMaker = (props) => {

  const [imageToggle, setImageToggle] = useState(false);
  const [com_cont, setCom_cont] = useState('')

  function submitCom(body) {
    axios
      .post(`/post/comments/${props.post_id}`, body)
      .then(response => {
        props.addComArr([ ...props.comArr, {user_id: props.user_id, last_name: props.last_name, first_name: props.first_name, prof_pic: props.prof_pic, com_id: response.data.com_id, com_cont}]);
        props.setComCount(props.comCount + 1);
        setCom_cont('');
      })
  }

  return (
    <div className="ComMaker">
      <input className="content-input" value={com_cont} onChange={e => setCom_cont(e.target.value)} type="text"/>
      {imageToggle ?
      <AddComImage />
      :
      null
    }
    <div className="button-bar">
      <button onClick={() => setImageToggle(!imageToggle)} >Add Image</button>
      <button onClick={() => submitCom({user_id: props.user_id, com_cont, imgArr: props.com_img})} >Post</button>
    </div>
    </div>
  );
};

function mapStateToProps(reduxState) {
  const {user_id, first_name, last_name, prof_pic, com_img} = reduxState;
  return {
    user_id,
    first_name,
    last_name,
    prof_pic,
    com_img
  }
}

export default connect(mapStateToProps, {comResetter, comContentHandler})(ComMaker);