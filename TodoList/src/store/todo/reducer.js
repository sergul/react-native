import TodoActions from './actions';
import TodoItem from './model';

/**
 * Contains all the todo related reducers.
 */

const initialState = {
  todoList: []
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case TodoActions.ADD: {
      const todoId = new Date().valueOf().toString();
      const newTodo = new TodoItem(todoId, action.text);
      return {
        ...state,
        todoList: [...state.todoList, newTodo]
      };
    }
    case TodoActions.DELETE: {
      return {
        ...state,
        todoList: state.todoList.filter((todoItem) => {
          return todoItem.id !== action.id;
        })
      };
    }
    case TodoActions.EDIT: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
};

export default todoReducer;
