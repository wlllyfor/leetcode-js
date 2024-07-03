"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { routes } from "@/routes";
import { useRecoilValue } from "recoil";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { Str } from "@/lib/Str";
import { ReceiveStockDetailDbTableType } from "@/types/db/receiveStock/receiveStockDetail";
import { ProductDbTableType } from "@/types/db/product/product";
import { ReceiveStockDetailEntityType } from "@/types/entity/ReceiveStockDetailEntityType";

interface ApiResponse {
  body: {
    receiveStockDetails: ReceiveStockDetailDbTableType[];
  };
}

type ReceivableProductIndexConditionType = {
  barcode: string | null;
};

const useReceivableIndex = (): {
  product: ProductDbTableType | null;
  getReceiveStocks: () => Promise<void>;
  condition: ReceivableProductIndexConditionType;
  setCondition: Dispatch<SetStateAction<ReceivableProductIndexConditionType>>;
  receiveStockDetailEntities: ReceiveStockDetailEntityType[];
  setReceiveStockDetailEntities: Dispatch<SetStateAction<ReceiveStockDetailEntityType[]>>;
} => {
  const auth = useRecoilValue(EmployeeState);
  const [ product, setProduct ] = useState<ProductDbTableType | null>(null);

  // 検索条件
  const [ condition, setCondition ] = useState<ReceivableProductIndexConditionType>({
    barcode: null,
  });

  const [ receiveStockDetailEntities, setReceiveStockDetailEntities ] = useState<ReceiveStockDetailEntityType[]>([]);

  const getReceiveStocks = useCallback(async (): Promise<void> => {
    if (!condition.barcode) {
      return;
    }

    EmployeeAxios._setToken(auth);
    try {
      const params = {
        barcode: condition.barcode,
      };

      const response = await EmployeeAxios.get<ApiResponse>({
        uri: routes.api.employee.receiveStock.receivableIndex.url,
        params: Str.decamelizeKeys(params),
      });

      const receiveStockDetails = response.data.body.receiveStockDetails as ReceiveStockDetailDbTableType[];

      setReceiveStockDetailEntities(prevState => {
        return receiveStockDetails.map(receiveStockDetail => {
          return {
            uuid: receiveStockDetail.uuid,
            receiveStockDetail: receiveStockDetail,
            receiveStockQuantity: 0,
          };
        });
      });

      setProduct(prevState => receiveStockDetails[0]?.product);
    } catch (error) {
      EmployeeAxios.showErrors(error);
    }
  }, [ condition, auth ]);

  return {
    product,
    getReceiveStocks,
    condition,
    setCondition,
    receiveStockDetailEntities,
    setReceiveStockDetailEntities,
  };
};

export { useReceivableIndex };
