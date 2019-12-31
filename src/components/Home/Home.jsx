import React from 'react';
import Post from './../PostDisplay/Post';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {retrievePosts, getSession} from '../../ducks/reducer';


const Home = (props) => {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        postGetter();
    }, [props.user_id])
    
    function postGetter() {
        retrievePosts(props.user_id, offset);
        setOffset(offset + 5);
    }
    

    return (
        <div>
            HOME
            {
                props.postArr.map((post, i) => (
                    <div key={i} className="post-container">
                        <Post post={post} />
                    </div>
                ))
            }
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