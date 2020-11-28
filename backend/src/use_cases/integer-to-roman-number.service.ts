import { RomanNumber } from "../domain/roman-number";

export class IntegerToRomanNumberService {
  private readonly romanHundreds: readonly string[] = ["", "C"];
  private readonly romanTens: readonly string[] = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
  private readonly romanUnits: readonly string[] = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

  perform(integer: number): RomanNumber {
    if (!this.isIntegerBetween(integer, 0, 100)) {
      throw new Error("integer must be an integer between 0 and 100");
    }
    const convertedHundreds: string = this.romanHundreds[Math.floor(integer / 100)];
    const convertedTens: string = this.romanTens[Math.floor((integer % 100) / 10)];
    const convertedUnits: string = this.romanUnits[integer % 10];

    return {value: convertedHundreds + convertedTens + convertedUnits};
  }

  private isIntegerBetween(integer: number, greaterThan: number, lessThan: number): boolean {
    return Number.isInteger(integer) && integer >= greaterThan && integer <= lessThan;
  }
}
