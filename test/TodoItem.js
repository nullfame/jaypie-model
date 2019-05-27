import { Model } from "..";

export default class TodoItem extends Model {
  constructor({ text = null, done = false } = {}) {
    super();
    this.text = text;
    this.done = done;
  }
}
