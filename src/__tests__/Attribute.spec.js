import Attribute from "../Attribute";
import Model from "../Model";

describe("Attribute class", () => {
  describe("Successful path", () => {
    it("is succesfully initialized with a name and receives defaults", () => {
      const attribute = new Attribute({ name: "text" });
      expect(attribute.name).toEqual("text");
      expect(attribute.type).toEqual(Model.type.any);
    });

    describe("Supported types", () => {
      it("supports type 'any'", () => {
        const attribute = new Attribute({ name: "text", type: Model.type.any });
        expect(attribute.type).toEqual(Model.type.any);
      });
      it("supports type 'string'", () => {
        const attribute = new Attribute({
          name: "text",
          type: Model.type.string
        });
        expect(attribute.type).toEqual(Model.type.string);
      });
      it("supports type 'boolean'", () => {
        const attribute = new Attribute({
          name: "text",
          type: Model.type.boolean
        });
        expect(attribute.type).toEqual(Model.type.boolean);
      });
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
    it("requires 'type' to be a valid type", () => {
      expect(() => {
        const attribute = new Attribute({ name: "text", type: "bogus" });
        expect(attribute.name).toBeDefined();
      }).toThrow();
    });
  });
});
