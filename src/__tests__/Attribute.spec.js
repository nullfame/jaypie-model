import Attribute from "../Attribute";

describe("Attribute class", () => {
  it("is succesfully initialized with a name", () => {
    const attribute = new Attribute({ name: "text" });
    expect(attribute.name).toEqual("text");
  });
});
