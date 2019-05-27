export default class TodoItem {
  constructor({ text = null, done = false } = {}) {
    this.text = text;
    this.done = done;
  }
}
