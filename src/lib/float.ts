export class Float {
  static parseFloatExceptZero(value: string | number | null, defaultValue: number = 0): number {
    if (typeof value === "number") {
      return value;
    }
    return value && !isNaN(Number(value)) ? parseFloat(value) : defaultValue;
  }

  static parseFloatExceptNull(value: string | number | null): number | null {
    if (typeof value === "number") {
      return value;
    }
    return value && !isNaN(Number(value)) ? parseFloat(value) : null;
  }
}
