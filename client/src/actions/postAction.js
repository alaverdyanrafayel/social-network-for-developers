import axios from 'axios';

import { 
    GET_ERRORS, 
    ADD_POST, 
    GET_POSTS, 
    PROFILE_LOADING, 
    DELETE_POST,
    GET_POST,
    CLEAR_ERROR
} from './types';

// add post
export const addPost = postData => dispatch => {
    dispatch(clearError());
    axios
        .post('/api/posts', postData)
        .then(res => 
            dispatch({
                type: ADD_POST,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}


// add comment
export const addComment = (postId, commentData) => dispatch => {
    dispatch(clearError());
    axios
        .post(`/api/posts/comment/${postId}`, commentData)
        .then(res => 
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}


// delete post
export const deletePost = id => dispatch => {
    axios
        .delete(`/api/posts/${id}`)
        .then(res => 
            dispatch({
                type: DELETE_POST,
                payload: id
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}


// delete comment
export const deleteComment = (commentId, postId) => dispatch => {
    axios
        .delete(`/api/posts/comment/${postId}/${commentId}`)
        .then(res => 
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}


// get posts
export const getPosts = () => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get('/api/posts')
        .then(res => 
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_POSTS,
                payload: null
            })
        )
}


// get post
export const getPost = id => dispatch => {
    dispatch(setProfileLoading());
    axios
        .get(`/api/posts/${id}`)
        .then(res => 
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_POST,
                payload: null
            })
        )
}


// add like
export const addLike = id => dispatch => {
    axios
        .post(`/api/posts/like/${id}`)
        .then(res => dispatch(getPosts()))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}


// remove like
export const removeLike = id => dispatch => {
    axios
        .post(`/api/posts/unlike/${id}`)
        .then(res => dispatch(getPosts()))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}


// clear error
export const clearError = () => {
    return {
        type: CLEAR_ERROR
    }
  }

// profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
  }
