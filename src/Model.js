export default class Model {
  // constructor() {}

  static new(attributes) {
    const NewModel = class {
      constructor(initialValues = {}) {
        attributes.forEach(attribute => {
          this[attribute] = undefined;
          if (attribute in initialValues) {
            this[attribute] = initialValues[attribute];
          }
        });
      }
    };

    return NewModel;
  }
}
