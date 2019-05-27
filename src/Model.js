export default {
  /**
   * Create a new model
   * @param {string[]} attributes fields on this model (defaults to type string)
   */
  new: attributes => {
    const Model = class {
      constructor(initialValues = {}) {
        attributes.forEach(attribute => {
          switch (typeof attribute) {
            case "string":
              // eslint-disable-next-line no-param-reassign
              attribute = { name: attribute };
              break;
            case "object":
              if (!("name" in attribute))
                throw Error(
                  "Jaypie: Model.new: attribute missing 'name' (invalid configuration)"
                );
              break;
            default:
              throw Error(
                "Jaypie: Model.new: unexpected attribute type (invalid configuration)"
              );
          }

          if ("default" in attribute) {
            this[attribute.name] = attribute.default;
          } else {
            this[attribute.name] = undefined;
          }
          if (attribute.name in initialValues) {
            this[attribute.name] = initialValues[attribute.name];
          }
        });
      }
    };

    return Model;
  }
};
