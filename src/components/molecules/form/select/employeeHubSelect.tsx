"use client";

import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import ContentGroupWrapper from "@/components/atoms/div/wrapper/contentGroupWrapper";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import { Dispatch, ReactElement, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import SelectGroup28 from "@/components/molecules/form/select/selectGroup28";
import SelectGroup80 from "@/components/molecules/form/select/selectGroup80";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { HubDbTableType } from "@/types/db/hub";
import { JobPositionDbTableType } from "@/types/db/jobPosition";
import { PostForDetailWithIndexType } from "@/components/molecules/form/select/hubSelectGroup";
import { EmployeeStatusType } from "@/components/molecules/tableGroup/employee/employees/tableRowItem";

const EmployeeHubSelect = ({
  setPostForDetail,
  hubs,
  hubOptions,
  jobPositions,
  getJobPositions,
  index,
  hubId,
  groupId,
  jobPositionId,
  employeeStatus,
}: {
  setPostForDetail:  Dispatch<SetStateAction<PostForDetailWithIndexType | undefined>>;
  hubs: HubDbTableType[];
  hubOptions: ReactSelectOption[];
  jobPositions: JobPositionDbTableType[];
  getJobPositions: () => Promise<void>;
  index: number;
  hubId?: number;
  groupId?: number;
  jobPositionId?: number;
  employeeStatus?: EmployeeStatusType;
}): ReactElement => {
  const [ isInit, setIsInit ] = useState<boolean>(false);
  const [ groupOptions, setGroupOptions ] = useState<ReactSelectOption[] | []>([]);
  const [ jobPositionOptions, setJobPositionOptions ] = useState<ReactSelectOption[] | []>([]);

  const [ selectedHub, setSelectedHub ] = useState<ReactSelectOption | null>(null);
  const [ selectedGroup, setSelectedGroup ] = useState<ReactSelectOption | null>(null);
  const [ selectedJobPosition ,setSelectedJobPosition ] = useState<ReactSelectOption | null>(null);
  const [ selectedEmployeeStatus, setSelectedEmployeeStatus ] = useState<ReactSelectOption | null>(null);

  /** ステータスの選択肢 */
  const employeeStatusOption: ReactSelectOption[] = useMemo(() => {
    return [
      { value: "enrollment", label: "在籍" },
      { value: "retirement", label: "退職" },
      { value: "suspension", label: "休職" },
    ];
  }, []);

  /**
   * 拠点を更新したら班のoptionも更新する
   * @param hubId number
   */
  const updateGroupOptions = useCallback((hubId: number): void => {
    // セレクトボックスのoptionを初期化
    setGroupOptions(prevState => []);

    const selectedHub = hubs.find(hub => hub.id === hubId);
    if(selectedHub) {
      setGroupOptions(prevState => {
        return selectedHub.groups.map(group => ({ value: group.id, label: group.name }));
      });
    }
  }, [ hubs, setGroupOptions ]);

  /**
   * 拠点を更新したら業務種別のoptionも更新する
   * @param hubId number
   */
  const updateJobPositionOptions = useCallback((hubId: number): void => {
    // セレクトボックスのoptionを初期化
    setJobPositionOptions(prevState => []);

    const selectedHub = hubs.find(hub => hub.id === hubId);
    if(selectedHub) {
      getJobPositions();
      setJobPositionOptions(prevState => {
        return jobPositions
          .filter(jobPosition => jobPosition.hubId === selectedHub.id)
          .map(jobPosition => ({ value: jobPosition.id, label: jobPosition.name }));
      });
    }
  }, [ hubs, jobPositions, getJobPositions ]);

  /**
   * 拠点変更イベント
   * @param option ReactSelectOption
   */
  const handleOnChangeHub = useCallback((option: ReactSelectOption): void => {
    if(option) {
      // 拠点のoptionを更新
      setSelectedHub(prevState => option);

      // 選択状態を初期化
      setSelectedGroup(prevState => null);
      setSelectedJobPosition(prevState => null);
      setSelectedEmployeeStatus(prevState => null);

      const hubIdByOption = option.value;

      if(hubIdByOption === null || typeof hubIdByOption !== "number") return;
      setPostForDetail(prevState => undefined);

      // 班と業務種別のoptionを初期化
      setPostForDetail(prevState => {
        return {
          hub_id: hubIdByOption,
          job_position_id: undefined,
          employee_status: undefined,
          index: index,
        };
      });

      // 班のoptionを更新
      updateGroupOptions(hubIdByOption);
      // 業務種別のoptionを更新
      updateJobPositionOptions(hubIdByOption);
    }
  }, [ index, setPostForDetail, updateGroupOptions, updateJobPositionOptions ]);

  /**
   * 班(group_id)変更イベント
   * @param option ReactSelectOption
   */
  const handleChangeGroup = useCallback((option: ReactSelectOption): void => {
    if(option) {
      setSelectedGroup(prevState => option);

      setPostForDetail(prevState => {
        return {
          hub_id: prevState?.hub_id as number,
          group_id: option.value as number,
          job_position_id: prevState?.job_position_id ?? undefined,
          employee_status: prevState?.employee_status ?? undefined,
          index: index,
        };
      });
    }
  }, [ setPostForDetail, index ]);

  /**
   * 業務種別(job_position_id)変更イベント
   * @param option ReactSelectOption
   */
  const handleChangeJobPosition = useCallback((option: ReactSelectOption): void => {
    if(option) {
      setSelectedJobPosition(prevState => option);

      setPostForDetail(prevState => {
        return {
          hub_id: prevState?.hub_id as number,
          group_id: prevState?.group_id  ?? undefined,
          job_position_id: option.value as number,
          employee_status: prevState?.employee_status ?? undefined,
          index: index,
        };
      });
    }
  }, [ setPostForDetail, index ]);

  /**
   * ステータス変更イベント
   * @param option ReactSelectOption
   */
  const handleChangeEmployeeStatus = useCallback((option: ReactSelectOption): void => {
    if(option) {
      setSelectedEmployeeStatus(prevState => option);

      setPostForDetail(prevState => {
        return {
          hub_id: prevState?.hub_id as number,
          group_id: prevState?.group_id ?? undefined,
          job_position_id: prevState?.job_position_id as number ?? undefined,
          employee_status: option.value as EmployeeStatusType,
          index: index,
        };
      });
    }
  }, [ setPostForDetail, index ]);

  /**
   * 拠点の初期値があったらセットする
   * @param selectedHub HubDbTableType
   * @param selectedHubId number
   */
  const initHub = useCallback((selectedHub: HubDbTableType | undefined, selectedHubId: number): void => {
    if(typeof selectedHubId !== "number" && !selectedHubId || !selectedHub) return;
    handleOnChangeHub({ value: selectedHubId, label: selectedHub?.name });
  }, [ handleOnChangeHub ]);

  /**
   * 班の初期値があったらセットする
   * @param selectedHub HubDbTableType
   * @param selectedHubId number
   */
  const initHubGroup = useCallback((selectedHub: HubDbTableType | undefined, selectedHubId: number): void => {
    if(!selectedHub || typeof selectedHubId !== "number" && !selectedHubId) return;
    const selectedHubGroup = selectedHub?.groups.find(group => group.id === groupId);
    updateGroupOptions(selectedHubId);

    if(selectedHubGroup && groupId) {
      handleChangeGroup({ value: groupId, label: selectedHubGroup?.name });
    }
  }, [ groupId, handleChangeGroup, updateGroupOptions ]);

  /**
   * 業務種別の初期値があったらセットする
   * @param selectedHubId number
   * @param jobPositionId number
   */
  const initHubJobPosition = useCallback((selectedHubId: number, jobPositionId: number): void => {
    const selectedJobPosition = jobPositions.find(jobPosition => jobPosition.id === jobPositionId);
    updateJobPositionOptions(selectedHubId);

    if(selectedJobPosition) {
      handleChangeJobPosition({ value: jobPositionId, label: selectedJobPosition.name });
    }
  }, [ handleChangeJobPosition, updateJobPositionOptions, jobPositions ]);

  /**
   * ステータスの初期値があったらセットする
   */
  const initEmployeeStatus = useCallback((): void => {
    const selectedEmployeeStatus = employeeStatusOption.find(status => status.value === employeeStatus);

    if(selectedEmployeeStatus) {
      handleChangeEmployeeStatus(selectedEmployeeStatus);
    }
  }, [ employeeStatusOption, employeeStatus, handleChangeEmployeeStatus ]);


  /**
   * 更新用の初期化
   */
  const initialize = useCallback((): void => {
    setIsInit(true);
    const selectedHubOptions = hubOptions.find(option => option.value === hubId);

    if(selectedHubOptions &&
      typeof hubId === "number" && hubId &&
      typeof jobPositionId === "number" && jobPositionId) {
      /** 拠点のセット */
      setSelectedHub(selectedHubOptions);

      const selectedHubId = selectedHubOptions.value as number;
      const selectedHub = hubs.find(hub => hub.id === selectedHubId);

      /** 拠点のセット */
      initHub(selectedHub, selectedHubId);

      /** 班のセット */
      initHubGroup(selectedHub, selectedHubId);

      /** 業務種別のセット */
      initHubJobPosition(selectedHubId, jobPositionId);

      /** ステータスのセット */
      initEmployeeStatus();
    }
  }, [
    hubOptions, hubId, jobPositionId, hubs,
    initHub, initHubGroup, initHubJobPosition, initEmployeeStatus,
  ]);


  /**
   * 初期値のセット
   */
  useEffect((): void => {
    if(!isInit && hubOptions.length > 0 && jobPositions.length > 0) {
      initialize();
    }
  }, [ isInit, hubOptions, jobPositions, initialize ]);


  return (
    <ContentGroupWrapper>
      <ContentAreaWrapper>
        <FlexWrapper>
          <SelectGroup28
            text="拠点"
            options={hubOptions}
            isRequired
            changeFunction={handleOnChangeHub}
            value={selectedHub}
          />
          <SelectGroup28
            text="班"
            options={groupOptions}
            changeFunction={handleChangeGroup}
            value={selectedGroup}
          />
          <SelectGroup28
            text="業務種別"
            isRequired
            options={jobPositionOptions}
            changeFunction={handleChangeJobPosition}
            value={selectedJobPosition}
          />
        </FlexWrapper>
      </ContentAreaWrapper>
      <SelectGroup80
        text="ステータス"
        isRequired
        options={employeeStatusOption}
        changeFunction={handleChangeEmployeeStatus}
        value={selectedEmployeeStatus}
      />
    </ContentGroupWrapper>
  );
};

export default EmployeeHubSelect;
