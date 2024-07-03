import humps from "humps";

export class Str {
  static decamelizeKeys<T extends Record<string, unknown>>(
    obj: T,
  ): {
    [K in keyof T]: T[K] extends Record<string, unknown> ? ReturnType<typeof Str.decamelizeKeys> : T[K];
  } {
    const newObj: Record<string, unknown> = {};
    Object.keys(obj).forEach(key => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      let value: Record<string, unknown> = obj[key as keyof T];

      if (value && typeof value === "object" && !Array.isArray(value) && !(value instanceof File)) {
        value = Str.decamelizeKeys(value as Record<string, unknown>);
      }

      if (Array.isArray(value)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        value = value.map(item => {
          if (item && typeof item === "object" && !(item instanceof File)) {
            return Str.decamelizeKeys(item as Record<string, unknown>);
          }
          return item;
        });
      }

      const newKey: string = humps.decamelize(key);
      newObj[newKey] = value;
    });
    return newObj as {
      [K in keyof T]: T[K] extends Record<string, unknown> ? ReturnType<typeof Str.decamelizeKeys> : T[K];
    };
  }
}
