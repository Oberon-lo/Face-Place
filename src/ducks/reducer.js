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
  post_img: [],
  post_cont: '',
  //comment
  com_cont: '',
  com_img: []
};

// ACTION CONSTANTS \\

const IS_AUTHENTICATED = 'IS_AUTHENTICATED';
// const CANCEL = 'CANCEL';
const LOGIN = 'LOGIN';
// const REGISTER = 'REGISTER';
const GET_SESSION = 'GET_SESSION';
const RESET_SESSION = 'RESET_SESSION';
const GET_SESSION = "GET_SESSION";
const RESET_SESSION = "RESET_SESSION";
const SET_CURRENT_CHAT = "SET_CURRENT_CHAT";

// post 
const POST_CONTENT_HANDLER = 'POST_CONTENT_HANDLER';
const POST_IMG_HANDLER = 'POST_IMG_HANDLER';
const POST_RESETTER = 'POST_RESETTER';
const POST_CONT_SELECT = 'POST_CONT_SELECT';

// commments
const COM_CONTENT_HANDLER = 'COM_CONTENT_HANDLER';
const COM_IMG_HANDLER = 'COM_IMG_HANDLER';
const COM_RESETTER = 'COM_RESETTER';


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
export const setCurrentChat = (user_id, chat_id) => {
  return {
    type: SET_CURRENT_CHAT,
    payload: {
      user_id: user_id,
      current_chat_id: chat_id
    }
  };
};
export const resetSession = (initialState) => {
  return {
    type: RESET_SESSION,
    payload: initialState
  }
};
export function getSession() {
  return {
    type: GET_SESSION,
    payload: axios.get(`/api/session`)
      .then(response => response.data)
  };
};
// post
export const postContentHandler = (post_cont) => {
  return {
    type: POST_CONTENT_HANDLER,
    payload: post_cont
  };
};
export function postImgHandler(post_img) {
  return {
    type: POST_IMG_HANDLER,
    payload: post_img
  };
};
export function postContSelect(post_cont) {
  return {
    type: POST_CONT_SELECT,
    payload: post_cont
  }

}
export function postResetter() {
  return {
    type: POST_RESETTER,
    payload: null
  };
};
// comments
export function comResetter() {
  return {
    type: COM_RESETTER,
    payload: null
  };
};
export function comContentHandler(com_cont) {
  console.log()
  return {
    type: COM_CONTENT_HANDLER,
    payload: com_cont
  };
};
export function comImgHandler(com_img) {
  return {
    type: COM_IMG_HANDLER,
    payload: com_img
  };
};


export default function (state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case IS_AUTHENTICATED:
      return {
        ...state,
        ...payload
      };
    case LOGIN:
      return {
        ...state,
        ...payload
      };
    case GET_SESSION + '_FULFILLED':
      return {
        ...state,
        user_id: payload.id,
        first_name: payload.firstName,
        last_name: payload.lastName,
        prof_pic: payload.profilePic,
        email_verif: payload.isVerified,
        is_Admin: payload.isAdmin
      };
    case SET_CURRENT_CHAT:
      return {
        ...state,
        ...payload
      }
    case RESET_SESSION:
      return {
        ...initialState
      };
    //post
    case POST_CONTENT_HANDLER:
      return {
        ...state,
        ...payload
      };
    case POST_IMG_HANDLER:
      return {
        ...state,
        ...payload
      };
    case POST_CONT_SELECT:
      return {
        ...state,
        ...payload
      };
    case POST_RESETTER:
      return {
        ...state,
        post_cont: '',
        post_img: []
      };
    // comments
    case COM_RESETTER:
      return {
        ...state,
        com_cont: '',
        com_img: []
      };
    case COM_CONTENT_HANDLER:
      return {
        ...state,
        ...payload
      };
    case COM_IMG_HANDLER:
      return {
        ...state,
        ...payload
      };
    default: return state
  };
};
