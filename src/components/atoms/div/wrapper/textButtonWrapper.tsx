"use client";

import { ReactNode } from "react";

/**
 * テキストだけのボタンをラップするコンポーネント
 */
const TextButtonWrapper = ({ children }: { children: ReactNode; }): ReactNode => {
  return (
    <div className="block text-center mt-5">
      {children}
    </div>
  );
};

export default TextButtonWrapper;
