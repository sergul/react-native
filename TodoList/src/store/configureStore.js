import { createStore, combineReducers } from 'redux';

import todoReducer from './todo/reducer';

const rootReducer = combineReducers({
  todo: todoReducer
});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
