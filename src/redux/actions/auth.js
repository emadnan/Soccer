import {LOGIN, AUTH_LOADING, AUTH_FAILED} from './types';
import axios from 'axios';
import {endPoints} from '../helper/base-url';

export const loginUser = params => {
  return async dispatch => {
    dispatch({type: AUTH_LOADING}); // Dispatch loading action

    try {
      const res = await axios.post(endPoints.signIn, params, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (res?.data?.response === 1) {
        dispatch(loginSuccess(res?.data?.user)); // Dispatch success action
      } else if (res?.data?.response === 0) {
        dispatch({type: AUTH_FAILED, payload: res?.data?.message}); // Dispatch failure action
      }
    } catch (err) {
      console.log('err', err);
      dispatch({type: AUTH_FAILED, payload: 'An error occurred.'}); // Dispatch failure action
    }
  };
};

// Helper Functions
const loginSuccess = res => ({
  type: LOGIN,
  payload: res,
});
