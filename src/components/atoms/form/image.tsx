"use client";

import { ReactElement } from "react";
import Image from "next/image";
import { ImageType } from "@/types/components/atoms/form/ImageType";

/**
 * フォームで画像を表示するためのコンポーネント
 */
const FormImage = ({ imageUrl, alt, width, height }: ImageType): ReactElement => {
  return (
    <Image src={imageUrl} alt={alt} width={width} height={height} />
  );
};

export default FormImage;
