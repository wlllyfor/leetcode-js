"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { routes } from "@/routes";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { LeaveStockTableDbType } from "@/types/db/leaveStock/leaveStock";
import { ShipToAddressDbTableType } from "@/types/db/shipToAddress";
import { CountryDbTableType } from "@/types/db/country";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { Str } from "@/lib/Str";
import { UUID } from "@/lib/uuid";

interface ApiResponse {
  body: {
    leaveStock: LeaveStockTableDbType;
  };
}

export type ProductAndQuantityType = {
  uuid: string;
  option: ReactSelectOption;
  quantity: number;
};

export type LeaveStockForPostType = {
  customerId: number | null;
  orderDetailId: number | null;
  productAndQuantities: ProductAndQuantityType[];
  shipFromAddressId: number | null;
  shipToAddressId: number | null;
  srcShipToAddress: ShipToAddressDbTableType | null;
  countryId: number | null;
  country: CountryDbTableType | null;
  countryOption: ReactSelectOption | null;
  postalCode: string | null;
  prefectureName: string;
  cityName: string;
  townName: string;
  buildingName: string;
  name: string;
  tel: string;
  publicRemarks: string | null;
  publicRemarksFile: File | null;
};

export const defaultLeaveStockForPostType: LeaveStockForPostType = {
  customerId: null,
  orderDetailId: null,
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
  shipToAddressId: null,
  srcShipToAddress: null,
  countryId: null,
  country: null,
  countryOption: null,
  postalCode: "",
  prefectureName: "",
  cityName: "",
  townName: "",
  buildingName: "",
  name: "",
  tel: "",
  publicRemarks: null,
  publicRemarksFile: null,
  shipFromAddressId: null,
};

const useStore = (): {
  postLeaveStock: () => Promise<void>;
  leaveStockForPost: LeaveStockForPostType | undefined;
  setLeaveStockForPost: Dispatch<SetStateAction<LeaveStockForPostType | undefined>>;
  isStored: boolean;
  setIsStored: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(EmployeeState);

  const [ leaveStockForPost, setLeaveStockForPost ] = useState<LeaveStockForPostType>();

  const [ isStored, setIsStored ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const postLeaveStock = async (): Promise<void> => {
    if (!leaveStockForPost) {
      return;
    }
    EmployeeAxios._setToken(auth);
    setValidationErrors(prevState => []);

    const body = {
      customerId: leaveStockForPost.customerId,
      orderDetailId: leaveStockForPost.orderDetailId,
      countryId: leaveStockForPost.countryId,
      postalCode: leaveStockForPost.postalCode,
      prefectureName: leaveStockForPost.prefectureName,
      cityName: leaveStockForPost.cityName,
      townName: leaveStockForPost.townName,
      buildingName: leaveStockForPost.buildingName,
      name: leaveStockForPost.name,
      tel: leaveStockForPost.tel,
      shipFromAddressId: leaveStockForPost.shipFromAddressId,
      publicRemarks: leaveStockForPost.publicRemarks,
      publicRemarksFile: leaveStockForPost.publicRemarksFile,
      products: leaveStockForPost?.productAndQuantities.map(productAndQuantity => {
        return {
          id: productAndQuantity.option.value,
          quantity: productAndQuantity.quantity,
        };
      }),
    };

    try {
      await EmployeeAxios.post<ApiResponse>({
        uri: routes.api.employee.leaveStock.store.url,
        isMultiPart: true,
        body: Str.decamelizeKeys(body),
      });

      setIsStored(prevState => true);
      toast.success("登録に成功しました");
    } catch (error) {
      EmployeeAxios.showErrors(error);
      const validationErrors = EmployeeAxios.get422Errors(error);
      setValidationErrors(prevState => validationErrors);
      toast.error("入力内容に不備があります。");
    }
  };

  return {
    postLeaveStock,
    leaveStockForPost,
    setLeaveStockForPost,
    isStored,
    setIsStored,
    validationErrors,
    setValidationErrors,
  };
};

export { useStore };
