import { useCallback, useEffect, useState } from "react";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { toast } from "react-toastify";
import { SearchGroupPropsType } from "@/types/components/molecules/search/employee/employees/searchGroup";

type UseReceiveSearchType = {
  /** 拠点の「デフォルト」チェック状態を管理している変数 */
  isDefaultHubChecked: boolean;
  /** 拠点の選択状態 */
  selectHubsOptions: ReactSelectOption[];
  /** 拠点の「デフォルト」チェックボックス変更関数 */
  handleCheckHubsChange: (checked: boolean) => void;
  /** 拠点の選択状態変更関数 */
  handleSelectHubsChange: (value: ReactSelectOption[] | null) => void;
};

/**
 * 拠点と班の選択状態を管理し、選択に応じてフィルタリングを行うカスタムフック
 * @param hubs
 * @param groups
 * @param filterFunction
 */
export const useReceiveStockSearch = ({
  hubs
}: Omit<SearchGroupPropsType, "employees">): UseReceiveSearchType => {
  /** 拠点関連 */
  const [ isDefaultHubChecked, setIsDefaultHubChecked ] = useState<boolean>(true);
  const [ selectHubsOptions, setSelectHubsOptions ] = useState<ReactSelectOption[]>([]);
  /** 拠点によって選択できる班が変わるために用意 */
  const [ selectableGroupOptions, setSelectableGroupOptions ] = useState<ReactSelectOption[]>([]);

  const { changeCheckFunction: handleCheckJobPositionChange, setSelectJobPosition } = jobPositions;

  useEffect(():void => {
    /** 初期設定：拠点 */
    if(hubs.defaultOption && hubs.defaultOption.length > 0) {
      setSelectHubsOptions(prevState => {
        return hubs.defaultOption || [];
      });

      /** 拠点の内容に伴って選択できる班をセット */
      // const selectableGroups = hubs.allHubs
      //   .filter(allHub => hubs.defaultOption?.map(hubOption => {
      //     if(typeof hubOption.value === "number") {
      //       return hubOption.value;
      //     }
      //   }).includes(allHub.id)).flatMap(hub => hub.groups);

      // setSelectableGroupOptions(prevState => selectableGroups.map(group => ({ value: group.id, label: group.name })) || []);
    }

    /** 初期設定：班 */
    // if(groups.defaultOption) {
    //   setSelectGroupOptions(prevState => {
    //     return groups.defaultOption || [];
    //   });
    // }
  }, [ hubs.defaultOption, hubs.allHubs ]);

  /**
   * 拠点：デフォルトチェックボックス変更イベント
   */
  const handleCheckHubsChange = useCallback((checked: boolean): void => {
    setIsDefaultHubChecked(prevState => checked);

    if(checked === true && hubs.defaultOption) {
      /** チェックボックスtrueになったら初期値に戻す */
      setSelectHubsOptions(prevState => {
        return hubs.defaultOption || [];
      });

      const result = hubs.defaultOption.reduce<number[]>((acc, cur) => {
        if(typeof cur.value === "number") {
          acc.push(cur.value);
        }
        return acc;
      }, []);

      filterFunction({ hubIds: result });

      handleCheckGroupChange(true);
      handleCheckJobPositionChange(true);
    }
  }, [ hubs.defaultOption, filterFunction, handleCheckGroupChange, handleCheckJobPositionChange ]);


  /**
   * 拠点：セレクトボックス変更イベント
   */
  const handleSelectHubsChange = useCallback((value: ReactSelectOption[] | null): void => {
    setIsDefaultHubChecked(prevState => false);

    /** 班の選択状態をリセット */
    setIsDefaultGroupChecked(prevState => false);
    setSelectGroupOptions(prevState => []);

    /** 業務種別の選択状態をリセット */
    handleCheckJobPositionChange(false);
    setSelectJobPosition(prevState => []);

    setSelectHubsOptions(prevState => {
      return value || [];
    });

    filterFunction({ hubIds: value?.map(v => v.value as number) });

    /** 拠点の変更に合わせて選択できる班をセットし直す */
    const hubIds = value?.map(v => v.value as number) || [];
    const narrowHubs = hubs.allHubs.filter(hub => hubIds.includes(hub.id));
    const groupsByNarrowHub = narrowHubs.map(hub => hub.groups).flat();

    setSelectableGroupOptions(prevState => {
      return groupsByNarrowHub.map(group => ({ value: group.id, label: group.name })) || [];
    });

  }, [ filterFunction, hubs.allHubs, handleCheckJobPositionChange, setSelectJobPosition ]);


  /**
   * 名前入力イベント
   */
  const handleChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    name.setFilteredName(prevState => e.target.value);

    filterFunction({ name: e.target.value });
  }, [ name, filterFunction ]);


  /**
   * 名前（英語）入力イベント
   */
  const handleChangeNameKana = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    nameKana.setFilteredNameKana(prevState => e.target.value);

    filterFunction({ nameKana: e.target.value });
  }, [ nameKana, filterFunction ]);


  /**
   * スタッフID入力イベント
   */
  const handleChangeStaffId = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    staffId.setFilteredStaffId(prevState => e.target.value);

    filterFunction({ staffId: e.target.value });
  }, [ staffId, filterFunction ]);

  return {
    isDefaultHubChecked,
    selectHubsOptions,
    isDefaultGroupChecked,
    selectGroupOptions,
    selectableGroupOptions,
    handleCheckHubsChange,
    handleSelectHubsChange,
    handleCheckGroupChange,
    handleSelectGroupsChange,
    handleChangeName,
    handleChangeNameKana,
    handleChangeStaffId,
  };
};
