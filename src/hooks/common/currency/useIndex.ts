"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import GuestAxios from "@/lib/axios/guest-axios";
import { routes } from "@/routes";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { CurrencyDbType } from "@/types/db/currency";

interface ApiResponse {
  body: {
    currencies: CurrencyDbType[];
  };
}

const useIndex = (): {
  currencies: CurrencyDbType[];
  getCurrencies: () => Promise<void>;
  options: ReactSelectOption[];
  setOptions: Dispatch<SetStateAction<ReactSelectOption[]>>;
} => {
  const [ currencies, setCurrencies ] = useState<CurrencyDbType[]>([]);
  const [ options, setOptions ] = useState<ReactSelectOption[]>([]);

  const getCurrencies = useCallback(async (): Promise<void> => {
    try {
      const response = await GuestAxios.get<ApiResponse>({
        uri: routes.api.guest.common.currency.index.url,
      });

      const currencies = response.data.body.currencies as CurrencyDbType[];
      setCurrencies(prevState => currencies);

      setOptions(prevState => {
        if (!prevState || !currencies) return [];
        return currencies.map((currency): ReactSelectOption => {
          return {
            label: currency.name,
            value: currency.id,
          } as ReactSelectOption;
        });
      });
    } catch (error) {
      GuestAxios.showErrors(error);
    }
  }, []);

  return { currencies, getCurrencies, options, setOptions };
};

export { useIndex };
