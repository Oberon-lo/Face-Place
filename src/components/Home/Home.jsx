import React from 'react';
import Post from './../PostDisplay/Post';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getSession } from '../../ducks/reducer';
import axios from 'axios';
// import PostMaker from './../PostMaker/PostMaker';
import './Home.css';


const Home = (props) => {
    const [offset, setOffset] = useState(0);
    const [postArr, addPostArr] = useState([]);


    useEffect(() => {
        if (props.user_id !== 0) {
            postGetter();
        }
    }, [props.user_id])


    async function postGetter() {
        await axios
            .get(`/posts/all/${props.user_id}`)
            .then(response => {
                console.log(response.data);
                addPostArr([...postArr, ...response.data])
            })
        setOffset(offset + 5);
    }
    const postDisplayer = postArr.map((post, i) => (
        <div key={i} className="post-container">
            <Post post={post} />
        </div>
    ))

    return (
        <div className="Home">
            {/* <PostMaker /> */}
            {postDisplayer}
        </div>
    );
};

function mapStateToProps(reduxState) {
    const { user_id } = reduxState;
    return {
        user_id
    }
}

export default connect(mapStateToProps, { getSession })(Home);