import { v4 as uuid } from "uuid";

export class UUID {
  public static generate = () => {
    return uuid();
  };
}
