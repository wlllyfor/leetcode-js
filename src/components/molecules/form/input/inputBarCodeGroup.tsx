"use client";

import { ReactElement, useState, useRef } from "react";
import {
  arrow,
  flip,
  FloatingArrow,
  offset,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";import Input from "@/components/atoms/form/input";
import Label from "@/components/atoms/form/label";
import InputWrapper80 from "@/components/atoms/div/wrapper/inputWrapper80";
import InputCheckbox from "@/components/molecules/form/input/inputCheckbox";
import { LabelType } from "@/types/components/atoms/form/LabelType";

const InputBarCodeGroup = (): ReactElement => {
  const [ isTooltipOpen, setIsTooltipOpen ] = useState(false);
  const arrowRef = useRef(null);
  const { refs, floatingStyles, context } = useFloating({
    placement: "top",
    open: isTooltipOpen,
    onOpenChange: setIsTooltipOpen,
    middleware: [
      arrow({
        element: arrowRef,
      }),
      offset(12),
      flip(),
    ],
  });
  const hover = useHover(context);
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);
  const labelProps: LabelType = {
    text: "バーコード情報",
  };

  return (
    <>
      <InputWrapper80>
        <div ref={refs.setReference} {...getReferenceProps()}>
          <Label {...labelProps} hover />
        </div>
        {isTooltipOpen && (
          <div ref={refs.setFloating} {...getFloatingProps()} style={floatingStyles} className="p-2 bg-black text-white text-xs rounded-md z-10">
            バーコード情報について商品をどのバーコードで管理を行うかを入力くださいませ。未記入の場合は、弊社独自のバーコードで商品を保管管理を行います。
            <FloatingArrow ref={arrowRef} context={context} />
          </div>
        )}
        <div className="flex gap-2">
          <div className="mt-1">
            {/* JAN */}
            <InputCheckbox id="" text="JANコード" checked={false} isReverse />
            <div className="mt-1">
              <Input
                id={""}
                value={""}
                onChange={()=>{}}
                isRequired={false}
                isDisabled={false}
                isAutocomplete={false}
              />
            </div>
          </div>
          <div className="mt-1">
            {/* FNSKE */}
            <InputCheckbox id="" text="FNSKU" checked={false} isReverse />
            <div className="mt-1">
              <Input
                id={""}
                value={""}
                onChange={()=>{}}
                isRequired={false}
                isDisabled={false}
                isAutocomplete={false}
              />
            </div>
          </div>
          <div className="mt-1">
            {/* その他 */}
            <InputCheckbox id="" text="その他" checked={false} isReverse />
            <div className="mt-1">
              <Input
                id={""}
                value={""}
                onChange={()=>{}}
                isRequired={false}
                isDisabled={false}
                isAutocomplete={false}
              />
            </div>
          </div>
        </div>
      </InputWrapper80>
    </>
  );
};

export default InputBarCodeGroup;
