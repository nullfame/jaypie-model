import ow from "ow";

import Model from "./Model";

function validateValueIsModelType(value, type) {
  let predicate;
  switch (type) {
    case Model.type.any:
      return;
    case Model.type.boolean:
      predicate = ow.optional.boolean;
      break;
    case Model.type.string:
      predicate = ow.optional.string;
      break;

    default:
      throw Error(
        "Jaypie: Attribute: Invalid Configuration: Invalid Type: ".type
      );
  }
  ow(value, predicate);
}

export default class Attribute {
  constructor({ name, type = Model.type.any, value = undefined } = {}) {
    ow(name, ow.string);
    this.name = name;

    ow(type, ow.string.oneOf(Object.values(Model.type)));
    this.type = type;

    validateValueIsModelType(value, type);
  }
}
