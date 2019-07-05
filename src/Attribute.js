import ow from "ow";

import Model from "./Model";

export default class Attribute {
  constructor({ name, type = Model.type.any } = {}) {
    ow(name, ow.string);
    this.name = name;

    ow(type, ow.string.oneOf(Object.values(Model.type)));
    this.type = type;
  }
}
