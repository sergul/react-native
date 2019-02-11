export default class TodoActions {
  static ADD = 'ADD';

  static DELETE = 'DELETE';

  static EDIT = 'EDIT';

  static add = (text) => {
    return {
      type: TodoActions.ADD,
      text
    };
  }

  static delete = (id) => {
    return {
      type: TodoActions.DELETE,
      id
    };
  }

  static edit = (id) => {
    return {
      type: TodoActions.EDIT,
      id
    };
  };
}
