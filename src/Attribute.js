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

    // Initialize WeakMap for internals
    this.private = new WeakMap();
    this.private.set(this, {});

    // Set internal values
    this.private.get(this).name = name;
    this.private.get(this).type = type;

    // Allow read-only access to name
    Object.defineProperty(this, "name", {
      get() {
        return this.private.get(this).name;
      }
    });
    Object.defineProperty(this, "type", {
      get() {
        return this.private.get(this).type;
      }
    });
  }
}
Attribute.type = attributeType;
export default Attribute;
