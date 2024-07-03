import { ShipFromAddressDbTableType } from "@/types/db/shipFromAddress";
import { Dispatch, SetStateAction, useState } from "react";
import { useRecoilValue } from "recoil";
import CustomerAxios from "@/lib/axios/customer-axios";
import { CustomerState } from "@/store/Auth/CustomerState";
import { routes } from "@/routes";
import { toast } from "react-toastify";
import useAuth from "@/hooks/customer/useAuth";
import { Str } from "@/lib/Str";

interface ApiResponse {
  body: {
    shipFromAddress: ShipFromAddressDbTableType;
  };
}

export type ShipFromAddressForPostType = {
  countryId: number | null;
  postalCode: string | null;
  prefectureName: string;
  cityName: string;
  townName: string;
  buildingName: string;
  name: string;
  tel: string;
  isDefault: boolean;
};

const useStore = (): {
  postShipFromAddress: () => void;
  shipFromAddressForPost: ShipFromAddressForPostType;
  setShipFromAddressForPost: Dispatch<SetStateAction<ShipFromAddressForPostType>>;
  isStored: boolean;
  setIsStored: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(CustomerState);
  const customer = useAuth();
  const [ isStored, setIsStored ] = useState<boolean>(false);
  const [ shipFromAddressForPost, setShipFromAddressForPost ] = useState<ShipFromAddressForPostType>({
    countryId: null,
    postalCode: "",
    prefectureName: "",
    cityName: "",
    townName: "",
    buildingName: "",
    name: "",
    tel: "",
    isDefault: false,
  });

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const postShipFromAddress = async (): Promise<void> => {
    CustomerAxios._setToken(auth);
    setValidationErrors(prevState => []);

    const body = {
      countryId: shipFromAddressForPost.countryId,
      customerId: customer?.id,
      postalCode: shipFromAddressForPost.postalCode,
      prefectureName: shipFromAddressForPost.prefectureName,
      cityName: shipFromAddressForPost.cityName,
      townName: shipFromAddressForPost.townName,
      buildingName: shipFromAddressForPost.buildingName,
      name: shipFromAddressForPost.name,
      tel: shipFromAddressForPost.tel,
      isDefault: shipFromAddressForPost.isDefault,
    };

    try {
      await CustomerAxios.post<ApiResponse>({
        uri: routes.api.customer.shipFromAddress.store.url,
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
    postShipFromAddress,
    shipFromAddressForPost,
    setShipFromAddressForPost,
    isStored,
    setIsStored,
    validationErrors,
    setValidationErrors,
  };
};

export { useStore };
