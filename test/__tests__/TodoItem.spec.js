import ClassicTodoItem from "../models/TodoItem";
import { TodoItem } from "../models";

describe("ClassicTodoItem", () => {
  it("should have a default state", () => {
    const item = new ClassicTodoItem();
    expect(item.text).toEqual(null);
    expect(item.done).toEqual(false);
  });
  it("should accept a text and done state", () => {
    const item = new ClassicTodoItem({ text: "My Item", done: false });
    expect(item.text).toEqual("My Item");
    expect(item.done).toEqual(false);
  });
  it("should allow changing state", () => {
    const item = new ClassicTodoItem();
    expect(item.text).toEqual(null);
    expect(item.done).toEqual(false);
    item.text = "My Item";
    item.done = true;
    expect(item.text).toEqual("My Item");
    expect(item.done).toEqual(true);
  });
});

describe("TodoItem", () => {
  it("should have a default state", () => {
    const item = new TodoItem();
    expect(item.text).toEqual(undefined);
    expect(item.done).toEqual(undefined);
  });
  it("should accept a text and done state", () => {
    const item = new TodoItem({ text: "My Item", done: false });
    expect(item.text).toEqual("My Item");
    expect(item.done).toEqual(false);
  });
});
