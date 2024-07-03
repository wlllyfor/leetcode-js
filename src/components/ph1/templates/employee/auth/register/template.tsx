"use client";

import Link from "next/link";
import { ChangeEvent, ReactElement, useEffect } from "react";
import WhiteBoxWrapper from "@/components/atoms/div/wrapper/whiteBoxWrapper";
import H2 from "@/components/atoms/h2";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import SelectAndLabel from "@/components/molecules/selectAndLabel";
import FileUploadAndLabel from "@/components/molecules/fileUploadAndLabel";
import FormButton from "@/components/atoms/button/formButton";
import Paragraph from "@/components/atoms/paragraph";
import commonClasses from "@/styles/common/page.module.scss";
import { defaultReactSelectOption, ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { routes } from "@/routes";
import { useResetRecoilState } from "recoil";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import { useRouter } from "next/navigation";
import { EmployeeForRegisterType, useRegister } from "@/hooks/employee/auth/useRegister";
import Error422 from "@/components/molecules/errors/error422";
import { useIndex as useHubIndex } from "@/hooks/common/hub/useIndex";
import { useIndex as useGroupIndex } from "@/hooks/common/group/useIndex";
import { useIndex as useJobPositionIndex } from "@/hooks/common/jobPosition/useIndex";
import { Integer } from "@/lib/integer";

const Template = (): ReactElement => {
  const resetRecoilState = useResetRecoilState(EmployeeState);

  const router = useRouter();

  // custom hooks
  const {
    register,
    employeeForRegister,
    setEmployeeForRegister,
    isRegistered,
    setIsRegistered,
    validationErrors,
    setValidationErrors,
  } = useRegister();

  const { getHubs, options: hubOptions } = useHubIndex();

  const {
    getGroups,
    options: GroupOptions,
    condition: groupIndexCondition,
    setCondition: setGroupIndexCondition,
  } = useGroupIndex();

  const { getJobPositions, jobPositionOptions } = useJobPositionIndex();

  // useStates

  // useEffects

  /**
   * 初期化
   */
  useEffect((): void => {
    setIsRegistered(prevState => false);
    setValidationErrors(prevState => []);
    setEmployeeForRegister(prevState => {
      return {
        name: "",
        email: "",
        password: "",
        profileImageFile: null,
        groupId: null,
        options: {
          hub: defaultReactSelectOption,
          jobPosition: defaultReactSelectOption,
          group: defaultReactSelectOption,
        },
      } as EmployeeForRegisterType;
    });

    (async (): Promise<void> => {
      setGroupIndexCondition(prevState => {
        return {
          hubIdList: null,
        };
      });
      await getHubs();
      await getJobPositions();
    })();
  }, [ setIsRegistered, setValidationErrors, setEmployeeForRegister, getHubs, getJobPositions, setGroupIndexCondition ]);

  // useEffects

  /**
   * 登録後はログインページに遷移
   */
  useEffect((): void => {
    if (isRegistered) {
      router.push(routes.front.employee.auth.login.url);
    }
  }, [ isRegistered, router ]);

  /**
   * 班の検索条件変更監視
   */
  useEffect((): void => {
    (async (): Promise<void> => {
      await getGroups();
    })();
  }, [ groupIndexCondition, getGroups ]);

  /**
   * 班の検索条件変更監視
   */
  useEffect((): void => {
    (async (): Promise<void> => {
      setGroupIndexCondition(prevState => {
        if (!prevState) return prevState;

        if (employeeForRegister) {
          return {
            ...prevState,
            hubIdList: [ employeeForRegister.hubId || 0 ],
          };
        }
        return prevState;
      });
    })();
  }, [ employeeForRegister, employeeForRegister?.hubId, setGroupIndexCondition ]);

  // handles

  /**
   * 名前変更イベント
   * @param e
   */
  const handleOnChangeName = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setEmployeeForRegister(prevState => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        name: e.target.value,
      };
    });
  };

  /**
   * メールアドレス変更イベント
   * @param e
   */
  const handleOnChangeEmail = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setEmployeeForRegister(prevState => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        email: e.target.value,
      };
    });
  };

  /**
   * パスワード変更イベント
   * @param e
   */
  const handleOnChangePassword = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setEmployeeForRegister(prevState => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        password: e.target.value,
      };
    });
  };

  /**
   * 拠点変更イベント
   * @param e
   */
  const handleOnChangeHub = async (e: ReactSelectOption): Promise<void> => {
    setEmployeeForRegister(prevState => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        hubId: Integer.parseIntExceptZero(e.value),
        options: {
          hub: e,
          group: prevState.options.group,
          jobPosition: prevState?.options.jobPosition,
        },
      };
    });
  };

  /**
   * プロフィール写真変更イベント
   * @param e
   */
  const handleOnChangeProfileImage = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const selectedFile = e.target.files?.[0] ?? null;
    setEmployeeForRegister(prevState => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        profileImageFile: selectedFile,
      };
    });
  };

  /**
   * 職業種別変更イベント
   * @param e
   */
  const handleOnChangeJobPosition = async (e: ReactSelectOption): Promise<void> => {
    setEmployeeForRegister(prevState => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        jobPositionId: Integer.parseIntExceptZero(e.value),
        options: {
          hub: prevState.options.hub,
          group: prevState?.options.group,
          jobPosition: e,
        },
      };
    });
  };

  /**
   * 班変更イベント
   * @param e
   */
  const handleOnChangeGroup = async (e: ReactSelectOption): Promise<void> => {
    setEmployeeForRegister(prevState => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        groupId: Integer.parseIntExceptZero(e.value),
        options: {
          hub: prevState.options.hub,
          group: e,
          jobPosition: prevState?.options.jobPosition,
        },
      };
    });
  };

  const handleOnClickRegisterButton = async (): Promise<void> => {
    resetRecoilState();
    await register();
  };

  return (
    <>
      <div className={commonClasses.content__wrapper}>
        <WhiteBoxWrapper>
          <H2>新規スタッフ登録</H2>
          <Error422 errors={validationErrors} />
          <InputAndLabel
            id={"name"}
            text={"名前"}
            value={employeeForRegister?.name || ""}
            isRequired
            changeFunction={handleOnChangeName}
          />
          <InputAndLabel
            id={"email"}
            text={"メールアドレス"}
            value={employeeForRegister?.email || ""}
            isRequired
            changeFunction={handleOnChangeEmail}
          />
          <InputAndLabel
            id={"password"}
            inputType={"password"}
            text={"パスワード"}
            isRequired
            value={employeeForRegister?.password || ""}
            changeFunction={handleOnChangePassword}
          />
          <SelectAndLabel
            id={"hub"}
            options={hubOptions}
            text={"拠点"}
            isRequired
            value={employeeForRegister?.options.hub}
            changeFunction={handleOnChangeHub}
          />
          <FileUploadAndLabel
            id={"profileImage"}
            labelText={"プロフィール写真"}
            buttonText={"画像アップロード"}
            isRequired
            changeFunction={handleOnChangeProfileImage}
          />
          <SelectAndLabel
            id={"jobPosition"}
            options={jobPositionOptions}
            text={"業務種別"}
            isRequired
            value={employeeForRegister?.options.jobPosition}
            changeFunction={handleOnChangeJobPosition}
          />
          <SelectAndLabel
            id={"group"}
            options={GroupOptions}
            text={"班"}
            value={employeeForRegister?.options.group}
            changeFunction={handleOnChangeGroup}
          />

          <div className={commonClasses.mt_24}>
            <FormButton text={"会員登録"} color={"green"} onClick={handleOnClickRegisterButton} />
          </div>
          <div className={commonClasses.pt_2em}>
            <Paragraph isLink isCenter isMarginTop>
              <Link href={routes.front.employee.auth.login.url}>ログイン</Link>
            </Paragraph>
          </div>
        </WhiteBoxWrapper>
      </div>
    </>
  );
};

export default Template;
