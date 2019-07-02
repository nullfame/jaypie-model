export default {
  /**
   * Create a new model
   * @param {string[]|object[]} attributes fields on this model (defaults to type string)
   */
  new: attributes => {
    const Model = class {
      constructor(initialValues = {}) {
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

          // Set the default value of this attribute or null
          if ("default" in attribute) {
            this[attribute.name] = attribute.default;
          } else {
            this[attribute.name] = undefined;
          }

          // If an initial value was passed, use it
          if (attribute.name in initialValues) {
            this[attribute.name] = initialValues[attribute.name];
          }
        });
      } // END Model.new class constructor
    }; // END Model.new class

    return Model;
  }, // END Model.new

  /** Defines data types models attributes may have */
  type: {
    any: "ANY",
    boolean: "BOOLEAN",
    string: "STRING"
  } // END Model.type
};
