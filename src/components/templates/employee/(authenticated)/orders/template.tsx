"use client";

import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import SearchGroup from "@/components/molecules/search/employee/orders/searchGroup";
import ButtonGroup from "@/components/molecules/buttonGroup/employee/orders/buttonGroup";
import TableHeaderGroup from "@/components/molecules/tableGroup/employee/orders/tableHeaderGroup";
import TableGroup from "@/components/molecules/tableGroup/employee/orders/tableGroup";
import EditModalGroup from "@/components/molecules/modalGroup/employee/orders/editModalGroup";
import WithdrawalModalGroup from "@/components/molecules/modalGroup/employee/orders/withdrawalModalGroup";
import RefundModalGroup from "@/components/molecules/modalGroup/employee/orders/refundModalGroup";
import ArrivalRequestModalGroup from "@/components/molecules/modalGroup/employee/orders/arrivalRequestModalGroup";
import ShippingOrderModalGroup from "@/components/molecules/modalGroup/employee/orders/shippingOrderModalGroup";
import MainInner from "@/components/atoms/div/inner/mainInner";
import AuthenticatedLayout from "@/components/molecules/layouts/employee/authenticatedLayout";
import { useIndex as useOrderStatusIndex } from "@/hooks/enum/orderStatuses/useIndex";
import { useIndex as useHubIndex } from "@/hooks/common/hub/useIndex";
import { useIndex as useGroupIndex } from "@/hooks/common/group/useIndex";
import { useIndex as useEmployeeIndex } from "@/hooks/common/employee/useIndex";
import { useIndex as useDebitStatusIndex } from "@/hooks/enum/debitStatus/useIndex";
import { useIndex as useOrderSortIndex } from "@/hooks/enum/orderSort/useIndex";
import { useIndex as useStockCreateIndex } from "@/hooks/enum/stockCreateStatus/useIndex";
import Loading from "@/components/molecules/common/loading";
import { useIndex as useOrderDetailIndex } from "@/hooks/employee/orderDetail/useIndex";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { Integer } from "@/lib/integer";
import { OrderDetailDbTableType } from "@/types/db/order/orderDetail";
import { Float } from "@/lib/float";
import { useModal } from "@/hooks/useModal";
import { useUpdateBulk } from "@/hooks/employee/orderDetail/useUpdateBulk";
import { useStore } from "@/hooks/employee/employeeCarts/useStore";

