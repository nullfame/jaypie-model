import { Model } from "..";

// eslint-disable-next-line import/prefer-default-export
export const TodoItem = Model.new([
  { name: "text", default: null },
  { name: "done", default: false }
]);
