import EmployeeAxios from "@/lib/axios/employee-axios";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import { EmployeeDbTableType } from "@/types/db/employee";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useIndex as useHubIndex } from "@/hooks/common/hub/useIndex";
import { useIndex as useJobPositionIndex } from "@/hooks/common/jobPosition/useIndex";
import { HubDbTableType } from "@/types/db/hub";

export type FilterConditionType = {
  hubIds?: number[];
  groupIds?: number[];
  jobPositionIds?: number[];
  name?: string;
  nameKana?: string;
  staffId?: string;
};

type UseEmployeeFilterType = {
  /** 拠点の選択状態の初期値 */
  defaultHubOptions: ReactSelectOption[] | null;
  /** 班の選択状態の初期値 */
  defaultGroupOptions: ReactSelectOption[] | null;
  /** 絞り込み対象のid配列を受け取って絞り込みを行う関数 */
  filterEmployees: (condition: FilterConditionType) => void;
  /** 絞り込まれた結果の従業員リスト */
  filteredEmployees: EmployeeDbTableType[];
  /** 業務種別の「デフォルト」チェック状態を管理している変数 */
  isDefaultJobPositionChecked: boolean;
  /** 業務種別の選択状態 */
  selectJobPosition: ReactSelectOption[] | null;
  /** 業務種別が選択可能なオプション（拠点によって変更される） */
  selectableJobPositions: ReactSelectOption[] | null;
  /** 業務種別の「デフォルト」チェックボックス変更関数 */
  handleCheckJobPositionChange: (checked: boolean) => void;
  /** 業務種別の選択肢変更関数 */
  handleSelectJobPositionChange: (value: ReactSelectOption[] | null) => void;
  /** 選択された業務種別をセットする状態管理関数 */
  setSelectJobPosition: Dispatch<SetStateAction<ReactSelectOption[] | null>>;
  /** 名前での絞り込み */
  filteredName: string;
  /** 名前での絞り込みを行う関数 */
  setFilteredName: Dispatch<SetStateAction<string>>;
  /** 名前（英語）での絞り込み */
  filteredNameKana: string;
  /** 名前（英語）での絞り込みを行う関数 */
  setFilteredNameKana: Dispatch<SetStateAction<string>>;
  /** スタッフIDでの絞り込み */
  filteredStaffId: string;
  /** スタッフIDでの絞り込みを行う関数 */
  setFilteredStaffId: Dispatch<SetStateAction<string>>;
};

/**
 * 従業員データをフィルタリングし、絞り込み条件を管理するカスタムフック
 * @param employees
 * @returns
 */
