"use client";

import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import H2 from "@/components/atoms/h2";
import H3 from "@/components/atoms/h3";
import Paragraph from "@/components/atoms/paragraph";
import Input from "@/components/atoms/input";
import SmallButton from "@/components/atoms/button/smallButton";
import ProductsTab from "@/components/molecules/tab/customer/products/productsTab";
import ProductDeleteModal from "@/components/molecules/modal/customer/product/productDeleteModal";
import AuthenticatedLayout from "@/components/molecules/layouts/customer/authenticatedLayout";
import { enumProduct } from "@/types/enum/enumProduct";
import { useIndex } from "@/hooks/customer/product/useIndex";
import { useModal } from "@/hooks/useModal";
import ProductItem from "@/components/ph1/molecules/listItem/customer/productItem";
import { ProductDbTableType } from "@/types/db/product/product";
import ProductBottomArea from "@/components/molecules/bottomArea/customer/product/productBottomArea";
import ProductNormalProductCreateModal from "@/components/molecules/modal/customer/product/productNormalProductCreateModal";
import ProductNormalProductEditModal from "@/components/molecules/modal/customer/product/productNormalProductEditModal";
import ProductCaseProductCreateModal from "@/components/molecules/modal/customer/product/productCaseProductCreateModal";
import ProductCaseProductEditModal from "@/components/molecules/modal/customer/product/productCaseProductEditModal";
import Loading from "@/components/molecules/common/loading";

