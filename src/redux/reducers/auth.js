import {AUTH_LOADING, AUTH_FAILED} from '../actions/auth';
import {
    LOGIN,
  } from '../actions/types';

  const initialState = {
    isLoggedIn: false,
    token: '',
    userId: '',
    secure: '',
    username: null,
    usernameError: null,
    signupObj: {
      username: '',
      phoneNo: '',
      email: '',
      name: '',
      password: '',
      confirmPass: '',
      accountType: '',
      userType: '',
      flegvalue: '',
    },
    user: null,
    address: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    errMsg: null,
  };

  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
      return {
        ...state,
        user: action.payload,
        token: action.payload.token,
        isLoggedIn: true,
        isLoading: false,
        isSuccess: true,
        isError: false,
        errMsg: null,
      };
        default:
      return state;
  }
};