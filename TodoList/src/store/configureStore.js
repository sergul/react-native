import { createStore, combineReducers } from 'redux';

import todoReducer from './todo/reducer';
import { onTodoAdded } from './todo/subscriber';

const rootReducer = combineReducers({
  todo: todoReducer
});

const store = createStore(rootReducer);

const getStore = () => {
  return store;
};

export default getStore;
