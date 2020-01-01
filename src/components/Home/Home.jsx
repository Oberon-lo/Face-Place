import React from 'react';
import Post from './../PostDisplay/Post';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {retrievePosts, getSession} from '../../ducks/reducer';
// import PostMaker from './../PostMaker/PostMaker';
import './Home.css';


const Home = (props) => {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        if (props.user_id !== 0) {
            postGetter();
        }
    }, [props.user_id])

    useEffect(() => {}, [props.postArr])

    async function postGetter () {
        await retrievePosts(props.user_id, offset);
        setOffset(offset + 5);
    }
    const postDisplayer = props.postArr.map((post, i) => (
        <div key={i} className="post-container">
            <Post post={post} />
        </div>
    ))
    
    console.log("Home hit----------", props.postArr);
    return (
        <div className="Home">
            {/* <PostMaker /> */}
            {postDisplayer}
        </div>
    );
};

function mapStateToProps(reduxState) {
    const { user_id, postArr } = reduxState;
    return {
        user_id,
        postArr
    }
}

export default connect(mapStateToProps, {retrievePosts, getSession})(Home);