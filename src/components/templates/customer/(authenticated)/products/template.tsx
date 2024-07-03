"use client";

import { ReactElement, useEffect, useState } from "react";
import ProductsTab from "@/components/molecules/tab/customer/products/productsTab";
import ProductDeleteModal from "@/components/molecules/modal/customer/product/productDeleteModal";
import AuthenticatedLayout from "@/components/molecules/layouts/customer/authenticatedLayout";
import { enumProduct } from "@/types/enum/enumProduct";
import { useIndex } from "@/hooks/customer/product/useIndex";
import { useModal } from "@/hooks/useModal";
import NormalProductItem from "@/components/molecules/listItem/customer/product/normalProductItem";
import CaseProductItem from "@/components/molecules/listItem/customer/product/caseProductItem";
import { ProductDbTableType } from "@/types/db/product/product";
import NormalProductCreateModal from "@/components/molecules/modalGroup/customer/product/normalProductCreateModal";
import CaseProductCreateModal from "@/components/molecules/modalGroup/customer/product/caseProductCreateModal";
import ProductNormalProductEditModal from "@/components/molecules/modal/customer/product/productNormalProductEditModal";
import ProductCaseProductEditModal from "@/components/molecules/modal/customer/product/productCaseProductEditModal";
import SearchGroup from "@/components/molecules/search/customer/products/searchGroup";
import ProductsButtonGroup from "@/components/molecules/buttonGroup/customer/products/productsButtonGroup";
import MainInner from "@/components/atoms/div/inner/mainInner";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import TableHeader from "@/components/atoms/table/tableHeader";
import TableHeaderTexts from "@/components/atoms/table/tableHeaderTexts";
import TableHeaderEnd from "@/components/atoms/table/tableHeaderEnd";
import Table from "@/components/atoms/table/table";
import TableRow from "@/components/atoms/table/tableRow";
// import Loading from "@/components/molecules/common/loading";

