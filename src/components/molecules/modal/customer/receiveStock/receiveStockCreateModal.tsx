"use client";

import H2 from "@/components/atoms/h2";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import { EduITModal } from "@/components/molecules/eduITModal";
import { ChangeEvent, ReactElement, useEffect } from "react";
import SmallButton from "@/components/atoms/button/smallButton";
import InputOfRemark from "@/components/molecules/inputs/inputOfRemark";
import plusIcon from "@/resource/img/plus.svg";
import { ReceiveStockForPostType, useStore } from "@/hooks/customer/receiveStock/useStore";
import Error422 from "@/components/molecules/errors/error422";
import { useIndex } from "@/hooks/customer/product/useIndex";
import SelectAndLabel from "@/components/molecules/selectAndLabel";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import Loading from "@/components/molecules/common/loading";
import { Integer } from "@/lib/integer";
import { UUID } from "@/lib/uuid";

const ReceiveStockCreateModal = ({
  isOpen,
  handleOnCloseButtonClick,
  handleOnClickStoreButton,
  srcProductIdList,
  hubCode,
}: {
  isOpen: boolean;
  handleOnCloseButtonClick: () => void;
  handleOnClickStoreButton: () => void;
  srcProductIdList?: string;
  hubCode: string;
}): ReactElement => {
  // custom hooks
  const {
    postReceiveStock,
    receiveStockForPost,
    setReceiveStockForPost,
    isStored,
    setIsStored,
    validationErrors,
    setValidationErrors,
  } = useStore();
  const { getProducts, options } = useIndex();

  // useStates

  // useEffects

  /**
   * 初期化
   */
  useEffect((): void => {
    if (isOpen) {
      setValidationErrors(prevState => []);
      setIsStored(prevState => false);
      setReceiveStockForPost(prevState => {
        return {
          hubCode: hubCode,
          productAndQuantities: [
            {
              uuid: UUID.generate(),
              quantity: 1,
              option: {
                value: "",
                label: "",
              },
            },
          ],
          publicRemarks: null,
          trackingNo: null,
          publicRemarksFile: null,
          withLeaveStock: false,
        } as ReceiveStockForPostType;
      });

      (async (): Promise<void> => {
        await getProducts();
      })();
    }
  }, [ isOpen, setValidationErrors, setIsStored, getProducts, setReceiveStockForPost, srcProductIdList, hubCode ]);

  useEffect((): void => {
    if (isOpen && options && srcProductIdList) {
      // モーダルオープン時、且つ、オプションが取得されており、且つ、パラメータにsrcProductIdListがある場合。

      const srcProductIdArray = srcProductIdList.split(",").map(Number);
      const filteredSrcOptions = options.filter(option => {
        return srcProductIdArray.includes(Integer.parseIntExceptZero(option.value));
      });
      setReceiveStockForPost(prevState => {
        return {
          productAndQuantities: filteredSrcOptions.map(item => {
            return {
              option: item,
              quantity: 0,
              uuid: UUID.generate(),
            };
          }),
          publicRemarks: null,
          trackingNo: null,
          publicRemarksFile: null,
        } as ReceiveStockForPostType;
      });
    }
  }, [ isOpen, options, srcProductIdList, setReceiveStockForPost ]);

  /**
   * 登録後の処理
   */
  useEffect((): void => {
    if (isOpen && isStored) {
      handleOnClickStoreButton();
    }
  }, [ isOpen, isStored, handleOnClickStoreButton ]);

  /**
   * 「出荷依頼も作成する」押下イベントの監視
   */
  useEffect((): void => {
    (async (): Promise<void> => {
      if (receiveStockForPost?.withLeaveStock) {
        await postReceiveStock();
      }
      setReceiveStockForPost(prevState => {
        if (!prevState) return prevState;

        return {
          ...prevState,
          withLeaveStock: false,
        };
      });
    })();
  }, [ postReceiveStock, receiveStockForPost?.withLeaveStock, setReceiveStockForPost ]);

  // handles

  /**
   * 「出荷依頼も作成する」押下イベント
   */
  const handleOnClickWithLeaveStockButton = async (): Promise<void> => {
    setReceiveStockForPost(prevState => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        withLeaveStock: true,
      };
    });
  };

  /**
   * 追加ボタンクリック
   */
  const handleOnClickAddButton = async (): Promise<void> => {
    setReceiveStockForPost(prevState => {
      if (!prevState) {
        return {
          hubCode: hubCode,
          productAndQuantities: [],
          trackingNo: "",
          publicRemarks: null,
          publicRemarksFile: null,
          withLeaveStock: false,
        } as ReceiveStockForPostType;
      }
      return {
        ...prevState,
        productAndQuantities: [
          ...prevState.productAndQuantities,
          {
            uuid: UUID.generate(),
            quantity: 0,
          },
        ],
      } as ReceiveStockForPostType;
    });
  };

  /**
   * 商品変更イベント
   * @param uuid
   * @param e
   */
  const handleOnChangeProduct = async (uuid: string, e: ReactSelectOption): Promise<void> => {
    setReceiveStockForPost(prevState => {
      if (!prevState) return prevState;

      const newProductAndQuantities = prevState.productAndQuantities.map(productAndQuantity => {
        if (productAndQuantity.uuid === uuid) {
          return { ...productAndQuantity, option: e };
        }
        return productAndQuantity;
      });

      return {
        ...prevState,
        productAndQuantities: newProductAndQuantities,
      };
    });
  };

  /**
   * 数量変更イベント
   * @param uuid
   * @param e
   */
  const handleOnChangeQuantity = async (uuid: string, e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const newQuantity = Integer.parseIntExceptZero(e.target.value);

    setReceiveStockForPost(prevState => {
      if (!prevState) return prevState;

      const newProductAndQuantities = prevState.productAndQuantities.map(productAndQuantity => {
        if (productAndQuantity.uuid === uuid) {
          return { ...productAndQuantity, quantity: newQuantity };
        }
        return productAndQuantity;
      });

      return {
        ...prevState,
        productAndQuantities: newProductAndQuantities,
      };
    });
  };

  /**
   * 追跡番号変更イベント
   * @param e
   */
  const handleOnChangeTrackingNo = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setReceiveStockForPost(prevState => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        trackingNo: e.target.value,
      };
    });
  };

  /**
   * 備考変更イベント
   * @param e
   */
  const handleOnChangePublicRemarks = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setReceiveStockForPost(prevState => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        publicRemarks: e.target.value,
      };
    });
  };

  /**
   * 備考添付ファイル変更イベント
   * @param e
   */
  const handleOnChangePublicRemarksFile = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const selectedFile = e.target.files?.[0] ?? null;
    setReceiveStockForPost(prevState => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        publicRemarksFile: selectedFile,
      };
    });
  };

  // loading condition
  if (isOpen && !receiveStockForPost) {
    return <Loading />;
  }

  const classNames = [ commonClasses.flex__wrapper, commonClasses.justify_between, commonClasses.aline_center ];

  const classNamesMt8 = [
    commonClasses.flex__wrapper,
    commonClasses.justify_between,
    commonClasses.aline_center,
    commonClasses.mt_8,
  ];

  return (
    <EduITModal isOpen={isOpen}>
      <H2>入荷依頼作成</H2>
      <Error422 errors={validationErrors} />
      {receiveStockForPost?.productAndQuantities &&
        receiveStockForPost.productAndQuantities.map((productAndQuantity, index) => {
          return (
            <div key={productAndQuantity.uuid} className={classNames.join(" ")}>
              <SelectAndLabel
                id={"product"}
                options={options}
                text={"商品名"}
                isRequired
                isLarge
                showLabel={index === 0}
                value={productAndQuantity.option}
                changeFunction={async e => {
                  await handleOnChangeProduct(productAndQuantity.uuid, e);
                }}
              />
              <InputAndLabel
                id={"quantity"}
                text={"数量"}
                value={productAndQuantity.quantity.toString()}
                isRequired
                isSmall
                showLabel={index === 0}
                changeFunction={async (e: ChangeEvent<HTMLInputElement>) => {
                  await handleOnChangeQuantity(productAndQuantity.uuid, e);
                }}
              />
            </div>
          );
        })}

      <div className={classNamesMt8.join(" ")}>
        <SmallButton text={"追加"} icon={plusIcon} isBlue clickFunction={handleOnClickAddButton} />
        <SmallButton text={"外箱ラベル"} isDark clickFunction={() => alert("別PHで対応")} />
      </div>
      <InputAndLabel
        id={"trackingNo"}
        text={"追跡番号"}
        value={receiveStockForPost?.trackingNo || ""}
        changeFunction={async (e: ChangeEvent<HTMLInputElement>) => await handleOnChangeTrackingNo(e)}
      />
      <InputOfRemark
        id={"publicRemarks"}
        text={"備考"}
        value={receiveStockForPost?.publicRemarks || ""}
        file={receiveStockForPost?.publicRemarksFile}
        changeTextFunction={async (e: ChangeEvent<HTMLInputElement>) => {
          await handleOnChangePublicRemarks(e);
        }}
        changeFileFunction={async (e: ChangeEvent<HTMLInputElement>) => {
          await handleOnChangePublicRemarksFile(e);
        }}
      />
      <div className={commonClasses.mt_24}>
        <FormButton
          text={"入荷依頼"}
          color={"green"}
          onClick={async (): Promise<void> => await postReceiveStock()}
        />
        <div className={commonClasses.mt_8}>
          <FormButton
            text={"出荷依頼も作成する"}
            color={"dark"}
            onClick={async (): Promise<void> => {
              await handleOnClickWithLeaveStockButton();
            }}
          />
        </div>
        <Paragraph isLink isCenter isMarginTop clickFunction={handleOnCloseButtonClick}>
          入荷依頼をやめる
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default ReceiveStockCreateModal;
