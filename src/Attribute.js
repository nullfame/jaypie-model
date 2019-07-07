import ow from "ow";

const attributeType = {
  any: "ANY",
  boolean: "BOOLEAN",
  date: "DATE",
  number: "NUMBER",
  string: "STRING"
};

function validateValueIsModelType(value, type) {
  let predicate;
  switch (type) {
    case attributeType.any:
      return;
    case attributeType.boolean:
      predicate = ow.optional.boolean;
      break;
    case attributeType.date:
      predicate = ow.optional.date;
      break;
    case attributeType.number:
      predicate = ow.optional.number;
      break;
    case attributeType.string:
      predicate = ow.optional.string;
      break;

    default:
      throw Error(
        `Jaypie: Attribute: Invalid Configuration: Invalid Type: ${type}`
      );
  }
  ow(value, predicate);
}

class Attribute {
  constructor({ name, type = attributeType.any, value = undefined } = {}) {
    ow(name, ow.string);
    this.name = name;

    ow(type, ow.string.oneOf(Object.values(attributeType)));
    this.type = type;

    validateValueIsModelType(value, type);
  }
}
Attribute.type = attributeType;
export default Attribute;
