import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { useCallback, useEffect, useState } from "react";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { EmployeeAccountDbTableType } from "@/types/db/bankAccounts/EmployeeAccountDbTableType";
import { SubjectDbTableType } from "@/types/db/bankAccounts/SubjectDbTableType";
import { SupplierDbTableType } from "@/types/db/bankAccounts/SupplierDbTableType";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import { useRecoilValue } from "recoil";
import { EmployeeDbTableType } from "@/types/db/employee";
import { currentAccessHubType } from "@/components/templates/employee/(authenticated)/bankAccounts/template";
import { useIndex as useEmployeeAccountIndex } from "@/hooks/employee/bankAccounts/employeeAccount/useIndex";
import { useIndex as useSubjects } from "@/hooks/employee/bankAccounts/subject/useIndex";
import { useIndex as useProfits } from "@/hooks/employee/bankAccounts/profit/useIndex";
import { useIndex as useSupplierIndex } from "@/hooks/employee/bankAccounts/supplier/useIndex";


export type FilteredListType = EmployeeAccountDbTableType[] | SubjectDbTableType[] | SupplierDbTableType[];


export const useBankAccounts = (): {
  currentAccessHub: currentAccessHubType;
  defaultOption: ReactSelectOption | null;
  filterListByHubId: (selectedOptions: ReactSelectOption[] | null) => void;
  filteredEmployeeAccounts: EmployeeAccountDbTableType[];
  filteredSubjects: SubjectDbTableType[];
  filteredProfits: SubjectDbTableType[];
  filteredSuppliers: SupplierDbTableType[];
  getEmployeeAccounts: () => Promise<void>;
  getSubjects: () => Promise<void>;
  getProfits: () => Promise<void>;
  getSuppliers: () => Promise<void>;
} => {
  const auth = useRecoilValue(EmployeeState);
  const [ authEmployee, setAuthEmployee ] = useState<EmployeeDbTableType | null>(null);

  const [ currentAccessHub, setCurrentAccessHub ] = useState<currentAccessHubType>({ id: null, name: "" });
  const [ defaultOption, setDefaultOption ] = useState<ReactSelectOption | null>(null);
  const [ isInit, setIsInit ] = useState<boolean>(false);

  const [ filteredEmployeeAccounts, setFilteredEmployeeAccounts ] = useState<EmployeeAccountDbTableType[]>([]);
  const [ filteredSubjects, setFilteredSubjects ] = useState<SubjectDbTableType[]>([]);
  const [ filteredProfits, setFilteredProfits ] = useState<SubjectDbTableType[]>([]);
  const [ filteredSuppliers, setFilteredSuppliers ] = useState<SupplierDbTableType[]>([]);

  const { employeeAccounts, getEmployeeAccounts } = useEmployeeAccountIndex();
  const { subjects, getSubjects } = useSubjects();
  const { profits, getProfits } = useProfits();
  const { suppliers, getSuppliers } = useSupplierIndex();

  /**
   * selectedOptionsのvalueの値が、employeeAccounts, subjects, profits, suppliers のhub_idと一致するものだけを返す
   */
  const filterListByHubId = useCallback((selectedOptions: ReactSelectOption[] | null): void => {
    if(selectedOptions === null) {
      return;
    }

    const selectedHubIds = selectedOptions.map(option => option.value);
    const _filteredEmployeeAccounts = employeeAccounts.filter(account => selectedHubIds.includes(account.hub_id));
    const _filteredSubjects = subjects.filter(subject => selectedHubIds.includes(subject.hub_id));
    const _filteredProfits = profits.filter(profit => selectedHubIds.includes(profit.hub_id));
    const _filteredSuppliers = suppliers.filter(supplier => selectedHubIds.includes(supplier.hub_id));

    setFilteredEmployeeAccounts(prevState => _filteredEmployeeAccounts);
    setFilteredSubjects(prevState => _filteredSubjects);
    setFilteredProfits(prevState => _filteredProfits);
    setFilteredSuppliers(prevState => _filteredSuppliers);
  }, [ employeeAccounts, subjects, profits, suppliers ]);

  useEffect((): void => {
    (async(): Promise<void> => {
      if(!isInit) {
        EmployeeAxios._setToken(auth);
        const employee = await EmployeeAxios.getMe() as EmployeeDbTableType;

        if(employee && employee.currentAccessHub) {
          setAuthEmployee(prevState => employee);

          setCurrentAccessHub(prevState => {
            if(!employee.currentAccessHub ||
              (!employee.currentAccessHub.id && !employee.currentAccessHub.name)) {
              return prevState;
            }
            return {
              id: employee.currentAccessHub.id,
              name: employee.currentAccessHub.name,
            };
          });

          setDefaultOption(prevState => {
            if(!employee.currentAccessHub ||
              (!employee.currentAccessHub.id && !employee.currentAccessHub.name)) {
              return prevState;
            }
            return {
              value: employee.currentAccessHub.id,
              label: employee.currentAccessHub.name,
            };
          });

          setIsInit(true);
        }
      }
    })();
  }, [
    setAuthEmployee, authEmployee, isInit, setIsInit, auth,
    setCurrentAccessHub, setDefaultOption,
  ]);

  useEffect((): void => {
    if(defaultOption) {
      filterListByHubId([ defaultOption ]);
    }
  }, [ defaultOption, filterListByHubId ]);

  return {
    currentAccessHub,
    defaultOption,
    filterListByHubId,
    filteredEmployeeAccounts,
    filteredSubjects,
    filteredProfits,
    filteredSuppliers,
    getEmployeeAccounts,
    getSubjects,
    getProfits,
    getSuppliers,
  };
};
