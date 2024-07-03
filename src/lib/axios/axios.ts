"use client";

import { CustomerState } from "@/store/Auth/CustomerState";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import { EnumAuth } from "@/types/store/auth/RecoilType";
import axios, { AxiosError } from "axios";
import { RecoilState } from "recoil";
import { routes } from "@/routes";
import { AuthStateType } from "@/store/Auth/AuthState";
import { toast } from "react-toastify";
import { CustomerDbTableType } from "@/types/db/customer";
import { EmployeeDbTableType } from "@/types/db/employee";

interface ApiResponse {
  status: number;
  body: {
    customer?: CustomerDbTableType;
    employee?: EmployeeDbTableType;
  };
}

interface ValidationMessages {
  [key: string]: string[];
}

const DEFAULT_TIMEOUT_LIMIT = 30 * 1000;

export class CoreApiRequest {
  private readonly authType: EnumAuth;

  constructor(authType: EnumAuth) {
    this.authType = authType;
    // amplifyではAPI_URLが優先。ローカルではNEXT_PUBLIC_API_URL。
    axios.defaults.baseURL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;
    axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    axios.defaults.timeout = DEFAULT_TIMEOUT_LIMIT;
  }

  getRecoilType(): RecoilState<AuthStateType> | null {
    if (this.authType === EnumAuth.Customer) {
      return CustomerState;
    }
    if (this.authType === EnumAuth.Employee) {
      return EmployeeState;
    }
    return null;
  }

  _resetToken(): void {
    axios.defaults.headers.common.Authorization = "";
  }

  _setToken(auth: AuthStateType): void {
    if (this.getRecoilType() === null) {
      return;
    }

    axios.defaults.headers.common.Authorization = `Bearer ${auth.accessToken}`;
  }

  async getMe(): Promise<CustomerDbTableType | EmployeeDbTableType | undefined> {
    if (this.getRecoilType() === CustomerState) {
      const response = await this.post<ApiResponse>({
        uri: routes.api.customer.me.url,
      });
      return response.data?.body?.customer;
    }
    if (this.getRecoilType() === EmployeeState) {
      const response = await this.post<ApiResponse>({
        uri: routes.api.employee.me.url,
      });
      return response.data?.body?.employee;
    }
  }

  _getContentTypeHeader(isMultiPart: boolean) {
    return {
      Accept: "application/json",
      "Content-Type": isMultiPart ? "multipart/form-data" : "application/json",
    };
  }

  async get<T>({ uri, params }: { uri: string; params?: Record<string, unknown>; }) {
    const timestamp: number = new Date().getTime();

    return axios.get<T>(`${uri}?timestamp=${timestamp}`, {
      params: params,
    });
  }

  async post<T = unknown>({
    uri,
    body,
    isMultiPart = false,
  }: {
    uri: string;
    body?: Record<string, unknown>;
    isMultiPart?: boolean;
  }) {
    const headers = this._getContentTypeHeader(isMultiPart);
    return axios.post<T>(uri, body, { headers });
  }

  async put<T = unknown>({
    uri,
    body,
    isMultiPart = false,
  }: {
    uri: string;
    body?: Record<string, unknown>;
    isMultiPart?: boolean;
  }) {
    const headers = this._getContentTypeHeader(isMultiPart);

    return axios.post<T>(uri, { ...body, _method: "PUT" }, { headers });
  }

  async delete<T = unknown>({
    uri,
    params,
    body,
  }: {
    uri: string;
    params?: Record<string, unknown>;
    body?: Record<string, unknown>;
  }) {
    return axios.post<T>(uri, { ...body, _method: "DELETE" });
  }

  showErrors = (error: unknown, toastable: boolean = false): void => {
    const axiosError = error as AxiosError;

    if (axiosError?.response) {
      const status = axiosError.response.status;
      const responseData = axiosError.response.data;

      if (status === 422) {
        // get422Errors()に任せる
        if (process.env.NODE_ENV === "development") {
          console.error(responseData);

          if (toastable) {
            const errorMessage = Object.values(
              (
                responseData as {
                  errors: ValidationMessages;
                }
              ).errors,
            )
              .flat()
              .join("\n");
            toast.error(errorMessage);
          }
        }
      } else {
        if (process.env.NODE_ENV === "development") {
          // 他のHTTPエラー
          console.error(responseData);
        }
      }
    } else {
      if (process.env.NODE_ENV === "development") {
        // ネットワークエラーまたはその他のエラー
        console.error(axiosError.message);
      }
    }
  };

  get422Errors = (error: unknown): string[] => {
    const axiosError = error as AxiosError;

    if (axiosError?.response) {
      const status = axiosError.response.status;
      const responseData = axiosError.response.data as {
        status: number;
        errors: ValidationMessages;
      };
      if (status === 422) {
        // validation error
        return Object.values(responseData.errors).flat() as string[];
      }
    }
    return [];
  };

  setupResponseInterceptorOnEmployee(): void {
    axios.interceptors.response.use(
      response => {
        // 200のステータスコードの場合はそのままレスポンスを返す
        return response;
      },
      error => {
        // 200以外のステータスコードの場合は特定のページにリダイレクト
        if (error.response && error.response.status !== 200) {
          if (error.response.status === 401) {
            window.location.assign("/employee/auth/login");
          }
        }

        if (error.code === "ECONNABORTED") {
          throw new Error("タイムアウトエラーになりました。時間を置いてから再度実行してください。");
        }

        return Promise.reject(error);
      },
    );
  }

  setupResponseInterceptorOnCustomer(): void {
    axios.interceptors.response.use(
      response => {
        // 200のステータスコードの場合はそのままレスポンスを返す
        return response;
      },
      error => {
        // 200以外のステータスコードの場合は特定のページにリダイレクト
        if (error.response && error.response.status !== 200) {
          if (error.response.status === 401) {
            window.location.assign("/");
          }
        }

        if (error.code === "ECONNABORTED") {
          throw new Error("タイムアウトエラーになりました。時間を置いてから再度実行してください。");
        }

        return Promise.reject(error);
      },
    );
  }
}
