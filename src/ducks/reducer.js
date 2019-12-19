const initialState = {
    user_id: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    prof_pic: '',
    chat_cont: '',
    img: '',
    post_img: [], 
    post_cont: '',
    bio: '',
    cover_pic: '',
    com_cont: '',
    is_Admin: false,
    email_verif: false,
    selected_post: {},
    selected_comment: {},
    current_user: {},
}

const IS_AUTHENTICATED = 'IS_AUTHENTICATED';
const CANCEL = 'CANCEL';
const LOGIN = 'LOGIN';
const REGISTER = 'REGISTER';
const POST = 'POST';
const COMMENT = 'COMMENT';
const SELECT_POST = 'SELECT_POST';
const SELECT_COMMENT = 'SELECT_COMMENT';

//Action Builders
export const setAuthenticated = (hasAuth, userObj) => {
    return{
        type: IS_AUTHENTICATED,
        payload: {
            isAuthenticated: hasAuth,
            current_user: userObj
        }
    }
}
export const addPost = (post_cont, img) => {
    return{
        type: POST,
        payload: {
            post_cont: post_cont,
            img: img
        }
    }
}
export const selectPost = (post) => {
    return{
        type: SELECT_POST,
        payload: {
            post_cont: post.post_cont,
            img: post.img
        }
    }
}
export const addComment = (com_cont, img) => {
    return{
        type: COMMENT,
        payload: {
            com_cont: com_cont,
            img: img
        }
    }
}
export const selectComment = (comment) => {
    return{
        type: SELECT_COMMENT,
        payload: {
            com_cont: comment.com_cont,
            img: comment.img
        }
    }
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case IS_AUTHENTICATED:
            return{
                ...state,
                ...action.payload
            }
        case LOGIN:
            return{
                ...state,
                ...action.payload
            }
        case POST:
            return{
                ...state,
                ...action.payload
            }
        case COMMENT:
            return{
                ...state,
                ...action.payload
            }
        case SELECT_POST:
            return{
                ...state,
                ...action.payload
            }
        case SELECT_COMMENT:
            return{
                ...state,
                ...action.payload
            }

     default: return state
    }
}