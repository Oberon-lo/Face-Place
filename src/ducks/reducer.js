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
const GET_SESSION = 'GET_SESSION';
const RESET_SESSION = 'RESET_SESSION';

// post 
const RETRIEVE_POSTS = 'RETRIEVE_POSTS';
const POST_CONTENT_HANDLER = 'POST CONTENT_HANDLER';


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
export function getSession() {
  return {
    type: GET_SESSION,
    payload: axios.get(`/api/session`)
      .then(response => response.data)
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
export function retrievePosts(user_id, offset) {
  return {
    type: RETRIEVE_POSTS,
    payload: axios.get(`/posts/all/${user_id}`, offset)
      .then(response => {
        console.log("response hit-------", response.data)
        return response.data ;
      })
  };
};
export const postContentHandler = (post_cont) => {
  return {
    type: POST_CONTENT_HANDLER,
    payload: post_cont
  };
};


export default function (state = initialState, action) {
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
    case GET_SESSION + '_FULFILLED':
      return {
        ...state,
        user_id: payload.id,
        first_name: payload.firstName,
        last_name: payload.lastName,
        prof_pic: payload.profilePic,
        email_verif: payload.isVerified,
        is_Admin: payload.isAdmin
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
    case RETRIEVE_POSTS + '_FULFILLED':
      console.log("case hit-------------");
      return {
        ...state,
        postArr: [...this.postArr, ...payload]
      }
    case POST_CONTENT_HANDLER:
      return {
        ...state,
        ...payload
      }
    default: return state
  };
};