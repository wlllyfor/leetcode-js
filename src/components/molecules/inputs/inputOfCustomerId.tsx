import { ReactElement } from "react";
import Input from "@/components/atoms/form/input";
import Label from "@/components/atoms/form/label";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { InputType } from "@/types/components/atoms/form/InputType";
import { InputOfCustomerIdType } from "@/types/components/molecules/InputOfCustomerIdType";

const InputOfCustomerId = ({
  id,
  text,
  value,
  title,
  isRequired = false,
  isDisabled = false,
  isAutocomplete = false,
  changeFunction,
}: InputOfCustomerIdType): ReactElement => {
  const inputProps: InputType = {
    id: id,
    value: value,
    onChange: changeFunction,
    isRequired: isRequired,
    isDisabled: isDisabled,
    isAutocomplete: isAutocomplete,
  };
  const labelProps: LabelType = {
    htmlFor: id,
    text: text,
    isRequired: isRequired,
  };
  return (
    <div className="w-36 relative">
      <Label {...labelProps} />
      <div className="">
        <div className="absolute h-[34px] text-white bottom-0 left-0 bg-[#7a7a7a] pt-[6px] px-3 rounded-l-md">{title}</div>
        <Input {...inputProps} />
      </div>
    </div>
  );
};

export default InputOfCustomerId;
