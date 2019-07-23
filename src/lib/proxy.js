const defaultReflector = {
  getPrototypeOf: target => Reflect.getPrototypeOf(target),
  setPrototypeOf: (target, prototype) =>
    Reflect.setPrototypeOf(target, prototype),
  isExtensible: target => Reflect.isExtensible(target),
  preventExtensions: target => Reflect.preventExtensions(target),
  getOwnPropertyDescriptor: (target, property) =>
    Reflect.getOwnPropertyDescriptor(target, property),
  defineProperty: (target, attributes) =>
    Reflect.defineProperty(target, attributes),
  has: target => Reflect.has(target),
  get: (target, property, receiver) => Reflect.get(target, property, receiver),
  set: (target, value, receiver) => Reflect.set(target, value, receiver),
  deleteProperty: (target, property) =>
    Reflect.deleteProperty(target, property),
  ownKeys: target => Reflect.ownKeys(target),
  apply: (target, thisArgument, argumentsList) =>
    Reflect.apply(target, thisArgument, argumentsList),
  construct: (target, argumentsList, newTarget) =>
    Reflect.construct(target, argumentsList, newTarget)
};
export default (handler = {}) => Object.assign({}, defaultReflector, handler);
