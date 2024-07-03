"use client";

interface ApiResponse {
  body: {
    countries: CountryDbTableType[];
  };
}

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { CountryDbTableType } from "@/types/db/country";
import GuestAxios from "@/lib/axios/guest-axios";
import { routes } from "@/routes";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

const useIndex = (): {
  countries: CountryDbTableType[];
  getCountries: () => Promise<void>;
  options: ReactSelectOption[];
  setOptions: Dispatch<SetStateAction<ReactSelectOption[]>>;
} => {
  const [ countries, setCountries ] = useState<CountryDbTableType[]>([]);
  const [ options, setOptions ] = useState<ReactSelectOption[]>([]);

  const getCountries = useCallback(async (): Promise<void> => {
    try {
      const response = await GuestAxios.get<ApiResponse>({
        uri: routes.api.guest.common.country.index.url,
      });

      const countries = response.data.body.countries as CountryDbTableType[];
      setCountries(prevState => countries);

      setOptions(prevState => {
        if (!prevState || !countries) return [];
        return countries.map((country): ReactSelectOption => {
          return {
            label: country.name,
            value: country.id,
          } as ReactSelectOption;
        });
      });
    } catch (error) {
      GuestAxios.showErrors(error);
    }
  }, []);

  return { countries, getCountries, options, setOptions };
};

export { useIndex };
