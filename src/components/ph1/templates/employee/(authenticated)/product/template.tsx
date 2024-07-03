"use client";

import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import H2 from "@/components/atoms/h2";
import H3 from "@/components/atoms/h3";
import Paragraph from "@/components/atoms/paragraph";
import Input from "@/components/atoms/input";
import ProductDeleteModal from "@/components/molecules/modal/employee/product/productDeleteModal";
import ProductEditModal from "@/components/molecules/modal/employee/product/productEditModal";
import { useModal } from "@/hooks/useModal";
import { useIndex } from "@/hooks/employee/product/useIndex";
import { ProductDbTableType } from "@/types/db/product/product";
import AuthenticatedLayout from "@/components/molecules/layouts/employee/authenticatedLayout";
import ProductItem from "@/components/molecules/listItem/employee/productItem";

const Template = (): ReactElement => {
  // customHooks
  const { products, getProducts, condition, setCondition } = useIndex();

  // 更新用モーダル変数
  const {
    isOpen: isEditModalOpen,
    setIsOpen: setIsEditModalOpen,
    handleOnCloseButtonClick: handleOnEditModalCloseButtonClick,
  } = useModal();

  // 削除用モーダル変数
  const {
    isOpen: isDeleteModalOpen,
    setIsOpen: setIsDeleteModalOpen,
    handleOnCloseButtonClick: handleOnDeleteModalCloseButtonClick,
  } = useModal();

  // useStates
  const [ selectedProduct, setSelectedProduct ] = useState<ProductDbTableType | null>(null);

  // useEffects

  /**
   * 初期化
   */
  useEffect((): void => {
    setIsDeleteModalOpen(prevState => false);
    setIsEditModalOpen(prevState => false);

    (async (): Promise<void> => {
      // await getProducts();
    })();
  }, [ setIsDeleteModalOpen, setIsEditModalOpen, getProducts ]);

  /**
   * モーダル閉じたときに再検索
   */
  useEffect((): void => {
    if (!isEditModalOpen && !isDeleteModalOpen) {
      (async (): Promise<void> => {
        await getProducts();
      })();
    }
  }, [ isEditModalOpen, isDeleteModalOpen, getProducts ]);

  /**
   * 検索条件変更時に再検索
   */
  useEffect((): void => {
    if (condition && !isEditModalOpen && !isDeleteModalOpen) {
      (async (): Promise<void> => {
        await getProducts();
      })();
    }
  }, [ condition, isEditModalOpen, isDeleteModalOpen, getProducts ]);

  /**
   * 商品更新ボタン押下イベント
   * 更新処理はモーダルで行う
   */
  const handleOnClickUpdateButton = (): void => {
    setIsEditModalOpen(prevState => false);
  };

  /**
   * 商品削除ボタン押下イベント
   * 削除処理はモーダルで行う
   */
  const handleOnClickDestroyButton = (): void => {
    setIsDeleteModalOpen(prevState => false);
  };

  /**
   * 編集モーダルオープンイベント
   */
  const handleOnClickOpenEditModal = (): void => {
    setIsEditModalOpen(prevState => true);
  };

  /**
   * 削除モーダルオープンイベント
   */
  const handleOnClickOpenDeleteModal = (): void => {
    setIsDeleteModalOpen(prevState => true);
  };

  /**
   * SKUの変更インベント
   * @param e
   */
  const handleOnChangeSku = (e: ChangeEvent<HTMLInputElement>): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        sku: e.target.value,
      };
    });
  };

  return (
    <AuthenticatedLayout>
      <div>
        <H2 isPageTop>商品在庫マスタ</H2>
        <WhiteWideWrapper>
          <H3>絞り込み検索</H3>
          <div
            className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center} ${commonClasses.justify_between}`}
          >
            <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center} ${commonClasses.mt_16}`}>
              <Paragraph isSmall>お客様SKU：</Paragraph>
              <Input id={"sku"} value={condition.sku} forSearch changeFunction={handleOnChangeSku} />
            </div>
          </div>
        </WhiteWideWrapper>
        {products &&
          products.map(product => {
            return (
              <ProductItem
                product={product}
                setSelectedProduct={setSelectedProduct}
                key={product.id}
                handleOnClickOpenEditModal={handleOnClickOpenEditModal}
                handleOnClickOpenDeleteModal={handleOnClickOpenDeleteModal}
              />
            );
          })}
      </div>
      {/* 以下モーダル */}
      {selectedProduct && isEditModalOpen && (
        <ProductEditModal
          prevProduct={selectedProduct}
          isOpen={isEditModalOpen}
          handleOnClickUpdateButton={handleOnClickUpdateButton}
          handleOnCloseButtonClick={handleOnEditModalCloseButtonClick}
        />
      )}
      {selectedProduct && isDeleteModalOpen && (
        <ProductDeleteModal
          prevProduct={selectedProduct}
          isOpen={isDeleteModalOpen}
          handleOnClickDestroyButton={handleOnClickDestroyButton}
          handleOnCloseButtonClick={handleOnDeleteModalCloseButtonClick}
        />
      )}
    </AuthenticatedLayout>
  );
};

export default Template;
