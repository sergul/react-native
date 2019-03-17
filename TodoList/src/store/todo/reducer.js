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
      const newList = [];
      // for (let i = 0; i < 100; ++i) {
      //   const todoId = `${Date.now().toString()}${Math.random()}`;
      //   const newTodo = new TodoItem(todoId, action.text);
      //   newList.push(newTodo);
      // }
      const todoId = `${Date.now().toString()}${Math.random()}`;
      const newTodo = new TodoItem(todoId, action.text);
      newList.push(newTodo);
      const prevList = state.todoList;

      return {
        ...state,
        todoList: [...newList, ...prevList]
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
    case TodoActions.EDIT_TEXT: {
      const editedItem = new Map();
      editedItem.set(action.id, action.text);
      return {
        ...state,
        edited: editedItem
      };
    }
    case TodoActions.SET_SELECTED: {
      const selected = new Map();
      selected.set(action.id, true);
      return {
        ...state,
        selected
      };
    }
    case TodoActions.SET_SCROLLING_STATE: {
      return {
        ...state,
        isScrolling: action.isScrolling
      };
    }
    default:
      return state;
  }
};

export default todoReducer;
