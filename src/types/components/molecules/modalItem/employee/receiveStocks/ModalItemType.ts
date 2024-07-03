import { MouseEvent } from "react";

/**
 * 入荷依頼管理>編集モーダルの型
 */
export type ModalItemType = {
  handleDetailAddition: (event: MouseEvent<HTMLButtonElement>) => void;
};
