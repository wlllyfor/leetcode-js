"use client";

import React, { ReactNode } from "react";
import { RecoilRoot as BaseRecoilRoot } from "recoil";

type PropType = {
  children: ReactNode;
};

const RecoilRoot = ({ children }: PropType) => {
  return <BaseRecoilRoot>{children}</BaseRecoilRoot>;
};
export { RecoilRoot };
