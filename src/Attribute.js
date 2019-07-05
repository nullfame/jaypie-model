import ow from "ow";

export default class Attribute {
  constructor({ name } = {}) {
    ow(name, ow.string);
    this.name = name;
  }
}