const Template = ({ hubCode }: { hubCode: string; }): ReactElement => {
  // useStates
  const [ activeProductTypeTab, setActiveProductTypeTab ] = useState<string>(enumProduct.normal);
  const [ checkedIdList, setCheckedIdList ] = useState<number[]>([]);
  const [ selectedProduct, setSelectedProduct ] = useState<ProductDbTableType | null>(null);

  // customHooks
  const { products, getProducts, condition, setCondition } = useIndex();

  // 通常商品登録用モーダル変数
  const {
    isOpen: isCreateNormalProductModalOpen,
    setIsOpen: setIsCreateNormalProductModalOpen,
    handleOnCloseButtonClick: handleOnCreateNormalProductModalCloseButtonClick,
  } = useModal();

  // ケース商品登録用モーダル変数
  const {
    isOpen: isCreateCaseProductModalOpen,
    setIsOpen: setIsCreateCaseProductModalOpen,
    handleOnCloseButtonClick: handleOnCreateCaseProductModalCloseButtonClick,
  } = useModal();

  // 通常商品更新用モーダル変数
  const {
    isOpen: isEditNormalProductModalOpen,
    setIsOpen: setIsEditNormalProductModalOpen,
    handleOnCloseButtonClick: handleOnEditNormalProductModalCloseButtonClick,
  } = useModal();

  // ケース商品更新用モーダル変数
  const {
    isOpen: isEditCaseProductModalOpen,
    setIsOpen: setIsEditCaseProductModalOpen,
    handleOnCloseButtonClick: handleOnEditCaseProductModalCloseButtonClick,
  } = useModal();

  // 商品削除用モーダル変数
  const {
    isOpen: isDeleteModalOpen,
    setIsOpen: setIsDeleteModalOpen,
    handleOnCloseButtonClick: handleOnDeleteModalCloseButtonClick,
  } = useModal();

  // useEffects

  useEffect((): void => {
    setIsCreateNormalProductModalOpen(prevState => false);
    setIsCreateCaseProductModalOpen(prevState => false);
    setIsEditNormalProductModalOpen(prevState => false);
    setIsEditCaseProductModalOpen(prevState => false);
    setIsDeleteModalOpen(prevState => false);
    setActiveProductTypeTab(prevState => enumProduct.normal);
  }, [
    setIsCreateNormalProductModalOpen,
    setIsEditNormalProductModalOpen,
    setIsDeleteModalOpen,
    setIsCreateCaseProductModalOpen,
    setIsEditCaseProductModalOpen,
    setActiveProductTypeTab,
  ]);

  useEffect((): void => {
    if (
      !isCreateNormalProductModalOpen &&
      !isCreateCaseProductModalOpen &&
      !isEditNormalProductModalOpen &&
      !isEditCaseProductModalOpen &&
      !isDeleteModalOpen
    ) {
      setCondition(prevState => {
        return {
          ...prevState,
          productType: activeProductTypeTab,
        };
      });
    }
  }, [
    isCreateNormalProductModalOpen,
    isCreateCaseProductModalOpen,
    isEditNormalProductModalOpen,
    isEditCaseProductModalOpen,
    isDeleteModalOpen,
    activeProductTypeTab,
    setCondition,
  ]);

  useEffect((): void => {
    if (
      !isCreateNormalProductModalOpen &&
      !isCreateCaseProductModalOpen &&
      !isEditNormalProductModalOpen &&
      !isEditCaseProductModalOpen &&
      !isDeleteModalOpen
    ) {
      (async (): Promise<void> => {
        await getProducts();
      })();
    }
  }, [
    getProducts,
    isCreateNormalProductModalOpen,
    isCreateCaseProductModalOpen,
    isEditNormalProductModalOpen,
    isEditCaseProductModalOpen,
    isDeleteModalOpen,
  ]);

  // handles

  /**
   * タブの変更イベント
   * @param productType
   */
  const handleOnChangeTab = (productType: string): void => {
    setActiveProductTypeTab(prevState => productType);

    setCondition(prevState => {
      return {
        ...prevState,
        productType: productType,
      };
    });
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

  /**
   * 商品新規作成モーダルオープンイベント
   */
  const handleOnClickOpenStoreNormalProductModal = (): void => {
    if (activeProductTypeTab === enumProduct.case) {
      setIsCreateCaseProductModalOpen(prevState => true);
    } else {
      setIsCreateNormalProductModalOpen(prevState => true);
    }
  };

  /**
   * 編集モーダルオープンイベント
   */
  const handleOnClickOpenEditModal = (): void => {
    if (activeProductTypeTab === enumProduct.case) {
      setIsEditCaseProductModalOpen(prevState => true);
    } else {
      setIsEditNormalProductModalOpen(prevState => true);
    }
  };

  /**
   * 削除モーダルオープンイベント
   */
  const handleOnClickOpenDeleteModal = (): void => {
    setIsDeleteModalOpen(prevState => true);
  };

  /**
   * 商品登録ボタン押下イベント
   * 登録処理はモーダルで行う
   */
  const handleOnClickStoreButton = (): void => {
    if (activeProductTypeTab === enumProduct.case) {
      setIsCreateCaseProductModalOpen(prevState => false);
    } else {
      setIsCreateNormalProductModalOpen(prevState => false);
    }
  };

  /**
   * 商品更新ボタン押下イベント
   * 更新処理はモーダルで行う
   */
  const handleOnClickUpdateButton = (): void => {
    if (activeProductTypeTab === enumProduct.case) {
      setIsEditCaseProductModalOpen(prevState => false);
    } else {
      setIsEditNormalProductModalOpen(prevState => false);
    }
  };

  /**
   * 商品削除ボタン押下イベント
   * 削除処理はモーダルで行う
   */
  const handleOnClickDestroyButton = (): void => {
    setIsDeleteModalOpen(prevState => false);
  };

  /**
   * チェックボックス押下イベント
   *
   * @param checked
   * @param id
   */
  const handleOnChangeChecks = async (checked: boolean, id: number): Promise<void> => {
    setCheckedIdList(prevState => {
      if (checked) {
        if (!prevState.includes(id)) {
          return [ ...prevState, id ];
        }
      } else {
        return prevState.filter(item => item !== id);
      }
      return prevState;
    });
  };

  if (!hubCode) {
    return <Loading />;
  }

  const classes = [ commonClasses.mt_16, commonClasses.flex__wrapper, commonClasses.justify_end, commonClasses.mr_20 ];

  return (
    <AuthenticatedLayout hubCode={hubCode}>
      <div>
        <H2 isPageTop>商品在庫マスタ</H2>
        <WhiteWideWrapper>
          <H3>絞り込み検索</H3>
          <div
            className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center} ${commonClasses.justify_between}`}
          >
            <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center} ${commonClasses.mt_16}`}>
              <Paragraph isSmall>お客様SKU：</Paragraph>
              <Input id={"sku"} value={condition.sku ?? ""} forSearch changeFunction={handleOnChangeSku} />
            </div>
          </div>
        </WhiteWideWrapper>
        <div className={classes.join(" ")}>
          <SmallButton text={"追加"} isBlue clickFunction={handleOnClickOpenStoreNormalProductModal} />
        </div>
        <ProductsTab activeProductTypeTab={activeProductTypeTab} handleOnChangeTab={handleOnChangeTab} />
        {products && products.length > 0 ? (
          products.map(product => {
            if (product.id) {
              return (
                <ProductItem
                  setCheckedIdList={setCheckedIdList}
                  checkedIdList={checkedIdList}
                  handleOnClickOpenEditModal={handleOnClickOpenEditModal}
                  handleOnClickOpenDeleteModal={handleOnClickOpenDeleteModal}
                  key={product.id}
                  product={product}
                  setSelectedProduct={setSelectedProduct}
                  handleOnChangeChecks={handleOnChangeChecks}
                />
              );
            }
          })
        ) : (
          <WhiteWideWrapper>
            <Paragraph>検索結果がありません</Paragraph>
          </WhiteWideWrapper>
        )}
      </div>
      <ProductBottomArea hubCode={hubCode} checkedIdList={checkedIdList} />

      {/* 以下モーダル */}
      {isCreateNormalProductModalOpen && (
        <ProductNormalProductCreateModal
          hubCode={hubCode}
          activeProductTypeTab={activeProductTypeTab}
          isOpen={isCreateNormalProductModalOpen}
          handleOnCloseButtonClick={handleOnCreateNormalProductModalCloseButtonClick}
          handleOnClickStoreButton={handleOnClickStoreButton}
        />
      )}
      {isCreateCaseProductModalOpen && (
        <ProductCaseProductCreateModal
          hubCode={hubCode}
          isOpen={isCreateCaseProductModalOpen}
          handleOnCloseButtonClick={handleOnCreateCaseProductModalCloseButtonClick}
          handleOnClickStoreButton={handleOnClickStoreButton}
        />
      )}

      {selectedProduct && isEditNormalProductModalOpen && (
        <ProductNormalProductEditModal
          prevProduct={selectedProduct}
          isOpen={isEditNormalProductModalOpen}
          handleOnCloseButtonClick={handleOnEditNormalProductModalCloseButtonClick}
          handleOnClickUpdateButton={handleOnClickUpdateButton}
        />
      )}
      {selectedProduct && isEditCaseProductModalOpen && (
        <ProductCaseProductEditModal
          prevProduct={selectedProduct}
          isOpen={isEditCaseProductModalOpen}
          handleOnCloseButtonClick={handleOnEditCaseProductModalCloseButtonClick}
          handleOnClickUpdateButton={handleOnClickUpdateButton}
        />
      )}
      {selectedProduct && isDeleteModalOpen && (
        <ProductDeleteModal
          prevProduct={selectedProduct}
          isOpen={isDeleteModalOpen}
          handleOnCloseButtonClick={handleOnDeleteModalCloseButtonClick}
          handleOnClickDestroyButton={handleOnClickDestroyButton}
        />
      )}
    </AuthenticatedLayout>
  );
};

export default Template;
