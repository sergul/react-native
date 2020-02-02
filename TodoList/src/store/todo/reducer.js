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
      for (let i = 0; i < 30; ++i) {
        const todoId = `${Date.now().toString()}${Math.random()}`;
        const newTodo = new TodoItem(todoId, `${action.text}-${(i + 1)}`);
        newList.push(newTodo);
      }
      // const todoId = `${Date.now().toString()}${Math.random()}`;
      // const newTodo = new TodoItem(todoId, action.text);
      // newList.push(newTodo);
      const prevList = state.todoList;

      return {
        ...state,
        todoList: [...newList, ...prevList]
      };
    }
    case TodoActions.SAVE_SELECTED_ROW_Y_POS: {
      return {
        ...state,
        selectedRowYPos: action.yPos
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
      const editedItem = {};
      editedItem[action.id] = action.text;
      return {
        ...state,
        edited: editedItem
      };
    }
    case TodoActions.SELECT_ROW: {
      const selected = {};
      selected[action.id] = action.isSelected;
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
