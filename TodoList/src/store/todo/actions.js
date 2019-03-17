export default class TodoActions {
  static ADD = 'ADD';

  static DELETE = 'DELETE';

  static EDIT_TEXT = 'EDIT_TEXT';

  static SET_SELECTED = 'SET_ACTIVE';

  static SET_SCROLLING_STATE = 'SET_SCROLLING_STATE';

  static add = (text) => {
    return {
      type: TodoActions.ADD,
      text,
    };
  }

  static delete = (id) => {
    return {
      type: TodoActions.DELETE,
      id
    };
  }

  static editText = ({ id, text }) => {
    return {
      type: TodoActions.EDIT_TEXT,
      id,
      text
    };
  };

  static setSelected = (id) => {
    return {
      type: TodoActions.SET_SELECTED,
      id
    };
  };

  static setScrollingState = (isScrolling) => {
    return {
      type: TodoActions.SET_SCROLLING_STATE,
      isScrolling
    };
  };
}
