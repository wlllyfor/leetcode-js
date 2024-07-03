"use client";

import { ReactElement, useEffect, useId, useState } from "react";
import ReactSelect from "react-select";
import { SelectType } from "@/types/components/atoms/form/SelectType";
import { If, Then } from "react-if";

const Select = ({
  options, isMulti, placeholder = "", changeFunction, changeMultiItemFunction, formatOptionLabel,
  changeInspectItemFunction, value, id = "select", ...rest
}: SelectType): ReactElement => {
  const [ isMounted, setIsMounted ] = useState<boolean>(false);
  useEffect(() => { setIsMounted(prevState => true) }, [ setIsMounted ] );


  const executableFunction = changeInspectItemFunction || (isMulti ? changeMultiItemFunction : changeFunction);

  /**
   * NOTE: クライアントサイドでレンダリングする際に、idとinstanceIdを付与したり、描画タイミングを制御しないと "Prop `id` did not match. Server" というワーニングが出続ける
   * https://github.com/JedWatson/react-select/issues/5459
   */
  const instanceId = useId();
  const _id = `${id}-${instanceId}`;

  return (
    <If condition={isMounted}>
      <Then>
        <ReactSelect
          id={_id}
          instanceId={instanceId}
          options={options} isMulti={isMulti} placeholder={placeholder}
          value={value}
          // @ts-ignore
          onChange={executableFunction} {...rest}
          formatOptionLabel={formatOptionLabel}
        />
      </Then>
    </If>
  )
};

export default Select;
