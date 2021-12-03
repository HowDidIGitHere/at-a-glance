import {
  RECEIVE_EVEN_MORE_COMMENTS,
  RECEIVE_ALL_COMMENTS,
  RECEIVE_COMMENT,
  REMOVE_COMMENT
} from '../actions/comment_actions'

const commentsReducer = (state = null, action) => {
  let nextState;

  switch (action.type) {
    case RECEIVE_ALL_COMMENTS:
      return action.comments;
    case RECEIVE_EVEN_MORE_COMMENTS:
      nextState = state ? state.concat(action.comments) : action.comments;
      return nextState;
    case RECEIVE_COMMENT:
      return state ? [action.comment].concat(state) : action.comment 
    case REMOVE_COMMENT:
      const newState = [];
      for (let i = 0; i < state.length; i++) {
        if (state[i].id !== action.commentId) {
          newState.push(state[i]);
        }
      }
      return newState;
    default:
      return state;
  }
};

export default commentsReducer;