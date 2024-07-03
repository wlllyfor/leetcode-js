"use client";

import { ReactElement } from "react";
import FormImage from "@/components/atoms/form/image";
import Label from "@/components/atoms/form/label";
import InputWrapper24 from "@/components/atoms/div/wrapper/inputWrapper24";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { ImageGroupType } from "@/types/components/molecules/form/image/ImageGroupType";

const ImageGroup = ({ text, isRequired, imageUrl, alt, width, height }: ImageGroupType): ReactElement => {
  const labelProps: LabelType = {
    text: text,
    isRequired: isRequired || false,
  };

  const imageProps = {
    imageUrl,
    alt,
    width,
    height,
  };

  return (
    <InputWrapper24>
      <Label {...labelProps} />
      <FormImage {...imageProps} />
    </InputWrapper24>
  );
};

export default ImageGroup;
