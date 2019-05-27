export default {
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
