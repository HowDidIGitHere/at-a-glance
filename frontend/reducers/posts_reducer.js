import {
  RECEIVE_FEED_POSTS,
  RECEIVE_EVEN_MOVE_POSTS,
  RECEIVE_ALL_POSTS,
  RECEIVE_POST,
  REMOVE_POST
} from '../actions/post_actions';

const postsReducer = (state = null, action) => {
  // Object.freeze(state);
  // let nextState = Object.assign({}, state);
  let nextState;

  switch (action.type) {
    case RECEIVE_ALL_POSTS:
      return action.posts;
    case RECEIVE_FEED_POSTS:
      return action.posts;
    case RECEIVE_EVEN_MOVE_POSTS:
      nextState = state ? state.concat(action.posts) : action.posts;
      return nextState;
    case RECEIVE_POST: 
      nextState = state ? state : [];
      nextState.unshift(action.post)
      return nextState;
    // case REMOVE_POST:
      // delete nextState[action.post.id];
      // return nextState;
    default:
      return state;
  }
};

export default postsReducer;
