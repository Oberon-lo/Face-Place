import axios from 'axios';

const initialState = {
    //user info
    user_id: 0,
    email: '',
    first_name: '',
    last_name: '',
    prof_pic: '',
    bio: '',
    cover_pic: '',
    is_Admin: false,
    email_verif: false,
    //chat
    chat_cont: '',
    img: '',
    //post
    postArr: [],
    post_img: [],
    post_cont: '',
    //comment
    com_cont: '',
    // ?
    selected_post: {},
    selected_comment: {},
    current_user: {},
};

// ACTION CONSTANTS \\

const IS_AUTHENTICATED = 'IS_AUTHENTICATED';
// const CANCEL = 'CANCEL';
const LOGIN = 'LOGIN';
// const REGISTER = 'REGISTER';
const COMMENT = 'COMMENT';
const SELECT_POST = 'SELECT_POST';
const SELECT_COMMENT = 'SELECT_COMMENT';
const GET_SESSION = "GET_SESSION";
const RESET_SESSION = "RESET_SESSION";

// post 
const RETRIEVE_POSTS = "RETRIEVE_POSTS";


// ACTION BUILDERS \\
export const setAuthenticated = (hasAuth, userObj) => {
    return {
        type: IS_AUTHENTICATED,
        payload: {
            isAuthenticated: hasAuth,
            current_user: userObj
        }
    };
};
export const getSession = () => {
    return {
        type: GET_SESSION,
        payload: axios.get(`/api/session`)
            .then(response => {
                // console.log('hit----', response.data);
                return { user_id: response.data.id, first_name: response.data.firstName, last_name: response.data.lastName, prof_pic: response.data.profilePic, is_Admin: response.data.isAdmin, email_verif: response.data.isVerified };
            })
    };
};
export const resetSession = (initialState) => {
    return {
        type: RESET_SESSION,
        payload: initialState
    }
};
export const selectPost = (post) => {
    return {
        type: SELECT_POST,
        payload: {
            post_cont: post.post_cont,
            img: post.img,
            selected_comment: post
        }
    };
};
export const addComment = (com_cont, img) => {
    return {
        type: COMMENT,
        payload: {
            com_cont: com_cont,
            img: img
        }
    };
};
export const selectComment = (comment) => {
    return {
        type: SELECT_COMMENT,
        payload: {
            com_cont: comment.com_cont,
            img: comment.img,
            selected_comment: comment
        }
    };
};
// post
export const retrievePosts = (user_id, offset) => {
    return {
        type: RETRIEVE_POSTS,
        payload: axios.get(`/posts/all/${user_id}`, offset)
            .then(response => {
                return {posts: response.data};
            })
    };
};

export default function reducer(state = initialState, action) {
    const { payload } = action;
    switch (action.type) {
        case IS_AUTHENTICATED:
            return {
                ...state,
                ...payload
            }
        case LOGIN:
            return {
                ...state,
                ...payload
            }
        case GET_SESSION:
            return {
                ...state,
                ...payload
            }
        case RESET_SESSION:
            return {
                ...initialState
            }
        case COMMENT:
            return {
                ...state,
                ...payload
            }
        case SELECT_POST:
            return {
                ...state,
                ...payload
            }
        case SELECT_COMMENT:
            return {
                ...state,
                ...payload
            }
        //post
        case RETRIEVE_POSTS:
            return {
                ...state,
                postArr: [...this.postArr, payload.posts]
            }
        default: return state
    };
};