"use client";

import { ReactElement, useEffect, useId, useState } from "react";
import ModalClickableButton from "@/components/atoms/button/modalClickableButton";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import { useIndex as useHubIndex } from "@/hooks/common/hub/useIndex";
import { useIndex as useJobPositionIndex } from "@/hooks/common/jobPosition/useIndex";
import EmployeeHubSelect from "@/components/molecules/form/select/employeeHubSelect";
import { PostForDetailType } from "@/components/molecules/modalGroup/employee/employees/employeeCreateModal";

/** 識別用index */
type DetailIndex = { index: number; };

export type PostForDetailWithIndexType = PostForDetailType & DetailIndex;

const HubSelectGroup = ({
  changeFunction,
  details,
}: {
  changeFunction: (detail: PostForDetailType, index: number) => void;
  details: PostForDetailType[] | undefined;
}): ReactElement => {
  const { hubs, getHubs, options: hubOptions } = useHubIndex();
  const { jobPositions, getJobPositions } = useJobPositionIndex();

  /** 一つ一つのPostForDetailを保持するstate。handleAddInputするタイミングでリセットする */
  const [ postForDetail, setPostForDetail ] = useState<PostForDetailWithIndexType>();

  /** 入力枠の管理用state */
  const [ detailsLength, setDetailsLength ] = useState<number>(details ? details.length : 1);
  const [ isInit, setIsInit ] = useState<boolean>(false);

  useEffect((): void => {
    if (!isInit && details) {
      setDetailsLength(details.length);
      setIsInit(true);
    }
  }, [ isInit, details ]);

  useEffect((): void => {
    if(!postForDetail) {
      return;
    }

    if (postForDetail.group_id === undefined) {
      delete postForDetail.group_id;
    }

    const { index, ...detailWithoutIndex } = postForDetail;
    changeFunction(detailWithoutIndex, index);
  }, [ postForDetail, changeFunction ]);

  useEffect((): void => {
    getHubs();
    getJobPositions();
  }, [ getHubs, getJobPositions ]);

  /** 班追加イベント */
  const handleAddInput = () => {
    setDetailsLength(prevState => prevState + 1);
  };

  const keyId = useId();

  return (
    <>
      {Array.from({ length: detailsLength }, (_, index) => {
        const detail = details ? details[index] : undefined;
        return (
          <EmployeeHubSelect
            key={`${keyId}-${index}`}
            hubs={hubs}
            index={index}
            setPostForDetail={setPostForDetail}
            hubOptions={hubOptions}
            jobPositions={jobPositions}
            getJobPositions={getJobPositions}
            hubId={detail?.hub_id}
            groupId={detail?.group_id}
            jobPositionId={detail?.job_position_id}
            employeeStatus={detail?.employee_status}
          />
        );
      })}
      <ContentAreaWrapper>
        <ModalClickableButton color="blue" text="追加" onClick={() => handleAddInput()} />
      </ContentAreaWrapper>
    </>
  );
};

export default HubSelectGroup;
