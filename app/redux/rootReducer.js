import {combineReducers} from 'redux';
import authReducer from './authSlice';
import likeReducer from './likeSlice';
import pdfStatusReducer from './pdfStatusSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  likeDislike: likeReducer,
  pdfStatus: pdfStatusReducer,
});

export default rootReducer;
