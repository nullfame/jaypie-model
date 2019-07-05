import Attribute from "../Attribute";

describe("Attribute class", () => {
  describe("Successful path", () => {
    it("is succesfully initialized with a name", () => {
      const attribute = new Attribute({ name: "text" });
      expect(attribute.name).toEqual("text");
    });
  });
  describe("Error cases", () => {
    //
  });
});