const Template = ({ hubCode }: { hubCode: string; }): ReactElement => {
  // useStates
  const [ activeProductTypeTab, setActiveProductTypeTab ] = useState<string>(enumProduct.normal);
  const [ checkedIdList, setCheckedIdList ] = useState<number[]>([]);
  const [ selectedProduct, setSelectedProduct ] = useState<ProductDbTableType | null>(null);

  // customHooks ↓mock実装時に products, conditionを抜いています。
  const { getProducts, setCondition } = useIndex();
  //   {
  //     uuid: "123e4567-e89b-12d3-a456-426614174000",
  //     id: 1,
  //     customerId: 2,
  //     hubId: 3,
  //     name: "テスト商品",
  //     nameToSlip: "テスト商品",
  //     productType: "EnumProductType1",
  //     sku: "SKU12345",
  //     fnsku: "FNSKU12345",
  //     janCode: "4901234567894",
  //     asin: "B00XXXXXXX",
  //     productLabelType: "EnumProductLabelType1",
  //     productUrl: null,
  //     productApiUrl: null,
  //     productImageUrl: null,
  //     weight: 500,
  //     height: 20,
  //     width: 30,
  //     depth: 40,
  //     unitPrice: 1500,
  //     isDisabled: false,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     receiveStockDetailId: 4,
  //     stockQuantity: 100,
  //     code: "CODE123",
  //     label: "LABEL123",
  //     productTypeLabel: "Product Type Label",
  //     createdOn: "2024-05-25T01:48:41.000Z",
  //     updatedOn: "2024-05-25T01:48:41.000Z",
  //     hub: null,
  //     caseProductType: null,
  //     caseChildrenProducts: null,
  //     customer: null,
  //     productStocks: [
  //       {
  //         uuid: "123e4567-e89b-12d3-a456-426614174001",
  //         id: 1,
  //         receiveStockDetailId: 1,
  //         productId: 1,
  //         status: "status1",
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //         createdOn: "2024-05-25T01:48:41.000Z",
  //         updatedOn: "2024-05-25T01:48:41.000Z",
  //         product: null,
  //         statusLabel: "StatusLabel1",
  //       },
  //       {
  //         uuid: "123e4567-e89b-12d3-a456-426614174002",
  //         id: 2,
  //         receiveStockDetailId: 2,
  //         productId: 2,
  //         status: "status2",
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //         createdOn: "2024-05-25T01:48:41.000Z",
  //         updatedOn: "2024-05-25T01:48:41.000Z",
  //         product: null,
  //         statusLabel: "StatusLabel2",
  //       },
  //     ],
  //   },
  //   {
  //     uuid: "123e4567-e89b-12d3-a456-426614174001",
  //     id: 2,
  //     customerId: 2,
  //     hubId: 3,
  //     name: "テスト商品",
  //     nameToSlip: "テスト商品",
  //     productType: "EnumProductType1",
  //     sku: "SKU12345",
  //     fnsku: "FNSKU12345",
  //     janCode: "4901234567894",
  //     asin: "B00XXXXXXX",
  //     productLabelType: "EnumProductLabelType1",
  //     productUrl: null,
  //     productApiUrl: null,
  //     productImageUrl: null,
  //     weight: 500,
  //     height: 20,
  //     width: 30,
  //     depth: 40,
  //     unitPrice: 1500,
  //     isDisabled: false,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     receiveStockDetailId: 4,
  //     stockQuantity: 100,
  //     code: "CODE123",
  //     label: "LABEL123",
  //     productTypeLabel: "Product Type Label",
  //     createdOn: "2024-05-25T01:48:41.000Z",
  //     updatedOn: "2024-05-25T01:48:41.000Z",
  //     hub: null,
  //     caseProductType: null,
  //     caseChildrenProducts: null,
  //     customer: null,
  //     productStocks: [
  //       {
  //         uuid: "123e4567-e89b-12d3-a456-426614174001",
  //         id: 1,
  //         receiveStockDetailId: 1,
  //         productId: 1,
  //         status: "status1",
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //         createdOn: "2024-05-25T01:48:41.000Z",
  //         updatedOn: "2024-05-25T01:48:41.000Z",
  //         product: null,
  //         statusLabel: "StatusLabel1",
  //       },
  //       {
  //         uuid: "123e4567-e89b-12d3-a456-426614174002",
  //         id: 2,
  //         receiveStockDetailId: 2,
  //         productId: 2,
  //         status: "status2",
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //         createdOn: "2024-05-25T01:48:41.000Z",
  //         updatedOn: "2024-05-25T01:48:41.000Z",
  //         product: null,
  //         statusLabel: "StatusLabel2",
  //       },
  //     ],
  //   },
  // ];

  const productIdHeaderTexts = [ "SKU", "商品ID", "登録日" ];
  const productNameHeaderTexts = [ "商品名", "品名" ];
  const productSizeHeaderTexts = [ "サイズ(cm)", "重量(kg)" ];

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

  // /**
  //  * SKUの変更インベント
  //  * @param e
  //  */
  // const handleOnChangeSku = (e: ChangeEvent<HTMLInputElement>): void => {
  //   setCondition(prevState => {
  //     return {
  //       ...prevState,
  //       sku: e.target.value,
  //     };
  //   });
  // };

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

  // if (!hubCode) {
  //   return <Loading />;
  // }


  return (
    <AuthenticatedLayout hubCode={hubCode}>
      <MainInner>
        <SearchGroup />
        {/* <div
         className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center} ${commonClasses.justify_between}`}
         >
         <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center} ${commonClasses.mt_16}`}>
         <Paragraph isSmall>お客様SKU：</Paragraph>
         <Input id={"sku"} value={condition.sku ?? ""} forSearch changeFunction={handleOnChangeSku} />
         </div>
         </div> */}
        <ProductsTab activeProductTypeTab={activeProductTypeTab} handleOnChangeTab={handleOnChangeTab} />
        <div className="mt-2">
          <ProductsButtonGroup
            handleAddNormalProductButtonClick={handleOnClickOpenStoreNormalProductModal}
            handleAddCaseProductButtonClick={handleOnCreateCaseProductModalCloseButtonClick}
          />
        </div>
        {/* <TableGroup /> */}
        <ContentAreaWrapper>
          <Table>
            <TableRow>
              <TableHeader text="" />
              <TableHeaderTexts texts={productIdHeaderTexts} />
              <TableHeader text="写真" />
              <TableHeaderTexts texts={productNameHeaderTexts} />
              <TableHeader text="バーコード情報" />
              <TableHeader text="在庫" />
              <TableHeaderTexts texts={productSizeHeaderTexts} />
              <TableHeader text="単価" />
              <TableHeaderEnd text="" />
            </TableRow>
            {/* {products && products.length > 0 ? (
             products.map(product => {
             if (product.id) {
             return ( */}
            <NormalProductItem
              setCheckedIdList={setCheckedIdList}
              checkedIdList={checkedIdList}
              handleOnClickOpenEditModal={handleOnClickOpenEditModal}
              handleOnClickOpenDeleteModal={handleOnClickOpenDeleteModal}
              handleOnClickDestroyButton={handleOnClickDestroyButton}
              handleOnEditModalCloseButtonClick={handleOnEditNormalProductModalCloseButtonClick}
              handleOnDeleteModalCloseButtonClick={handleOnDeleteModalCloseButtonClick}
              handleOnClickUpdateButton={handleOnClickUpdateButton}
              isDeleteModalOpen={isDeleteModalOpen}
              isNormalProductEditModalOpen={isEditNormalProductModalOpen}
              // key={product.id}
              // product={product}
              setSelectedProduct={setSelectedProduct}
              handleOnChangeChecks={handleOnChangeChecks}
            />
            {/* );
             }
             })
             ) : (
             <TableRow>
             <TableDataText text="検索結果がありません" />
             </TableRow>
             )} */}
          </Table>
        </ContentAreaWrapper>

        {/* ここからケース商品用 */}
        <ContentAreaWrapper>
          <Table>
            <TableRow>
              <TableHeader text="" />
              <TableHeaderTexts texts={productIdHeaderTexts} />
              <TableHeader text="写真" />
              <TableHeaderTexts texts={productNameHeaderTexts} />
              <TableHeader text="バーコード情報" />
              <TableHeader text="在庫" />
              <TableHeaderTexts texts={productSizeHeaderTexts} />
              <TableHeader text="単価" />
              <TableHeader text="内容商品" />
              <TableHeaderEnd text="" />
            </TableRow>
            {/* {products && products.length > 0 ? (
             products.map(product => {
             if (product.id) {
             return ( */}
            <CaseProductItem
              setCheckedIdList={setCheckedIdList}
              checkedIdList={checkedIdList}
              handleOnClickOpenEditModal={handleOnClickOpenEditModal}
              handleOnClickOpenDeleteModal={handleOnClickOpenDeleteModal}
              handleOnClickDestroyButton={handleOnClickDestroyButton}
              handleOnEditModalCloseButtonClick={handleOnEditNormalProductModalCloseButtonClick}
              handleOnDeleteModalCloseButtonClick={handleOnDeleteModalCloseButtonClick}
              handleOnClickUpdateButton={handleOnClickUpdateButton}
              isDeleteModalOpen={isDeleteModalOpen}
              isNormalProductEditModalOpen={isEditNormalProductModalOpen}
              // key={product.id}
              // product={product}
              setSelectedProduct={setSelectedProduct}
              handleOnChangeChecks={handleOnChangeChecks}
            />
            {/* );
             }
             })
             ) : (
             <TableRow>
             <TableDataText text="検索結果がありません" />
             </TableRow>
             )} */}
          </Table>
        </ContentAreaWrapper>
      </MainInner>

      {/* ProductBottomAreaは使わないが、入荷依頼作成ように残しておく */}
      {/* <ProductBottomArea hubCode={hubCode} checkedIdList={checkedIdList} /> */}

      {/* 以下モーダル */}
      {isCreateNormalProductModalOpen && (
        <NormalProductCreateModal
          hubCode={hubCode}
          activeProductTypeTab={activeProductTypeTab}
          isOpen={isCreateNormalProductModalOpen}
          handleOnCloseButtonClick={handleOnCreateNormalProductModalCloseButtonClick}
          handleOnClickStoreButton={handleOnClickStoreButton}
        />
      )}
      {/* {isCreateCaseProductModalOpen && ( */}
      <CaseProductCreateModal
        hubCode={hubCode}
        // isOpen={isCreateCaseProductModalOpen}
        isOpen={isCreateCaseProductModalOpen}
        handleOnCloseButtonClick={handleOnCreateCaseProductModalCloseButtonClick}
        handleOnClickStoreButton={handleOnClickStoreButton}
        activeProductTypeTab={""}
      />
      {/* )} */}

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
