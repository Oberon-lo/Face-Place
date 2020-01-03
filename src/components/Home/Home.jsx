import React from 'react';
import Post from '../PostDisplay/Post/Post';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getSession } from '../../ducks/reducer';
import axios from 'axios';
import PostMaker from './../PostMaker/PostMaker';
import './Home.css';
// import ChatRail from '../Chat/ChatRail';


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
        <div className='Home'>
            <div className='content'>
                HOME
                    {/* <p>dummy data dummy data dummy data o;rhgnaewafvprgjohrfj;reg;gljfhrtoe4wjf</p> */}
                <PostMaker postArr={postArr} addPost={addPostArr} />
                {postDisplayer}
            </div>
            {/* <div className='chat'>
                <ChatRail />
            </div> */}
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