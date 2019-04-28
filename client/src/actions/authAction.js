import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// register action

export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => 
        dispatch({ 
            type: GET_ERRORS,
            payload: err.response.data
        })
    )
}

// login Get user token

export const loginUser = userData => dispatch => {
    axios.post('/api/users/login', userData)
    .then(res => {
        const { token } = res.data;
        // save token to localstorage
        localStorage.setItem("jwtToken", token);
        // set token to auth header
        setAuthToken(token);
        // get user data from token
        const decode = jwt_decode(token);
        // Set current user
        dispatch(setCurrentUser(decode));
    })
    .catch(err => 
        dispatch({ 
            type: GET_ERRORS,
            payload: err.response.data
        })
    )
}

// Set logged in user

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// Set log out user

export const logoutUser = () => dispatch => {
    // remove token from localstorage
    localStorage.removeItem('jwtToken');
    // remove auth header for futhure requests
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}