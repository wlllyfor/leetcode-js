import { Str } from "@/lib/Str";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { routes } from "@/routes";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import { CountryDbType } from "@/types/db/country";
import { CurrencyDbType } from "@/types/db/currency";
import { PlanDbType } from "@/types/db/plan";
import { TaxDbTableType } from "@/types/db/tax";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";

type ApiResponse = {
  body: {
    supplier: {
      id: number;
      hub_id: number;
      name: string;
      createdOn: string;
      updatedOn: string;
      createdAt: string;
      updatedAt: string;
      deletedAt: string;
      hub: {
        id: number;
        name: string;
        code: string;
        countryId: number;
        currencyId: number;
        createdAt: string;
        updatedAt: string;
        deletedAt: string;
        country: CountryDbType;
        currency: CurrencyDbType;
        currentTaxRate: TaxDbTableType;
      };
      plans: PlanDbType[];
    };
  };
};

type SupplierForPostType = {
  hub_id: number | null;
  name: string;
};

const defaultSupplierForPostType: SupplierForPostType = {
  hub_id: null,
  name: "",
};

export const useStore = (): {
  postSupplier: () => Promise<void>;
  supplierForPost: SupplierForPostType;
  setSupplierForPost: Dispatch<SetStateAction<SupplierForPostType>>;
  isLoading: boolean;
  isStored: boolean;
  setIsStored: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(EmployeeState);

  const [ supplierForPost, setSupplierForPost ] = useState<SupplierForPostType>(defaultSupplierForPostType);

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isStored, setIsStored ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const postSupplier = async (): Promise<void> => {
    if (!supplierForPost) {
      return;
    }

    EmployeeAxios._setToken(auth);
    setValidationErrors(prevState => []);

    const body = {
      hub_id: supplierForPost.hub_id,
      name: supplierForPost.name,
    };

    try {
      setIsLoading(true);

      await EmployeeAxios.post<ApiResponse>({
        uri: routes.api.employee.supplier.store.url,
        isMultiPart: false,
        body: Str.decamelizeKeys(body),
      });
      setIsStored(true);
      toast.success("登録に成功しました");
    } catch (error) {
      EmployeeAxios.showErrors(error);
      const validationErrors = EmployeeAxios.get422Errors(error);
      setValidationErrors(prevState => validationErrors);
      toast.error("入力内容に不備があります。");
    } finally {
      setIsLoading(false);
    }
  };
  return {
    postSupplier,
    supplierForPost,
    setSupplierForPost,
    isLoading,
    isStored,
    setIsStored,
    validationErrors,
    setValidationErrors,
  };
};
