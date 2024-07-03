import { Str } from "@/lib/Str";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { routes } from "@/routes";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import { SubjectDbTableType } from "@/types/db/bankAccounts/SubjectDbTableType";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";

type ApiResponse = {
  body: {
    subject: SubjectDbTableType;
  };
};

type SubjectForPostType = {
  hub_id: number | null;
  name: string;
  /** 科目は売上科目と同じAPIを使用するため、is_profitはtrue固定 */
  is_profit: true;
};

const defaultSubjectForPostType: SubjectForPostType = {
  hub_id: null,
  name: "",
  is_profit: true,
};

/** 売上科目登録 */
export const useStore = (): {
  postSubject: () => Promise<void>;
    profitForPost: SubjectForPostType;
    setProfitForPost: Dispatch<SetStateAction<SubjectForPostType>>;
    isLoading: boolean;
    isStored: boolean;
    setIsStored: Dispatch<SetStateAction<boolean>>;
    validationErrors: string[];
    setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(EmployeeState);

  const [ profitForPost, setProfitForPost ] = useState<SubjectForPostType>(defaultSubjectForPostType);

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isStored, setIsStored ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const postSubject = async (): Promise<void> => {
    if(!profitForPost) {
      return;
    }

    EmployeeAxios._setToken(auth);
    setValidationErrors(prevState => []);

    const body = {
      hub_id: profitForPost.hub_id,
      name: profitForPost.name,
      is_profit: true,
    };

    try {
      setIsLoading(true);

      await EmployeeAxios.post<ApiResponse>({
        uri: routes.api.employee.subject.store.url,
        isMultiPart: false,
        body: Str.decamelizeKeys(body),
      });
      setIsStored(prevState => true);
      toast.success("登録しました");
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
    postSubject,
    profitForPost,
    setProfitForPost,
    isLoading,
    isStored,
    setIsStored,
    validationErrors,
    setValidationErrors,
  };
};
