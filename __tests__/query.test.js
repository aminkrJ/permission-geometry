import { Query } from "../src/query";

describe("Query", () => {
  describe(".fromObject", () => {
    it("generates", () => {
      let query = new Query();
      expect(query.fromObject({ city: [1, 2], country: 4 })).toEqual(
        "city is 1 or 2 and country is 4"
      );
    });
  });
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
    it("multiple spaces or concatination with same axis", () => {
      let q1 = new Query("city is perth and age is 10");
      let q2 = new Query("city is perth and age is 20");
      let s1 = q1.convertToSpace();
      let s2 = q2.convertToSpace();
      let union = s1.concat("or", s2);
      expect(union.length).toEqual(2);
    });
    it("multiple spaces and concatination with same axis", () => {
      let q1 = new Query("city is perth and age is 10");
      let q2 = new Query("city is perth and age is 20");
      let s1 = q1.convertToSpace();
      let s2 = q2.convertToSpace();
      let intersection = s1.concat("and", s2);
      expect(intersection.length).toEqual(0);
    });
    it("multiple spaces and concatination with same axis", () => {
      let q1 = new Query("city is perth and age is 10");
      let q2 = new Query("city is perth and age is 20");
      let s1 = q1.convertToSpace();
      let s2 = q2.convertToSpace();
      let intersection = s1.concat("and", s2);
      expect(intersection.length).toEqual(0);
    });
    it("multiple spaces and concatination with same axis", () => {
      let q1 = new Query("city is perth and age is 10 or 20");
      let q2 = new Query("city is perth and age is 20");
      let s1 = q1.convertToSpace();
      let s2 = q2.convertToSpace();
      let intersection = s1.concat("and", s2);
      expect(intersection.length).toEqual(1);
    });
  });
});
