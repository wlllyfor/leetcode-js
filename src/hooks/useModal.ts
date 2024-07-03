"use client";

import { Dispatch, SetStateAction, useState } from "react";

const useModal = (): {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleOnCloseButtonClick: () => void;
} => {
  const [ isOpen, setIsOpen ] = useState<boolean>(false);

  const handleOnCloseButtonClick = () => {
    setIsOpen(prevState => false);
  };

  return { isOpen, setIsOpen, handleOnCloseButtonClick };
};

export { useModal };
