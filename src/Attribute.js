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
    // Validate parameters
    ow(name, ow.string);
    ow(type, ow.string.oneOf(Object.values(attributeType)));
    validateValueIsModelType(value, type);

    // Set internal values
    this.name = name;
    this.type = type;
  }
}
Attribute.type = attributeType;
export default Attribute;
