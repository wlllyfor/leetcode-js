"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { routes, setIdPathParam } from "@/routes";
import CustomerAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { toast } from "react-toastify";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { LeaveStockTableDbType } from "@/types/db/leaveStock/leaveStock";
import { ShipToAddressDbTableType } from "@/types/db/shipToAddress";
import { CountryDbTableType } from "@/types/db/country";
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

export type LeaveStockForUpdateType = {
  id: number;
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

  // options
  defaultCountry: ReactSelectOption | null;
  defaultShipFromAddress: ReactSelectOption | null;
};

export const defaultLeaveStockForUpdateType: LeaveStockForUpdateType = {
  id: 0,
  productAndQuantities: [],
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
  defaultCountry: null,
  defaultShipFromAddress: null,
};

const useUpdate = (): {
  updateLeaveStock: () => Promise<void>;
  leaveStockForUpdate: LeaveStockForUpdateType | undefined;
  setLeaveStockForUpdate: Dispatch<SetStateAction<LeaveStockForUpdateType | undefined>>;
  isUpdated: boolean;
  setIsUpdated: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(CustomerState);

  const [ leaveStockForUpdate, setLeaveStockForUpdate ] = useState<LeaveStockForUpdateType>();

  const [ isUpdated, setIsUpdated ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const updateLeaveStock = async (): Promise<void> => {
    if (!leaveStockForUpdate) {
      return;
    }
    CustomerAxios._setToken(auth);
    setValidationErrors(prevState => []);

    const body = {
      id: leaveStockForUpdate.id,
      country_id: leaveStockForUpdate.countryId,
      postal_code: leaveStockForUpdate.postalCode,
      prefecture_name: leaveStockForUpdate.prefectureName,
      city_name: leaveStockForUpdate.cityName,
      town_name: leaveStockForUpdate.townName,
      building_name: leaveStockForUpdate.buildingName,
      name: leaveStockForUpdate.name,
      tel: leaveStockForUpdate.tel,
      ship_from_address_id: leaveStockForUpdate.shipFromAddressId,
      public_remarks: leaveStockForUpdate.publicRemarks,
      public_remarks_file: leaveStockForUpdate.publicRemarksFile,
      products: leaveStockForUpdate?.productAndQuantities.map(productAndQuantity => {
        return {
          id: productAndQuantity.option.value,
          quantity: productAndQuantity.quantity,
        };
      }),
    };

    try {
      const uri = setIdPathParam(leaveStockForUpdate.id, routes.api.customer.leaveStock.update.url);

      await CustomerAxios.put<ApiResponse>({
        uri: uri,
        isMultiPart: true,
        body: Str.decamelizeKeys(body),
      });

      setIsUpdated(prevState => true);
      toast.success("更新に成功しました");
    } catch (error) {
      CustomerAxios.showErrors(error);
      const validationErrors = CustomerAxios.get422Errors(error);
      await setValidationErrors(prevState => validationErrors);
      toast.error("入力内容に不備があります。");
    }
  };

  return {
    updateLeaveStock,
    leaveStockForUpdate,
    setLeaveStockForUpdate,
    isUpdated,
    setIsUpdated,
    validationErrors,
    setValidationErrors,
  };
};

export { useUpdate };