export const useEmployeesFilter = (employees: EmployeeDbTableType[]): UseEmployeeFilterType => {
  const auth = useRecoilValue(EmployeeState);

  const { hubs, getHubs } = useHubIndex();
  const [ narrowHubs, setNarrowHubs ] = useState<HubDbTableType[]>([]);

  /** 拠点のセレクトボックスに初期値としてセットする変数 */
  const [ defaultHubOptions, setDefaultHubOptions ] = useState<ReactSelectOption[] | null>(null);
  /** 班のセレクトボックスに初期値としてセットする変数 */
  const [ defaultGroupOptions, setDefaultGroupOptions ] = useState<ReactSelectOption[] | null>(null);

  /** 業務種別 */
  const { jobPositions, getJobPositions } = useJobPositionIndex();
  const [ isJobPositionInit, setIsJobPositionInit ] = useState<boolean>(false);
  // 初期値リセット用
  const [ defaultJobPositionOptions, setDefaultJobPositionOptions ] = useState<ReactSelectOption[] | null>(null);
  // 選択中の業務種別
  const [ selectJobPosition, setSelectJobPosition ] = useState<ReactSelectOption[] | null>(null);
  // 選択可能な業務種別（拠点によって変わるために用意）
  const [ selectableJobPositions, setSelectableJobPositions ] = useState<ReactSelectOption[] | null>(null);
  const [ isDefaultJobPositionChecked, setIsDefaultJobPositionChecked ] = useState<boolean>(true);
  /** 業務種別絞り込み用 */
  const [ employeeHubs, setEmployeeHubs ] = useState<EmployeeDbTableType["employeeHubs"]>();
  const [ employeeHubIds, setEmployeeHubIds ] = useState<number[]>([]);

  const [ isInit, setIsInit ] = useState<boolean>(false);

  /** 複数の条件に跨った絞り込みを行うため、引数でもらった従業員マスタから絞り込まれた結果を保持する */
  const [ filteredEmployees, setFilteredEmployees ] = useState<EmployeeDbTableType[]>([]);

  /** 名前での絞り込み */
  const [ filteredName, setFilteredName ] = useState<string>("");
  /** 名前（英語）での絞り込み */
  const [ filteredNameKana, setFilteredNameKana ] = useState<string>("");
  /** スタッフIDでの絞り込み */
  const [ filteredStaffId, setFilteredStaffId ] = useState<string>("");

  /** 初期化処理 */
  useEffect((): void => {
    (async(): Promise<void> => {
      if(!isInit) {
        EmployeeAxios._setToken(auth);
        const employee = await EmployeeAxios.getMe() as EmployeeDbTableType;

        await getHubs();
        await getJobPositions();

        if(employee && employee.currentAccessHub) {
          /** 従業員が所属している拠点のid配列 */
          setEmployeeHubs(prevState => employee.employeeHubs);
          const employeeHasHubIds = employee.employeeHubs.map(hub => hub.hubId);
          setEmployeeHubIds(prevState => employeeHasHubIds);

          /** 従業員が所属している拠点のみ絞り込み */
          const narrowHubs = hubs.filter(hub => employeeHasHubIds.includes(hub.id));
          setNarrowHubs(prevState => narrowHubs);

          /** 従業員が所属しているグループのid配列 */
          const employeeHasGroupIds = employee.employeeHubs.map(hub => hub.groupId);
          /** 従業員が所属しているグループのみ絞り込み */
          const narrowGroups = narrowHubs.map(hub => hub.groups.filter(group => employeeHasGroupIds.includes(group.id))).flat();

          /** セレクトボックスのselectedにセットする拠点の初期値 */
          setDefaultHubOptions(prevState => {
            if(!employee.currentAccessHub ||
              (!employee.currentAccessHub.id && !employee.currentAccessHub.name) ||
              !narrowHubs || narrowHubs.length === 0) {
              return prevState;
            }

            return narrowHubs.map(hub => {
              return {
                value: hub.id,
                label: hub.name,
              };
            });
          });

          /** セレクトボックスのselectedにセットする班の初期値 */
          setDefaultGroupOptions(prevState => {
            if(!narrowGroups || narrowGroups.length === 0) {
              return prevState;
            }

            return narrowGroups.map(group => {
              return {
                value: group.id,
                label: group.name,
              };
            });
          });

          setIsInit(true);
        }
      }
    })();
  },[ isInit, auth, getHubs, getJobPositions, hubs ]);

  /** 業務種別セレクトボックス更新用 */
  useEffect((): void => {
    if(jobPositions.length > 0) {
      setSelectableJobPositions(prevState => {
        return jobPositions.filter(jobPosition => employeeHubIds.includes(jobPosition.hubId)).map(jobPosition => {
          return {
            value: jobPosition.id,
            label: jobPosition.name,
          };
        });
      });
    }
  }, [ jobPositions, employeeHubIds ]);


  /** 業務種別の初期値セット用 */
  useEffect((): void => {
    if(employeeHubs && narrowHubs.length > 0 && !isJobPositionInit && jobPositions.length > 0) {
      setIsJobPositionInit(prevState => true);
      const jobPositionIds = employeeHubs.map(hub => hub.jobPositionId);

      const defaultValues = jobPositions.filter(jobPosition => employeeHubIds.includes(jobPosition.hubId)).
        filter(jobPosition => jobPositionIds.includes(jobPosition.id))
        .map(position => {
          return {
            value: position.id,
            label: position.name,
          };
        });

      setDefaultJobPositionOptions(prevState => {
        return defaultValues;
      });

      setSelectJobPosition(prevState => {
        return defaultValues;
      });
    }
  }, [ narrowHubs, jobPositions, isJobPositionInit, employeeHubs, employeeHubIds ]);


  /**
   * 絞り込みのメイン関数
   */
  const filterEmployees = useCallback((condition: FilterConditionType): void => {
    const filteredEmployees = employees.filter(employee => {
      /** 拠点での絞り込み条件 */
      const matchHub = !condition?.hubIds || condition.hubIds.some(hubId => employee.employeeHubs.some(hub => hub.hubId === hubId));
      /** 班での絞り込み条件 */
      const matchGroup = !condition?.groupIds || condition.groupIds.some(groupId => employee.employeeHubs.some(hub => hub.groupId === groupId));
      /** 業務種別での絞り込み条件 */
      const matchJobPosition = !condition?.jobPositionIds || condition.jobPositionIds.some(jobPositionId => employee.employeeHubs.some(hub => hub.jobPositionId === jobPositionId));
      /** 名前での絞り込み条件 */
      const matchName = !condition?.name || employee.name.includes(condition.name);
      /** 名前（英語）での絞り込み条件 */
      const matchNameKana = !condition?.nameKana || employee.nameKana?.includes(condition.nameKana);
      /** スタッフIDでの絞り込み条件 */
      const matchStaffId = !condition?.staffId || employee.id.toString().includes(condition.staffId);
      return matchHub && matchGroup && matchJobPosition && matchName && matchNameKana && matchStaffId;
    });

    setFilteredEmployees(prevState => filteredEmployees);

    /** 拠点の更新があったら業務種別セレクトボックスの中身も更新する */
    if(condition.hubIds) {
      setEmployeeHubIds(prevState => {
        if(!condition.hubIds) {
          return prevState;
        }
        return condition.hubIds;
      });
    }
  }, [ employees ]);

  /**
   * 業務種別：チェックボックス変更イベント
   */
  const handleCheckJobPositionChange = useCallback((checked: boolean): void => {
    setIsDefaultJobPositionChecked(prevState => checked);

    if(checked === true && defaultJobPositionOptions) {
      setSelectJobPosition(prevState => defaultJobPositionOptions);
    }
    filterEmployees({ jobPositionIds: defaultJobPositionOptions?.map(v => v.value as number) });
  }, [ defaultJobPositionOptions, filterEmployees ]);

  /**
   * 業務種別：セレクトボックス変更イベント
   */
  const handleSelectJobPositionChange = useCallback((value: ReactSelectOption[] | null): void => {
    setIsDefaultJobPositionChecked(prevState => false);

    if(value?.length === 0) {
      /** 選択している業務種別(value)がなくなったら拠点でのみ絞り込む */
      filterEmployees({ hubIds: employeeHubIds });
    } else {
      /** そうでなければ拠点と業務種別で絞り込む */
      filterEmployees({ hubIds: employeeHubIds, jobPositionIds: value?.map(v => v.value as number) });
    }

    setSelectJobPosition(prevState => {
      return value || [];
    });
  }, [ employeeHubIds, filterEmployees ]);

  return {
    defaultHubOptions,
    defaultGroupOptions,
    filterEmployees,
    filteredEmployees,
    isDefaultJobPositionChecked,
    selectJobPosition,
    selectableJobPositions,
    handleCheckJobPositionChange,
    handleSelectJobPositionChange,
    setSelectJobPosition,
    filteredName,
    setFilteredName,
    filteredNameKana,
    setFilteredNameKana,
    filteredStaffId,
    setFilteredStaffId,
  };
};
