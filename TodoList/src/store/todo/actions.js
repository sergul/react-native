export default class TodoActions {
  static ADD = 'ADD';

  static DELETE = 'DELETE';

  static EDIT_TEXT = 'EDIT_TEXT';

  static SELECT_ROW = 'SELECT_ROW';

  static SAVE_SELECTED_ROW_Y_POS = 'SAVE_SELECTED_ROW_Y_POS';

  static DESELECT_ROW = 'DESELECT_ROW';

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

  static selectRow = (id, isSelected) => {
    return {
      type: TodoActions.SELECT_ROW,
      id,
      isSelected
    };
  };

  static saveSelectedRowYPos = (yPos) => {
    return {
      type: TodoActions.SAVE_SELECTED_ROW_Y_POS,
      yPos
    };
  };

  static deselectRow = (id) => {
    return {
      type: TodoActions.DESELECT_ROW,
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
