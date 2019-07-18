import ow from "ow";

const attributeType = {
  any: "ANY",
  boolean: "BOOLEAN",
  date: "DATE",
  number: "NUMBER",
  string: "STRING"
};

function validateValueType(value, type) {
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
    validateValueType(value, type);

    // Initialize WeakMap for internals
    this.private = new WeakMap();
    this.private.set(this, {});

    // Set internal values
    this.private.get(this).name = name;
    this.private.get(this).type = type;
    this.private.get(this).value = value;

    // Allow read-only access to name
    Object.defineProperty(this, "name", {
      get() {
        return this.private.get(this).name;
      },
      set() {
        throw Error(
          "Jaypie: Attribute: Unsupported Operation: Cannot assign to read-only property: name"
        );
      }
    });
    Object.defineProperty(this, "type", {
      get() {
        return this.private.get(this).type;
      },
      set() {
        throw Error(
          "Jaypie: Attribute: Unsupported Operation: Cannot assign to read-only property: type"
        );
      }
    });
    Object.defineProperty(this, "value", {
      get() {
        return this.private.get(this).value;
      },
      set(newValue) {
        validateValueType(newValue, this.type);
        this.private.get(this).value = newValue;
      }
    });
  }
}
Attribute.type = attributeType;
Attribute.validateValueType = validateValueType;
export default Attribute;
