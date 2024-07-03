type EnumOrderSort = {
  createdAtDesc: string;
  createdAtAsc: string;
  idDesc: string;
  idAsc: string;
};

const enumOrderSort: EnumOrderSort = {
  createdAtDesc: "createdAtDesc",
  createdAtAsc: "createdAtAsc",
  idAsc: "idAsc",
  idDesc: "idDesc",
};

export type { EnumOrderSort };
export { enumOrderSort };
