export default class TodoItem {
  id = '';

  text = '';

  isActive = false;

  constructor(id, text = '') {
    this.id = id;
    this.text = text;
  }
}
