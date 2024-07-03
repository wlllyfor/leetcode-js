"use client";

import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import Input from "@/components/atoms/form/input";
import Label from "@/components/atoms/form/label";
import InputWrapper80 from "@/components/atoms/div/wrapper/inputWrapper80";
import ModalClickableButton from "@/components/atoms/button/modalClickableButton";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { InputType } from "@/types/components/atoms/form/InputType";
import { ItemType } from "@/types/components/molecules/modalItem/employee/hubs/ItemType";
import { AddGroupItemType } from "@/types/components/molecules/modalItem/employee/hubs/AddGroupItemType";
import ButtonGroup from "@/components/molecules/buttonGroup/employee/close/buttonGroup";
import { If, Then } from "react-if";

const AddGroupItem = ({
  onFocus,
  onBlur,
  onClick,
  id,
  name,
  placeholder = "班名を入力",
  isRequired = false,
  isDisabled = false,
  maxLength,
  isAutocomplete = false,
  isReadOnly = false,
  initialValue = "",
  groups = [],
  groupAppendFunction = () => {},
  groupDeleteFunction = () => {},
}: AddGroupItemType): ReactElement => {
  const [ values, setValues ] = useState<ItemType[]>(
    isReadOnly ? [ { id: Date.now(), name: initialValue } ] : [ { id: Date.now(), name: "" } ],
  );
  const [ isInitialized, setIsInitialized ] = useState<boolean>(false);

  const handleChange = (id: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const newValues = values.map(item => (item.id === id ? { ...item, name: event.target.value } : item));
    setValues(newValues);
  };

  const addInput = () => {
    setValues([ ...values, { id: Date.now(), name: "" } ]);
  };

  const deleteInput = (id: number) => {
    const newValues = values.filter(item => item.id !== id);
    setValues(newValues);
  };

  const handleDelete = (id: number) => {
    if (groupDeleteFunction) {
      groupDeleteFunction(id);
    }
    deleteInput(id);
  };

  const labelProps: LabelType = {
    text: "班",
    isRequired: false,
  };

  useEffect(() => {
    groupAppendFunction && groupAppendFunction(values);
  }, [ values, groupAppendFunction ]);

  /** 初期値のセット */
  useEffect(() => {
    if (!isInitialized && groups.length > 0) {
      const newGroup = groups.map(group => ({ id: group.id, name: group.name }));
      setValues(newGroup);
      setIsInitialized(true);
    }
  }, [ groups, isInitialized ]);

  return (
    <InputWrapper80>
      <Label {...labelProps} />
      {values.map((item, index) => {
        const inputProps: InputType = {
          onFocus: onFocus,
          onBlur: onBlur,
          onClick: onClick,
          onChange: handleChange(item.id),
          id: `${id}-${item.id}`,
          value: item.name,
          name: `${id}-${item.id}`,
          placeholder: placeholder,
          isRequired: isRequired,
          isDisabled: isDisabled,
          maxLength: maxLength,
          isAutocomplete: isAutocomplete,
          isReadOnly: isReadOnly,
        };
        return (
          <div key={item.id} className="mb-2 relative">
            <div className="max-w-[90%]">
              <Input {...inputProps} />
            </div>
            <If condition={index !== 0}>
              <Then>
                {/* 班削除ボタン */}
                <ButtonGroup clickFunction={() => handleDelete(item.id)} />
              </Then>
            </If>
          </div>
        );
      })}
      <ModalClickableButton color={"blue"} text={"追加"} onClick={addInput} />
    </InputWrapper80>
  );
};

export default AddGroupItem;
