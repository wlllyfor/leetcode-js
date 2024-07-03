import { Dispatch, ReactElement, SetStateAction } from "react";
import { ProductDbTableType } from "@/types/db/product/product";
import TableRow from "@/components/atoms/table/tableRow";
import TableDataText from "@/components/atoms/table/tableDataText";
import TableDataImage from "@/components/atoms/table/tableDataImage";
import TableDataTexts from "@/components/atoms/table/tableDataTexts";
import TableDataEnd from "@/components/atoms/table/tableDataEnd";
import FlexWrapperColumn from "@/components/atoms/div/wrapper/flexWrapperColumn";
import NormalProductEditModalGroup from "@/components/molecules/modalGroup/customer/product/normalProductEditModalGroup";
import DeleteModalGroup from "@/components/molecules/modalGroup/customer/product/deleteModalGroup";
import TableButton from "@/components/atoms/button/tableButton";
import TableDataCheckbox from "@/components/molecules/tableColumn/employee/orders/tableDataCheckbox";

const NormalProductItem = ({
  // product,
  handleOnClickOpenEditModal,
  setSelectedProduct,
  handleOnClickOpenDeleteModal,
  handleOnEditModalCloseButtonClick,
  handleOnDeleteModalCloseButtonClick,
  handleOnClickDestroyButton,
  handleOnClickUpdateButton,
  isDeleteModalOpen,
  isNormalProductEditModalOpen,
  checkedIdList,
  setCheckedIdList,
  handleOnChangeChecks,
}: {
  /**
   * 明細に表示する商品
   */
  // product: ProductDbTableType;
  handleOnClickOpenEditModal: () => void;
  handleOnClickOpenDeleteModal: () => void;
  handleOnEditModalCloseButtonClick: () => void;
  handleOnDeleteModalCloseButtonClick: () => void;
  handleOnClickDestroyButton: () => void;
  handleOnClickUpdateButton: () => void;
  setSelectedProduct: Dispatch<SetStateAction<ProductDbTableType | null>>;
  isDeleteModalOpen: boolean;
  isNormalProductEditModalOpen: boolean;
  checkedIdList: number[];
  setCheckedIdList: Dispatch<SetStateAction<number[]>>;
  handleOnChangeChecks: (checked: boolean, id: number) => Promise<void>;
}): ReactElement => {
  // const [ checked, setChecked ] = useState<boolean>(false);

  // レンダリング中かどうかのフラグ
  // const [ isFirstRender, setIsFirstRender ] = useState(true);

  // useCallbackを使用して関数をメモ化
  // const memoizedHandleOnChangeChecks = useCallback(handleOnChangeChecks, [ handleOnChangeChecks ]);

  // const productIdDataTexts =  [ product.sku, product.id, product.createdAt?.toString() ];
  // const productNameDataTexts = [ product.name, product.nameToSlip ];
  // const productSizeDataTexts = [ `${product.height}×${product.width}×${product.depth}(cm)`, product.weight ];

  const productIdDataTexts = [ "111111", "YP-2", "2024/02/03" ];
  const productNameDataTexts = [ "商品名", "品名" ];
  const productSizeDataTexts = [ "100×200×22(cm)", "3(kg)" ];
  const productBarcodeTexts = [ "●JAN:1111111", "○FNSKU:2222222" ];

  // // useEffects
  // useEffect((): void => {
  //   if (!isFirstRender) {
  //     (async (): Promise<void> => {
  //       if (product.id !== null) {
  //         await memoizedHandleOnChangeChecks(checked, product.id);
  //       }
  //     })();
  //   } else {
  //     setIsFirstRender(prevState => false);
  //   }
  // }, [ checked, isFirstRender, memoizedHandleOnChangeChecks, product.id ]);

  // useEffect((): void => {
  //   if (checked) {
  //     // 追加
  //     setCheckedIdList(prevState => {
  //       if (!prevState) return [];

  //       if (product.id) {
  //         return [ ...prevState ];
  //       }

  //       return prevState;
  //     });
  //   } else {
  //     // 外す
  //     setCheckedIdList(prevState => {
  //       return checkedIdList.filter(item => item !== product.id);
  //     });
  //   }
  // }, [ checked, checkedIdList, product.id, setCheckedIdList ]);

  // // handle
  // const handleOnChangeChecked = async (newChecked: boolean): Promise<void> => {
  //   setChecked(prevState => newChecked);
  // };

  return (
    <TableRow>
      <TableDataCheckbox id="" checked={true} width="w-14" minWidth="min-w-14" />
      <TableDataTexts texts={productIdDataTexts} createEmployeeId="111" />
      <TableDataImage imageUrl={"/images/dummy/dummy-image.png"} text="" />
      <TableDataTexts texts={productNameDataTexts} />
      {/* バーコード情報 */}
      <TableDataTexts texts={productBarcodeTexts} />
      <TableDataText text={"100"} />
      <TableDataTexts texts={productSizeDataTexts} />
      <TableDataText text={"100元(cny)"} />
      <TableDataEnd>
        <FlexWrapperColumn>
          <TableButton text="編集" color="blue" handleClick={handleOnClickOpenEditModal} />
          {isNormalProductEditModalOpen && (
            <NormalProductEditModalGroup
              isOpen={isNormalProductEditModalOpen}
              handleOnClickUpdateButton={handleOnClickUpdateButton}
              handleOnCloseButtonClick={handleOnEditModalCloseButtonClick}
            />
          )}
          <TableButton text="削除" color="red" handleClick={handleOnClickOpenDeleteModal} />
          {isDeleteModalOpen && (
            <DeleteModalGroup
              isOpen={isDeleteModalOpen}
              handleOnClickDestroyButton={handleOnClickDestroyButton}
              handleOnCloseButtonClick={handleOnDeleteModalCloseButtonClick}
              // prevProduct={product}
            />
          )}
        </FlexWrapperColumn>
      </TableDataEnd>
    </TableRow>
  );
};

export default NormalProductItem;
