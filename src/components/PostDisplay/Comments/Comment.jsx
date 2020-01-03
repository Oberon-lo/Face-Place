import React from 'react';
import { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import './Comment.css';

const Comment = (props) => {
    const { user_id, first_name, last_name, prof_pic, post_id, com_id, com_cont, index } = props.com;
    console.log(props)

    const [edit, toggleEdit] = useState(false);
    const [comment_cont, setComment_cont] = useState(com_cont);
    const [imgArr, setImgArr] = useState([]);

    useEffect(() => {
        getImages();
    }, []);

    function getImages() {
        axios
            .get(`post/comments/img/${com_id}`)
            .then(response => {
                console.log(response.data);
                setImgArr(response.data);
            });
    };

    function editComment(body) {
        axios
            .put(`/post/comment/${com_id}`, body)
            .then(response => {
                toggleEdit(!edit);
            });
    };

    function cancelHandler() {
        setComment_cont(com_cont);
        toggleEdit(!edit);
    };

    function comDeleter() {
        console.log("props.comArr", props.comArr)
        const comArr = props.comArr;
        console.log("before", comArr);
        comArr.splice(index, 1);
        console.log("after", comArr);
        props.editComArr(comArr);
        axios
            .delete(`post/comment/${com_id}`)
            .then(response => {
                alert(response.data.message);
            });
    };

    return (
        <div className="comment">
            <div className="author">
                <img src={prof_pic} alt={first_name + '' + last_name} height="20px" />
                <h6>{first_name}&nbsp;</h6>
                <h6>{last_name}</h6>
            </div>
            <div className="comment-content">
                {edit
                    ?
                    <input value={comment_cont} onChange={(e) => setComment_cont(e.target.value)} type="text" />
                    :
                    <p>{comment_cont}</p>
                }
                {props.user_id === user_id
                    ?
                    edit
                        ?
                        <div className="button-holder">
                            <button onClick={() => editComment({com_cont: comment_cont})} >Save</button>
                            <button onClick={() => cancelHandler()} >Cancel</button>
                        </div>
                        :
                        <div className="button-holder">
                            <button onClick={() => toggleEdit(!edit)} >Edit</button>
                            <button onClick={() => comDeleter()} >Delete</button>
                        </div>
                    :
                    null
                }
            </div>
        </div>
    );
};

function mapStateToProps(reduxState) {
    const {user_id} = reduxState;
    return {
        user_id
    };
}

export default connect(mapStateToProps)(Comment);