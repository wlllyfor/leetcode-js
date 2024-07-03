import { Dispatch, ReactElement, SetStateAction } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import Image from "next/image";
import Paragraph from "@/components/atoms/paragraph";
import SmallButton from "@/components/atoms/button/smallButton";
import ImageSrc from "@/resource/img/dummy.jpg";
import Badge from "@/components/molecules/badge";
import { ProductDbTableType } from "@/types/db/product/product";

const ProductItem = ({
  product,
  setSelectedProduct,
  handleOnClickOpenEditModal,
  handleOnClickOpenDeleteModal,
}: {
  /**
   * 明細に表示する商品
   */
  product: ProductDbTableType;
  setSelectedProduct: Dispatch<SetStateAction<ProductDbTableType | null>>;
  handleOnClickOpenEditModal: () => void;
  handleOnClickOpenDeleteModal: () => void;
}): ReactElement => {
  const classNames = [
    commonClasses.flex__wrapper,
    commonClasses.aline_center,
    commonClasses.mt_8,
    commonClasses.c_mr_16,
  ];
  return (
    <WhiteWideWrapper>
      <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center} ${commonClasses.justify_between}`}>
        <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center}`}>
          <div className={commonClasses.ml_16}>
            <Image src={product.productImageUrl || ImageSrc} alt={""} width={120} height={80} />
          </div>
          <div className={commonClasses.ml_16}>
            <div className={classNames.join(" ")}>
              <Paragraph isBold>{product.code}</Paragraph>
              <Paragraph>
                {product.name} <Badge color={"blue"}>{product.productTypeLabel} </Badge>
              </Paragraph>
            </div>
            <div className={classNames.join(" ")}>
              <Paragraph>お客様SKU：{product.sku}</Paragraph>
              <Paragraph>
                バーコード： {product.label}({product.productLabelType})
              </Paragraph>
              <Paragraph>
                サイズ：{product.height}×{product.width}×{product.depth}
              </Paragraph>
              <Paragraph>単価：{product.unitPrice.toLocaleString()}円</Paragraph>
            </div>
            <div className={classNames.join(" ")}>
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
              clickFunction={() => {
                setSelectedProduct(prevState => product);
                handleOnClickOpenEditModal();
              }}
            />
          </div>
          <div className={commonClasses.mt_4}>
            <SmallButton
              text={"削除"}
              isRed
              clickFunction={() => {
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
