import { Query } from "../src/query";

describe("Query", () => {
  describe(".convertToDimension", () => {
    it("one position", () => {
      let query = new Query("1");
      let d1 = query.convertToDimension("t");
      expect(d1.axis).toEqual("t");
      expect(d1.positions.size).toEqual(1);
    });
    it("multiple positions", () => {
      let query = new Query("1 and 2 or 3");
      let d1 = query.convertToDimension("t");
      expect(d1.axis).toEqual("t");
      expect(d1.positions.size).toEqual(3);
    });
  });
  describe(".convertToSpace", () => {
    it("one space", () => {
      let query = new Query("city is mel or syd");
      let s1 = query.convertToSpace();
      expect(s1.dimensions.size).toEqual(1);
    });
    it("multiple spaces", () => {
      let query = new Query(
        "city is perth or syd or country is au and age is 10"
      );
      let s1 = query.convertToSpace();
      expect(s1.dimensions.size).toEqual(3);
    });
    it("multiple spaces concatination with same axis", () => {
      let q1 = new Query("city is perth and age is 10");
      let q2 = new Query("city is perth and age is 20");
      let s1 = q1.convertToSpace();
      let s2 = q2.convertToSpace();
      s1.concat("or", s2);
      expect(s1.points().length).toEqual(2);
    });
  });
});
