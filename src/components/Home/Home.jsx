import React from 'react';
import Post from './../PostDisplay/Post';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {retrievePosts, getSession} from '../../ducks/reducer';
import ChatRail from '../Chat/ChatRail';


const Home = (props) => {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        if (props.user_id !== 0) {
            postGetter();
        }
    }, [props.user_id])
    
    function postGetter() {
        retrievePosts(props.user_id, offset);
        setOffset(offset + 5);
    }
    

    return (
        <div className='page'>
            <div className='content'>
            HOME
            <p>dummy data dummy data dummy data o;rhgnaewafvprgjohrfj;reg;gljfhrtoe4wjf</p>
            {
                props.postArr.map((post, i) => (
                    <div key={i} className="post-container">
                        <Post post={post} />
                    </div>
                ))
            }
            </div>
            <div className='chat'>
                <ChatRail/>
            </div>
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