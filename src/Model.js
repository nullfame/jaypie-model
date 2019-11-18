import Attribute from "./Attribute";
import proxyHandler from "./lib/proxy";

const RESERVED_ATTRIBUTE_NAMES = ["inspect", "private"];

export default {
  /**
   * Create a new model
   * @param {string[]|object[]} configuration fields on this model (defaults to type any)
   */
  new: configuration => {
    let attributes;
    if (Array.isArray(configuration)) {
      attributes = configuration;
    } else if (typeof configuration === "object") {
      // eslint-disable-next-line prefer-destructuring
      attributes = configuration.attributes;
      if (!Array.isArray(attributes)) {
        throw Error(
          `Jaypie: Model.new: Invalid Configuration: attribute not type array`
        );
      }
    } else {
      throw Error(`Jaypie: Model.new: Invalid Configuration: ${configuration}`);
    }

    // Validate attributes array has items
    if (attributes.length === 0) {
      throw Error(
        `Jaypie: Model.new: Invalid Configuration: attribute array cannot be empty`
      );
    }

    // Validate attribute params at class creation (before first instantiation)
    attributes.forEach(attribute => {
      if (typeof attribute === "object") {
        if (attribute.type !== undefined && attribute.default !== undefined) {
          Attribute.validateValueType(attribute.default, attribute.type);
        }

        // Check attribute name is valid
        if (RESERVED_ATTRIBUTE_NAMES.indexOf(attribute.name) > -1) {
          throw Error(
            `Jaypie: Model.new: Invalid Configuration: Invalid Attribute Name: ${
              attribute.name
            }`
          );
        }
      }
      if (typeof attribute === "string") {
        // Check attribute name is valid
        if (RESERVED_ATTRIBUTE_NAMES.indexOf(attribute) > -1) {
          throw Error(
            `Jaypie: Model.new: Invalid Configuration: Invalid Attribute Name: ${attribute}`
          );
        }
      }
    });

    // Build class to return
    const Model = class {
      constructor(initialValues = {}) {
        // Store all private members in a WeakMap
        this.private = new WeakMap();
        this.private.set(this, {});

        // Iterate attributes and create the Model object
        attributes.forEach(attribute => {
          // Make sure the attribute is defined as a string or an object
          switch (typeof attribute) {
            // When its a string, cast it into an object with a name
            case "string":
              // eslint-disable-next-line no-param-reassign
              attribute = { name: attribute };
              break;
            // When its an object, make sure it has a name
            case "object":
              if (!("name" in attribute)) {
                throw Error(
                  "Jaypie: Model.new: Invalid Configuration: Missing Required: name"
                );
              }
              break;
            // Otherwise, error out
            default:
              throw Error(
                "Jaypie: Model.new: Invalid Configuration: Invalid Type: attribute must be type (object|string)"
              );
          }

          // Build attribute (object) parameters
          const attributeParams = Object.assign({}, attribute);
          attributeParams.value = attribute.default;
          delete attributeParams.default;

          // If an initial value was passed, use it
          if (attribute.name in initialValues) {
            attributeParams.value = initialValues[attribute.name];
          }

          // Create attribute as an object with getters/setters
          this.private.get(this)[attribute.name] = new Attribute(
            attributeParams
          );
        }); // END foreach attribute

        // Proxy handler methods
        const handler = proxyHandler({
          get: (model, property) => {
            // Try returning the attribute value
            const internalAttribute = model.private.get(model)[property];
            if (typeof internalAttribute === "object") {
              return internalAttribute.value;
            }

            // Throw an error if this is an unset attribute
            if (typeof property === "string" && !(property in model)) {
              if (RESERVED_ATTRIBUTE_NAMES.indexOf(property) === -1) {
                throw Error(
                  `Jaypie: Model.get: Not Implemented: Missing Attribute: ${property}`
                );
              }
            }

            return Reflect.get(model, property);
          },
          getOwnPropertyDescriptor: (model, property) => {
            const internal = model.private.get(model);
            // If this is a private variable, return it
            if (Object.keys(internal).indexOf(property) > -1) {
              // But first modify the value attribute
              const propertyDescriptor = Object.getOwnPropertyDescriptor(
                internal,
                property
              );
              propertyDescriptor.value = internal[property].value;
              return propertyDescriptor;
            }
            // ...otherwise defer to the top-level properties
            return Reflect.getOwnPropertyDescriptor(model, property);
          },
          ownKeys: model => {
            return Object.keys(model.private.get(model));
          },
          set: (model, property, value) => {
            const internalAttribute = model.private.get(model)[property];
            if (typeof internalAttribute === "object") {
              internalAttribute.value = value;
              return true;
            }
            throw Error(
              `Jaypie: Model.set: Not Implemented: Missing Attribute: ${property}`
            );
          }
        });
        // Return as proxy
        return new Proxy(this, handler);
      } // END Model.new class constructor

      toString() {
        const keys = Object.keys(this);
        const returnString = `${keys.reduce((accumulator, key) => {
          return `${accumulator} ${key}="${this[key]}"`;
        }, "[Model:")}]`;
        return returnString;
      }
    }; // END Model.new class

    Model.toString = () => {
      return "[Class: Model]";
    };
    return Model;
  }, // END Model.new

  /** Defines data types models attributes may have */
  type: Attribute.type
};
