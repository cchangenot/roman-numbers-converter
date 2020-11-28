import { IntegerToRomanNumberService } from "./integer-to-roman-number.service";

describe("IntegerToRomanNumberService", () => {
  let integerToRomanNumber: IntegerToRomanNumberService;

  beforeEach(() => {
    integerToRomanNumber = new IntegerToRomanNumberService();
  });

  describe("perform", () => {
    [
      "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
      "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX",
      "XXI", "XXII", "XXIII", "XXIV", "XXV", "XXVI", "XXVII", "XXVIII", "XXIX", "XXX",
      "XXXI", "XXXII", "XXXIII", "XXXIV", "XXXV", "XXXVI", "XXXVII", "XXXVIII", "XXXIX", "XL",
      "XLI", "XLII", "XLIII", "XLIV", "XLV", "XLVI", "XLVII", "XLVIII", "XLIX", "L",
      "LI", "LII", "LIII", "LIV", "LV", "LVI", "LVII", "LVIII", "LIX", "LX",
      "LXI", "LXII", "LXIII", "LXIV", "LXV", "LXVI", "LXVII", "LXVIII", "LXIX", "LXX",
      "LXXI", "LXXII", "LXXIII", "LXXIV", "LXXV", "LXXVI", "LXXVII", "LXXVIII", "LXXIX", "LXXX",
      "LXXXI", "LXXXII", "LXXXIII", "LXXXIV", "LXXXV", "LXXXVI", "LXXXVII", "LXXXVIII", "LXXXIX", "XC",
      "XCI", "XCII", "XCIII", "XCIV", "XCV", "XCVI", "XCVII", "XCVIII", "XCIX", "C"
    ]
      .forEach((romanNumber: string, integer: number) => {
        it(`should return ${romanNumber} as the roman representation of ${integer}`, () => {
          expect(integerToRomanNumber.perform(integer)).toEqual({value: romanNumber});
        });
      });

    it("should throw when integer parameter is not a number between 0 and 100", () => {
      expect(() => integerToRomanNumber.perform(null as unknown as number))
        .toThrow("integer must be an integer between 0 and 100");
      expect(() => integerToRomanNumber.perform(undefined as unknown as number))
        .toThrow("integer must be an integer between 0 and 100");
      expect(() => integerToRomanNumber.perform(-1))
        .toThrow("integer must be an integer between 0 and 100");
      expect(() => integerToRomanNumber.perform(101))
        .toThrow("integer must be an integer between 0 and 100");
      expect(() => integerToRomanNumber.perform(1.1))
        .toThrow("integer must be an integer between 0 and 100");
    });
  });
});
