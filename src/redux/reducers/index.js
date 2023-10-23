import {combineReducers} from 'redux';

//Import All Reducers


const appReducer = combineReducers({
 
});
const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  // if (action.type === LOGOUT) {
  //   state = undefined;
  // }

  return appReducer(state, action);
};
export default rootReducer;
