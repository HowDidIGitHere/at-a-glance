import * as PostAPIutil from '../util/post_api_util';

// action types
export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const RECEIVE_POST_ERRORS = 'RECEIVE_POST_ERRORS';

// actions
export const receiveAllPosts = posts => ({
  type: RECEIVE_ALL_POSTS,
  posts
});

export const receivePost = post => ({
  type: RECEIVE_POST,
  post
});

export const removePost = postId => ({
  type: REMOVE_POST,
  postId
});

export const receiveErrors = errors => ({
  type: RECEIVE_POST_ERRORS,
  errors
});


// thunk action creators
export const getAllPosts = communityId => dispatch => (
  PostAPIutil.getAllPosts(communityId)
    .then(posts => dispatch(receiveAllPosts(posts)))
    .fail(errors => dispatch(receiveErrors(errors)))
);

export const getPost = postId => dispatch => (
  PostAPIutil.getPost(postId)
    .then(post => dispatch(receivePost(post)))
    .fail(errors => dispatch(receiveErrors(errors)))
);

export const createPost = post => dispatch => (
  PostAPIutil.createPost(post)
    .then(post => dispatch(receivePost(post)))
    .fail(errors => dispatch(receiveErrors(errors)))
);

export const editPost = post => dispatch => (
  PostAPIutil.editPost(post)
    .then(post => dispatch(receivePost(post)))
    .fail(errors => dispatch(receiveErrors(errors)))
);

export const deletePost = postId => dispatch => (
  PostAPIutil.deletePost(postId)
    .then(post => dispatch(receivePost(post)))
);

