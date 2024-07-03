"use client";

import { ImgType } from "@/types/components/atoms/ImgType";
import Image from "next/image";
import { ReactElement } from "react";

const Img = ({ src, alt, className, width, height }: ImgType): ReactElement => {
  return <Image src={src} alt={alt} className={className} width={width} height={height} />;
};

export default Img;
