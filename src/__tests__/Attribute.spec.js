import Attribute from "../Attribute";

describe("Attribute class", () => {
  describe("Successful path", () => {
    it("is succesfully initialized with a name", () => {
      const attribute = new Attribute({ name: "text" });
      expect(attribute.name).toEqual("text");
    });
  });
  describe("Error cases", () => {
    it("requires name", () => {
      expect(() => {
        const attribute = new Attribute();
        attribute.name = "item";
      }).toThrow();
    });
    it("requires name to be a string", () => {
      expect(() => {
        const attribute = new Attribute({ name: false });
        expect(attribute.name).toBeDefined();
      }).toThrow();
    });
  });
});
