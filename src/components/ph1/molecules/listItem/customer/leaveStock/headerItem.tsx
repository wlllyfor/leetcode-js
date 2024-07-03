"use client";

import { Dispatch, ReactElement, ReactNode, SetStateAction, useCallback, useEffect, useState } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import Checkbox from "@/components/atoms/checkbox";
import Paragraph from "@/components/atoms/paragraph";
import Status from "@/components/molecules/status";
import SmallButton from "@/components/atoms/button/smallButton";
import { LeaveStockTableDbType } from "@/types/db/leaveStock/leaveStock";
import LeaveStockEditModal from "@/components/molecules/modal/customer/leaveStock/leaveStockEditModal";
import LeaveStockDeleteModal from "@/components/molecules/modal/customer/leaveStock/leaveStockDeleteModal";
import Link from "next/link";

const HeaderItem = ({
  leaveStock,
  handleOnChangeChecks,
  children,
  // 修正関連
  isEditModalOpen,
  setIsEditModalOpen,
  handleOnEditModalCloseButtonClick,
  // 削除関連
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  handleOnDeleteModalCloseButtonClick,
}: {
  leaveStock: LeaveStockTableDbType;
  handleOnChangeChecks: (checked: boolean, id: number) => Promise<void>;
  children: ReactNode;
  isEditModalOpen: boolean;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
  handleOnEditModalCloseButtonClick: () => void;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  handleOnDeleteModalCloseButtonClick: () => void;
}): ReactElement => {
  // useStates
  const [ checked, setChecked ] = useState<boolean>(false);

  // レンダリング中かどうかのフラグ
  const [ isFirstRender, setIsFirstRender ] = useState(true);

  // useCallbackを使用して関数をメモ化
  const memoizedHandleOnChangeChecks = useCallback(handleOnChangeChecks, [ checked, leaveStock.id ]);

  // useEffects
  useEffect((): void => {
    if (!isFirstRender) {
      (async (): Promise<void> => {
        if (leaveStock.id) {
          await memoizedHandleOnChangeChecks(checked, leaveStock.id);
        }
      })();
    } else {
      setIsFirstRender(prevState => false);
    }
  }, [ checked, isFirstRender, memoizedHandleOnChangeChecks, leaveStock.id ]);

  // handle
  const handleOnChangeChecked = async (newChecked: boolean): Promise<void> => {
    setChecked(prevState => newChecked);
  };

  /**
   * 更新ボタン押下イベント
   * 更新処理はモーダルで行う
   */
  const handleOnClickUpdateButton = (): void => {
    setIsEditModalOpen(prevState => false);
  };

  /**
   * 削除ボタン押下イベント
   * 削除処理はモーダルで行う
   */
  const handleOnClickDestroyButton = (): void => {
    setIsDeleteModalOpen(prevState => false);
  };

  const classNamesMr16 = [
    commonClasses.flex__wrapper,
    commonClasses.aline_center,
    commonClasses.mt_8,
    commonClasses.c_mr_16,
  ];

  const classNamesMbAuto = [
    commonClasses.flex__wrapper,
    commonClasses.aline_end,
    commonClasses.column,
    commonClasses.ml_auto,
    commonClasses.mr_16,
    commonClasses.mb_auto,
  ];

  return (
    <>
      <WhiteWideWrapper>
        <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center}`}>
          <Checkbox
            id={leaveStock.id.toString()}
            isChecked={checked}
            value={leaveStock.id || ""}
            changeFunction={async (): Promise<void> => {
              await handleOnChangeChecked(!checked);
            }}
          />
          <div className={commonClasses.ml_16}>
            <div className={classNamesMr16.join(" ")}>
              <Paragraph isBold>{leaveStock.code}</Paragraph>
              <Paragraph>追跡番号：{leaveStock.trackingNo || "なし"}</Paragraph>
              <Paragraph>注文ID：{leaveStock.orderDetailId || "なし"}</Paragraph>
              <Paragraph>
                手数料：
                {leaveStock.leaveStockCommissions.reduce((total, leaveStockCommission) => {
                  return total + leaveStockCommission.price * leaveStockCommission.quantity;
                }, 0)}
                円
              </Paragraph>
            </div>
            <div className={classNamesMr16.join(" ")}>
              <Paragraph>出荷日：{leaveStock.leavedOn || "未定"}</Paragraph>
              <Paragraph>
                送料：
                {leaveStock.leaveStockPacks.reduce((total, leaveStockPack) => {
                  return total + leaveStockPack.postage * leaveStockPack.boxesQuantity;
                }, 0) +
                  (leaveStock.orderDetail?.postage || 0) * (leaveStock.orderDetail?.quantity || 1)}
                円
              </Paragraph>
            </div>
            <div className={classNamesMr16.join(" ")}>
              <Paragraph>
                配送先：{leaveStock.prefectureName}
                {leaveStock.cityName}
                {leaveStock.townName}
                {leaveStock.buildingName}
              </Paragraph>
            </div>
            <div className={classNamesMr16.join(" ")}>
              {leaveStock.shipFromAddress ? (
                <Paragraph>
                  配送元：
                  {leaveStock.shipFromAddress.prefectureName}
                  {leaveStock.shipFromAddress.cityName}
                  {leaveStock.shipFromAddress.townName}
                  {leaveStock.shipFromAddress.buildingName}
                </Paragraph>
              ) : (
                <Paragraph>配送元：未設定</Paragraph>
              )}
            </div>
            <div className={classNamesMr16.join(" ")}>
              <Paragraph>備考：{leaveStock.publicRemarks || "なし"}</Paragraph>
              {leaveStock.publicRemarksFilePath ? (
                <Paragraph isLink>
                  <Link href={leaveStock.publicRemarksFilePath} target={"_blank"}>
                    備考添付ファイル
                  </Link>
                </Paragraph>
              ) : (
                <Paragraph>備考添付ファイル：なし</Paragraph>
              )}
            </div>
          </div>
          <div className={classNamesMbAuto.join(" ")}>
            <div className={`${commonClasses.flex__wrapper}`}>
              <div className={commonClasses.mr_8}>
                <Paragraph isGray>{leaveStock.createdOn} 依頼</Paragraph>
              </div>
              <Status color={"dark"}>{leaveStock.statusLabel}</Status>
            </div>
            {leaveStock.isEditableStatus && (
              <div className={commonClasses.mt_16}>
                <div className={commonClasses.mt_4}>
                  <SmallButton
                    text={"編集"}
                    isBlue
                    clickFunction={() => {
                      setIsEditModalOpen(prevState => true);
                    }}
                  />
                </div>
                <div className={commonClasses.mt_4}>
                  <SmallButton
                    text={"削除"}
                    isRed
                    clickFunction={() => {
                      setIsDeleteModalOpen(prevState => true);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          {children}
        </div>
      </WhiteWideWrapper>
      {leaveStock && (
        <LeaveStockEditModal
          prevLeaveStock={leaveStock}
          isOpen={isEditModalOpen}
          handleOnCloseButtonClick={handleOnEditModalCloseButtonClick}
          handleOnClickUpdateButton={handleOnClickUpdateButton}
        />
      )}
      {leaveStock && (
        <LeaveStockDeleteModal
          prevLeaveStock={leaveStock}
          isOpen={isDeleteModalOpen}
          handleOnCloseButtonClick={handleOnDeleteModalCloseButtonClick}
          handleOnClickDestroyButton={handleOnClickDestroyButton}
        />
      )}
    </>
  );
};

export default HeaderItem;
