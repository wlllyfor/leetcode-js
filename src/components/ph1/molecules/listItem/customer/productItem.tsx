import { Dispatch, ReactElement, SetStateAction, useCallback, useEffect, useState } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import Checkbox from "@/components/atoms/checkbox";
import Image from "next/image";
import Paragraph from "@/components/atoms/paragraph";
import SmallButton from "@/components/atoms/button/smallButton";
import { ProductDbTableType } from "@/types/db/product/product";
import DummyImage from "@/resource/img/dummy.jpg";

const ProductItem = ({
  product,
  handleOnClickOpenEditModal,
  setSelectedProduct,
  handleOnClickOpenDeleteModal,
  checkedIdList,
  setCheckedIdList,
  handleOnChangeChecks,
}: {
  /**
   * 明細に表示する商品
   */
  product: ProductDbTableType;
  handleOnClickOpenEditModal: () => void;
  handleOnClickOpenDeleteModal: () => void;
  setSelectedProduct: Dispatch<SetStateAction<ProductDbTableType | null>>;
  checkedIdList: number[];
  setCheckedIdList: Dispatch<SetStateAction<number[]>>;
  handleOnChangeChecks: (checked: boolean, id: number) => Promise<void>;
}): ReactElement => {
  const [ checked, setChecked ] = useState<boolean>(false);

  // レンダリング中かどうかのフラグ
  const [ isFirstRender, setIsFirstRender ] = useState(true);

  // useCallbackを使用して関数をメモ化
  const memoizedHandleOnChangeChecks = useCallback(handleOnChangeChecks, []);

  // useEffects
  useEffect((): void => {
    if (!isFirstRender) {
      (async (): Promise<void> => {
        if (product.id !== null) {
          await memoizedHandleOnChangeChecks(checked, product.id);
        }
      })();
    } else {
      setIsFirstRender(prevState => false);
    }
  }, [ checked, isFirstRender, memoizedHandleOnChangeChecks, product.id ]);

  useEffect((): void => {
    if (checked) {
      // 追加
      setCheckedIdList(prevState => {
        if (!prevState) return [];

        if (product.id) {
          return [ ...prevState ];
        }

        return prevState;
      });
    } else {
      // 外す
      setCheckedIdList(prevState => {
        return checkedIdList.filter(item => item !== product.id);
      });
    }
  }, [ checked ]);

  // handle
  const handleOnChangeChecked = async (newChecked: boolean): Promise<void> => {
    setChecked(prevState => newChecked);
  };

  const classNamesMr16 = [
    commonClasses.flex__wrapper,
    commonClasses.aline_center,
    commonClasses.mt_8,
    commonClasses.c_mr_16,
  ];

  return (
    <WhiteWideWrapper>
      <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center} ${commonClasses.justify_between}`}>
        <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center}`}>
          <Checkbox
            isChecked={checked}
            id={product.id?.toString()}
            value={product.id?.toString()}
            changeFunction={async (): Promise<void> => {
              await handleOnChangeChecked(!checked);
            }}
          />
          <div className={commonClasses.ml_16}>
            <Image src={product.productImageUrl || DummyImage} alt={""} width={120} height={80} />
          </div>
          <div className={commonClasses.ml_16}>
            <div className={classNamesMr16.join(" ")}>
              <Paragraph isBold>{product.code}</Paragraph>
              <Paragraph>{product.name}</Paragraph>
            </div>
            <div className={classNamesMr16.join(" ")}>
              <Paragraph>お客様SKU：{product.sku}</Paragraph>
              <Paragraph>
                バーコード： {product.label}({product.productLabelType})
              </Paragraph>

              <Paragraph>
                サイズ：{product.height}×{product.width}×{product.depth}
              </Paragraph>
              <Paragraph>単価：{product.unitPrice}円</Paragraph>
            </div>
            <div className={classNamesMr16.join(" ")}>
              <Paragraph>品名：{product.nameToSlip}</Paragraph>
              <Paragraph>在庫数：{product.stockQuantity}</Paragraph>
              <Paragraph>重量：{product.weight}kg</Paragraph>
            </div>
          </div>
        </div>
        <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_end} ${commonClasses.column}`}>
          <Paragraph isGray>{product.createdOn} マスタ登録</Paragraph>
          <div className={commonClasses.mt_4}>
            <SmallButton
              text={"編集"}
              isBlue
              clickFunction={(): void => {
                setSelectedProduct(prevState => product);
                handleOnClickOpenEditModal();
              }}
            />
          </div>
          <div className={commonClasses.mt_4}>
            <SmallButton
              text={"削除"}
              isRed
              clickFunction={(): void => {
                setSelectedProduct(prevState => product);
                handleOnClickOpenDeleteModal();
              }}
            />
          </div>
        </div>
      </div>
    </WhiteWideWrapper>
  );
};

export default ProductItem;
