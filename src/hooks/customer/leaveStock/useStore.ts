"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { routes } from "@/routes";
import CustomerAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { toast } from "react-toastify";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { LeaveStockTableDbType } from "@/types/db/leaveStock/leaveStock";
import { ShipToAddressDbTableType } from "@/types/db/shipToAddress";
import { CountryDbTableType } from "@/types/db/country";
import { UUID } from "@/lib/uuid";
import { Str } from "@/lib/Str";

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
  hubCode: string | null;
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
  hubCode: null,
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
  const auth = useRecoilValue(CustomerState);

  const [ leaveStockForPost, setLeaveStockForPost ] = useState<LeaveStockForPostType>();

  const [ isStored, setIsStored ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const postLeaveStock = async (): Promise<void> => {
    if (!leaveStockForPost) {
      return;
    }
    CustomerAxios._setToken(auth);
    setValidationErrors(prevState => []);

    const body = {
      hubCode: leaveStockForPost.hubCode,
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
      await CustomerAxios.post<ApiResponse>({
        uri: routes.api.customer.leaveStock.store.url,
        isMultiPart: true,
        body: Str.decamelizeKeys(body),
      });

      setIsStored(prevState => true);
      toast.success("登録に成功しました");
    } catch (error) {
      CustomerAxios.showErrors(error);
      const validationErrors = CustomerAxios.get422Errors(error);
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
