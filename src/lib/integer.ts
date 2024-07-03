export class Integer {
  static parseIntExceptZero(value: string | number | null, defaultValue: number = 0): number {
    if (typeof value === "number") {
      return value;
    }
    return value && !isNaN(Number(value)) ? parseInt(value, 10) : defaultValue;
  }

  static parseIntExceptNull(value: string | number | null): number | null {
    if (typeof value === "number") {
      return value;
    }
    return value && !isNaN(Number(value)) ? parseInt(value, 10) : null;
  }

  static boolToInteger(value: boolean): 0 | 1 {
    return value ? 1 : 0;
  }
}
