import { ChangeEventHandler, FocusEvent, MouseEvent } from "react";
import { ItemType } from "@/types/components/molecules/modalItem/employee/hubs/ItemType";

export type AddGroupItemType = {
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onClick?: (e: MouseEvent<HTMLInputElement>) => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  id: string;
  value?: string | number;
  name?: string;
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  maxLength?: number;
  isAutocomplete?: boolean;
  isReadOnly?: boolean;
  initialValue?: string;
  groupAppendFunction?: (group: ItemType[]) => void;
  groupDeleteFunction?: (id: number) => void;
  groups?: { id: number; name: string; }[];
};
