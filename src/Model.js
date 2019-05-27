export default {
  /**
   * Create a new model
   * @param {string[]} attributes fields on this model (defaults to type string)
   */
  new: attributes => {
    const Model = class {
      constructor(initialValues = {}) {
        attributes.forEach(attribute => {
          this[attribute] = undefined;
          if (attribute in initialValues) {
            this[attribute] = initialValues[attribute];
          }
        });
      }
    };

    return Model;
  }
};