const Template = (): ReactElement => {

  const {
    setIsUpdated,
    putOrderDetails,
    setValidationErrors: setUpdateBulkValidationError, validationErrors: updateBulkValidationErrors,
    setOrderDetailForUpdateBulk,
  } = useUpdateBulk();

  const {
    setEmployeeCartForPost, postEmployeeCart,
  } = useStore();

  // 一括修正用モーダル変数
  const {
    isOpen: isEditModalOpen,
    setIsOpen: setIsEditModalOpen,
    handleOnCloseButtonClick: handleOnEditModalCloseButtonClick,
  } = useModal();

  const [ isWithdrawalModalOpen, setWithdrawalModalOpen ] = useState<boolean>(false);
  const [ isRefundModalOpen, setRefundModalOpen ] = useState<boolean>(false);
  const [ isArrivalRequestModalOpen, setArrivalRequestModalOpen ] = useState<boolean>(false);
  const [ isShippingOrderModalOpen, setShippingOrderModalOpen ] = useState<boolean>(false);

  const { getEnums: getOrderStatusOptions, enums: orderStatusOptions } = useOrderStatusIndex();
  const { options: hubOptions, getHubs } = useHubIndex();
  const { options: groupOptions, getGroups } = useGroupIndex();
  const { options: employeeOptions, getEmployees } = useEmployeeIndex();
  const { enums: debitStatusOptions, getEnums: getDebitStatuses } = useDebitStatusIndex();
  const { enums: orderSortOptions, getEnums: getOrderSorts } = useOrderSortIndex();
  const { enums: orderStockCreateStatusOptions, getEnums: getStockCreateStatuses } = useStockCreateIndex();
  const { condition, setCondition, orderDetails, getOrderDetails } = useOrderDetailIndex();

  const [ checkedOrderDetails, setCheckedOrderDetails ] = useState<OrderDetailDbTableType[]>([]);

  useEffect((): void => {
    getOrderStatusOptions("employee");
    getDebitStatuses();
    getOrderSorts();
    getStockCreateStatuses();
    (async (): Promise<void> => {
      await getHubs();
      await getGroups();
      await getEmployees();
    })();
    setIsEditModalOpen(prevState => false);

    setIsUpdated(prevState => false);
    setUpdateBulkValidationError(prevState => []);
  }, [
    getOrderStatusOptions,
    getHubs, getGroups, getEmployees, getDebitStatuses, getStockCreateStatuses, getOrderSorts,
    setIsEditModalOpen, setIsUpdated, setUpdateBulkValidationError,
  ]);

  useEffect((): void => {

    // 更新用Entityの更新
    setOrderDetailForUpdateBulk(prevState => []);

    checkedOrderDetails.map(item => {
      setOrderDetailForUpdateBulk(prevState => {
        if (prevState.length > 0) {
          return [
            ...prevState,
            {
              id: item.id,
              orderStatus: item.orderStatus ?? "",
              mallOrderId: item.mallOrderId,
              shopName: item.shopName,
              orderProductName: item.productName ?? "",
              variation: item.variation ?? "",
              unitPrice: item.unitPrice,
              quantity: item.quantity,
              postage: item.postage,
              publicRemarks: item.publicRemarks,
              publicRemarksFile: item.publicRemarksFile,
              receipt: item.receipt,
              receiptFile: item.receiptFile,
              others: item.orderDetailOthers,
            },
          ];
        }

        return [
          {
            id: item.id,
            orderStatus: item.orderStatus ?? "",
            mallOrderId: item.mallOrderId,
            shopName: item.shopName,
            orderProductName: item.productName ?? "",
            variation: item.variation ?? "",
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            postage: item.postage,
            publicRemarks: item.publicRemarks,
            publicRemarksFile: item.publicRemarksFile,
            receipt: item.receipt,
            receiptFile: item.receiptFile,
            others: item.orderDetailOthers,
          },
        ];
      });
    });


  }, [ checkedOrderDetails, setOrderDetailForUpdateBulk ]);

  // handles

  const handleOrderStatusOptionOnChange = (e: ReactSelectOption[]): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        orderStatusOptions: e,
      };
    });
  };

  const handleHubOptionOnChange = (e: ReactSelectOption[]): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        hubOptions: e,
      };
    });
  };

  const handleStockCreateOptionOnChange = (e: ReactSelectOption[]): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        createStockOptions: e,
      };
    });
  };

  const handleGroupOptionOnChange = (e: ReactSelectOption[]): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        groupOptions: e,
      };
    });
  };

  const handleEmployeeOptionOnChange = (e: ReactSelectOption[]): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        employeeOptions: e,
      };
    });
  };

  const handleDebitStatusOptionOnChange = (e: ReactSelectOption[]): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        debitOptions: e,
      };
    });
  };

  const handleOrderIdOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        orderId: Integer.parseIntExceptNull(e.target.value),
      };
    });
  };

  // 編集モーダルのイベント

  /**
   * 編集モーダル ステータス変更イベント
   * @param {ReactSelectOption} e
   * @param {string} uuid
   */
  const handleOrderStatusOnChangeInEditModal = (e: ReactSelectOption, uuid: string): void => {
    setCheckedOrderDetails(prevState => {
      return prevState.map(orderDetail => {
        if (orderDetail.uuid === uuid) {
          orderDetail.orderStatus = e.value.toString();
        }

        return orderDetail;
      });
    });
  };

  /**
   * 編集モーダル モール注文ID変更イベント
   * @param {ChangeEvent<HTMLInputElement>} e
   * @param {string} uuid
   */
  const handleMallOrderIdOnChangeInEditModal = (e: ChangeEvent<HTMLInputElement>, uuid: string): void => {
    setCheckedOrderDetails(prevState => {
      return prevState.map(orderDetail => {
        if (orderDetail.uuid === uuid) {
          orderDetail.mallOrderId = e.target.value;
        }

        return orderDetail;
      });
    });
  };

  /**
   * 編集モーダル 仕入先名変更イベント
   * @param {ChangeEvent<HTMLInputElement>} e
   * @param {string} uuid
   */
  const handleShopNameOnChangeInEditModal = (e: ChangeEvent<HTMLInputElement>, uuid: string): void => {
    setCheckedOrderDetails(prevState => {
      return prevState.map(orderDetail => {
        if (orderDetail.uuid === uuid) {
          orderDetail.shopName = e.target.value;
        }

        return orderDetail;
      });
    });
  };

  /**
   * 編集モーダル 商品名変更イベント
   * @param {ChangeEvent<HTMLInputElement>} e
   * @param {string} uuid
   */
  const handleProductNameOnChangeInEditModal = (e: ChangeEvent<HTMLInputElement>, uuid: string): void => {
    setCheckedOrderDetails(prevState => {
      return prevState.map(orderDetail => {
        if (orderDetail.uuid === uuid) {
          orderDetail.productName = e.target.value;
        }

        return orderDetail;
      });
    });
  };

  /**
   * 編集モーダル バリエーション変更イベント
   * @param {ChangeEvent<HTMLInputElement>} e
   * @param {string} uuid
   */
  const handleVariationOnChangeInEditModal = (e: ChangeEvent<HTMLInputElement>, uuid: string): void => {
    setCheckedOrderDetails(prevState => {
      return prevState.map(orderDetail => {
        if (orderDetail.uuid === uuid) {
          orderDetail.variation = e.target.value;
        }

        return orderDetail;
      });
    });
  };

  /**
   * 編集モーダル 単価変更イベント
   * @param {ChangeEvent<HTMLInputElement>} e
   * @param {string} uuid
   */
  const handleUnitPriceOnChangeInEditModal = (e: ChangeEvent<HTMLInputElement>, uuid: string): void => {
    setCheckedOrderDetails(prevState => {
      return prevState.map(orderDetail => {
        if (orderDetail.uuid === uuid) {
          orderDetail.unitPrice = Float.parseFloatExceptZero(e.target.value);
        }

        return orderDetail;
      });
    });
  };

  /**
   * 編集モーダル 数量変更イベント
   * @param {ChangeEvent<HTMLInputElement>} e
   * @param {string} uuid
   */
  const handleQuantityOnChangeInEditModal = (e: ChangeEvent<HTMLInputElement>, uuid: string): void => {
    setCheckedOrderDetails(prevState => {
      return prevState.map(orderDetail => {
        if (orderDetail.uuid === uuid) {
          orderDetail.quantity = Integer.parseIntExceptZero(e.target.value);
        }

        return orderDetail;
      });
    });
  };

  /**
   * 編集モーダル 送料変更イベント
   * @param {ChangeEvent<HTMLInputElement>} e
   * @param {string} uuid
   */
  const handlePostageOnChangeInEditModal = (e: ChangeEvent<HTMLInputElement>, uuid: string): void => {
    setCheckedOrderDetails(prevState => {
      return prevState.map(orderDetail => {
        if (orderDetail.uuid === uuid) {
          orderDetail.postage = Integer.parseIntExceptZero(e.target.value);
        }

        return orderDetail;
      });
    });
  };

  /**
   * 編集モーダル 備考変更イベント
   * @param {ChangeEvent<HTMLTextAreaElement>} e
   * @param {string} uuid
   */
  const handlePublicRemarksOnChangeInEditModal = (e: ChangeEvent<HTMLTextAreaElement>, uuid: string): void => {
    setCheckedOrderDetails(prevState => {
      return prevState.map(orderDetail => {
        if (orderDetail.uuid === uuid) {
          orderDetail.publicRemarks = e.target.value;
        }

        return orderDetail;
      });
    });
  };

  /**
   * 編集モーダル 備考添付ファイル変更イベント
   * @param {ChangeEvent<HTMLInputElement>} e
   * @param {string} uuid
   */
  const handlePublicRemarksFileOnChangeInEditModal = (e: ChangeEvent<HTMLInputElement>, uuid: string): void => {
    setCheckedOrderDetails(prevState => {
      return prevState.map(orderDetail => {
        if (orderDetail.uuid === uuid) {
          orderDetail.privateRemarksFile = e.target.files ? e.target.files[0] : null;
        }

        return orderDetail;
      });
    });
  };

  /**
   * 編集モーダル 領収書変更イベント
   * @param {ChangeEvent<HTMLTextAreaElement>} e
   * @param {string} uuid
   */
  const handleReceiptOnChangeInEditModal = (e: ChangeEvent<HTMLTextAreaElement>, uuid: string): void => {
    setCheckedOrderDetails(prevState => {
      return prevState.map(orderDetail => {
        if (orderDetail.uuid === uuid) {
          orderDetail.privateRemarks = e.target.value;
        }

        return orderDetail;
      });
    });
  };

  /**
   * 編集モーダル 領収書添付ファイル変更イベント
   * @param {ChangeEvent<HTMLInputElement>} e
   * @param {string} uuid
   */
  const handleReceiptFileOnChangeInEditModal = (e: ChangeEvent<HTMLInputElement>, uuid: string): void => {
    setCheckedOrderDetails(prevState => {
      return prevState.map(orderDetail => {
        if (orderDetail.uuid === uuid) {
          orderDetail.privateRemarksFile = e.target.files ? e.target.files[0] : null;
        }

        return orderDetail;
      });
    });
  };

  /**
   * 編集モーダル その他金額 名称変更イベント
   * @param {ChangeEvent<HTMLInputElement>} e
   * @param {string} uuid
   * @param orderOtherUuid
   */
  const handleOtherNameOnChangeInEditModal = (e: ChangeEvent<HTMLInputElement>, uuid: string, orderOtherUuid: string): void => {
    setCheckedOrderDetails(prevState => {
      return prevState.map(orderDetail => {

        if (orderDetail.uuid === uuid) {
          orderDetail.orderDetailOthers = orderDetail.orderDetailOthers.map(orderOther => {
            if (orderOther.uuid === orderOtherUuid) {
              orderOther.name = e.target.value;
            }

            return orderOther;
          });
        }
        return orderDetail;

      });
    });
  };

  /**
   * 編集モーダル その他金額 金額変更イベント
   * @param {ChangeEvent<HTMLInputElement>} e
   * @param {string} uuid
   * @param orderOtherUuid
   */
  const handleOtherUnitPriceOnChangeInEditModal = (e: ChangeEvent<HTMLInputElement>, uuid: string, orderOtherUuid: string): void => {
    setCheckedOrderDetails(prevState => {
      return prevState.map(orderDetail => {

        if (orderDetail.uuid === uuid) {
          orderDetail.orderDetailOthers = orderDetail.orderDetailOthers.map(orderOther => {
            if (orderOther.uuid === orderOtherUuid) {
              orderOther.price = Float.parseFloatExceptZero(e.target.value);
            }

            return orderOther;
          });
        }
        return orderDetail;

      });
    });
  };

  /**
   * 編集モーダル その他金額 数量変更イベント
   * @param {ChangeEvent<HTMLInputElement>} e
   * @param {string} uuid
   * @param orderOtherUuid
   */
  const handleOtherQuantityOnChangeInEditModal = (e: ChangeEvent<HTMLInputElement>, uuid: string, orderOtherUuid: string): void => {
    setCheckedOrderDetails(prevState => {
      return prevState.map(orderDetail => {

        if (orderDetail.uuid === uuid) {
          orderDetail.orderDetailOthers = orderDetail.orderDetailOthers.map(orderOther => {
            if (orderOther.uuid === orderOtherUuid) {
              orderOther.quantity = Integer.parseIntExceptZero(e.target.value);
            }

            return orderOther;
          });
        }
        return orderDetail;

      });
    });
  };


  // use effects

  useEffect((): void => {
    // 検索を行う
    (async (): Promise<void> => {
      await getOrderDetails();
    })();

  }, [ condition, getOrderDetails ]);

  const handleEditButtonClick = () => {
    alert("編集ボタン");
  };

  /**
   * カートに入れる
   */
  const handleCartButtonClick = (): void => {
    (async (): Promise<void> => {
      await postEmployeeCart();
      await getOrderDetails();
    })();
  };

  const handleCancelButtonClick = () => {
    alert("キャンセルボタン");
  };

  /**
   * 明細行がチェックされたときのイベント
   */
  const handleDetailOnChecked = (e: ChangeEvent<HTMLInputElement>, uuid: string): void => {
    const checked = e.target.checked;

    if (checked) {
      const foundOrderDetail = orderDetails.find(item => item.uuid === uuid);
      if (foundOrderDetail) {
        setCheckedOrderDetails(prevState => {
          return [
            ...prevState,
            foundOrderDetail,
          ];
        });

        setEmployeeCartForPost(prevState => {
          return {
            orderDetailIdList: [
              ...prevState.orderDetailIdList,
              foundOrderDetail.id,
            ],
          };
        });
      }

    } else {
      const filtered = checkedOrderDetails.filter(item => item.uuid !== uuid);
      const orderIdList = filtered.map(item => {
        return item.id;
      });
      setCheckedOrderDetails(prevState => checkedOrderDetails.filter(item => item.uuid !== uuid));
      setEmployeeCartForPost(prevState => {
        return {
          orderDetailIdList: orderIdList,
        };
      });
    }
  };

  if (!orderStatusOptions || !hubOptions || !groupOptions || !employeeOptions || !debitStatusOptions || !orderSortOptions || !orderStockCreateStatusOptions) {
    return <Loading />;
  }

  return (
    <>
      <AuthenticatedLayout>
        <MainInner>
          <SearchGroup
            orderStatusesOptions={orderStatusOptions} hubOptions={hubOptions} groupOptions={groupOptions}
            employeeOptions={employeeOptions} debitStatusOptions={debitStatusOptions}
            orderStockCreateStatusOptions={orderStockCreateStatusOptions}
            orderStatusOptionValues={condition.orderStatusOptions}
            hubOptionValues={condition.hubOptions} groupOptionValues={condition.groupOptions}
            employeeOptionValues={condition.employeeOptions} debitStatusOptionValues={condition.debitOptions}
            orderStockCreateStatusOptionValues={condition.createStockOptions}
            orderId={condition.orderId}
            handleOrderStatusOptionOnChange={handleOrderStatusOptionOnChange}
            handleHubOptionOnChange={handleHubOptionOnChange}
            handleStockCreateOptionOnChange={handleStockCreateOptionOnChange}
            handleGroupOptionOnChange={handleGroupOptionOnChange}
            handleEmployeeOptionOnChange={handleEmployeeOptionOnChange}
            handleDebitStatusOptionOnChange={handleDebitStatusOptionOnChange}
            handleOrderIdOnChange={handleOrderIdOnChange}
          />
          <ButtonGroup
            checkedOrderDetails={checkedOrderDetails}
            orderSortOptions={orderSortOptions}
            handleEditButtonClick={() => setIsEditModalOpen(true)}
            handleWithdrawalButtonClick={() => setWithdrawalModalOpen(true)}
            handleCartButtonClick={handleCartButtonClick}
            handleRefundButtonClick={() => setRefundModalOpen(true)}
            handleCancelButtonClick={handleCancelButtonClick}
            handleArrivalRequestButtonClick={() => setArrivalRequestModalOpen(true)}
            handleShippingOrderButtonClick={() => setShippingOrderModalOpen(true)}
          />
          <TableHeaderGroup />
          <TableGroup
            handleEditButtonClick={handleEditButtonClick} orderDetails={orderDetails}
            handleOnChecked={handleDetailOnChecked} checkedOrderDetails={checkedOrderDetails}
          />
        </MainInner>
        <EditModalGroup
          isOpen={isEditModalOpen} handleClose={handleOnEditModalCloseButtonClick}
          checkedOrderDetails={checkedOrderDetails}
          orderStatusOptions={orderStatusOptions}
          handleOrderStatusOnChange={handleOrderStatusOnChangeInEditModal}
          handleMallOrderIdOnChange={handleMallOrderIdOnChangeInEditModal}
          handleShopNameOnChange={handleShopNameOnChangeInEditModal}
          handleProductNameOnChange={handleProductNameOnChangeInEditModal}
          handleVariationOnChange={handleVariationOnChangeInEditModal}
          handleUnitPriceOnChange={handleUnitPriceOnChangeInEditModal}
          handleQuantityOnChange={handleQuantityOnChangeInEditModal}
          handlePostageOnChange={handlePostageOnChangeInEditModal}
          handlePublicRemarksOnChange={handlePublicRemarksOnChangeInEditModal}
          handlePublicRemarksFileOnChange={handlePublicRemarksFileOnChangeInEditModal}
          handleReceiptOnChange={handleReceiptOnChangeInEditModal}
          handleReceiptFileOnChange={handleReceiptFileOnChangeInEditModal}
          handleOtherNameOnChange={handleOtherNameOnChangeInEditModal}
          handleOtherUnitPriceOnChange={handleOtherUnitPriceOnChangeInEditModal}
          handleOtherQuantityOnChange={handleOtherQuantityOnChangeInEditModal}
          putOrderDetails={putOrderDetails}
          validationErrors={updateBulkValidationErrors}
        />
        <WithdrawalModalGroup
          isOpen={isWithdrawalModalOpen} handleClose={() => setWithdrawalModalOpen(false)}
          checkedOrderDetails={checkedOrderDetails}
        />
        <RefundModalGroup
          isOpen={isRefundModalOpen} handleClose={() => setRefundModalOpen(false)}
          checkedOrderDetails={checkedOrderDetails}
        />
        <ArrivalRequestModalGroup
          isOpen={isArrivalRequestModalOpen}
          handleClose={() => setArrivalRequestModalOpen(false)}
          checkedOrderDetails={checkedOrderDetails}
        />
        <ShippingOrderModalGroup
          isOpen={isShippingOrderModalOpen}
          handleClose={() => setShippingOrderModalOpen(false)}
          checkedOrderDetails={checkedOrderDetails}
        />
      </AuthenticatedLayout>
    </>
  );
};

export default Template;
