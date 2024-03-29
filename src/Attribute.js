import ow from "ow";
import proxyHandler from "./lib/proxy";

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

    // Define read-only private fields
    const readonly = ["name", "type"];

    // Proxy handler methods
    const handler = proxyHandler({
      get: (target, property) => {
        const internal = target.private.get(target);
        // If this is a private variable, return it
        if (Object.keys(internal).indexOf(property) > -1) {
          return internal[property];
        }
        // ...otherwise defer to the top-level properties
        return Reflect.get(target, property);
      },
      getOwnPropertyDescriptor: (target, property) => {
        const internal = target.private.get(target);
        // If this is a private variable, return it
        if (Object.keys(internal).indexOf(property) > -1) {
          return Object.getOwnPropertyDescriptor(internal, property);
        }
        // ...otherwise defer to the top-level properties
        return Reflect.getOwnPropertyDescriptor(target, property);
      },
      ownKeys: target => {
        return Object.keys(target.private.get(target));
      },
      set: (target, property, newValue) => {
        if (readonly.indexOf(property) > -1) {
          throw Error(
            `Jaypie: Attribute: Unsupported Operation: Cannot assign to read-only property: ${property}`
          );
        }
        const internals = target.private.get(target);
        if (property === "value") {
          validateValueType(newValue, internals.type);
          internals.value = newValue;
          return true;
        }
        return false;
      }
    });
    // Return as proxy
    return new Proxy(this, handler);
  }

  toString() {
    return `Attribute: (${this.type}) ${this.name}="${this.value}"`;
  }
}
Attribute.type = attributeType;
Attribute.validateValueType = validateValueType;
export default Attribute;
