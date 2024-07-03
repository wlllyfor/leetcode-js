type EnumDebitStatus = {
  done: string;
  leave: string;
  notYetDebited: string;
};

const enumDebitStatus: EnumDebitStatus = {
  done: "done",
  leave: "leave",
  notYetDebited: "notYetDebited",
};

export type { EnumDebitStatus };
export { enumDebitStatus };
