import Attribute from "./Attribute";

export default {
  /**
   * Create a new model
   * @param {string[]|object[]} attributes fields on this model (defaults to type any)
   */
  new: attributes => {
    // Validate attribute params at class creation (before first instantiation)
    attributes.forEach(attribute => {
      if (typeof attribute === "object") {
        if (attribute.type !== undefined && attribute.default !== undefined) {
          Attribute.validateValueType(attribute.default, attribute.type);
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

          // Create attribute as an object with getters/setters
          this.private.get(this)[attribute.name] = new Attribute(
            attributeParams
          );
          Object.defineProperty(this, attribute.name, {
            get() {
              const atributeInternals = this.private.get(this)[attribute.name];
              return atributeInternals.value;
            },
            set(x) {
              const atributeInternals = this.private.get(this)[attribute.name];
              atributeInternals.value = x;
            }
          });

          // If an initial value was passed, use it
          if (attribute.name in initialValues) {
            this[attribute.name] = initialValues[attribute.name];
          }
        }); // END foreach attribute
      } // END Model.new class constructor
    }; // END Model.new class

    return Model;
  }, // END Model.new

  /** Defines data types models attributes may have */
  type: Attribute.type
};
