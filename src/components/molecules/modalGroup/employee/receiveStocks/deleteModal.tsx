"use client";

import { ReactElement } from "react";
import FormButton from "@/components/atoms/button/formButton";
import ModalSm from "@/components/atoms/modal/modalSm";
import ModalTitle from "@/components/atoms/modal/modalTitle";
import ModalCloseButton from "@/components/atoms/modal/modalCloseButton";
import { ModalGroupType } from "@/types/components/molecules/modalGroup/ModalGroupType";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import TextOnlyButton from "@/components/atoms/button/textOnlyButton";
import Paragraph from "@/components/atoms/text/paragraph";

const DeleteModal = ({ isOpen, handleClose }: ModalGroupType): ReactElement => {
  // const inputId = useId();
  // const { getCountries, options: countries } = useCountriesIndex();
  // const { getCurrencies, options: currencies } = useCurrenciesIndex();
  // const { handleUpdateHub, setHubForUpdate, isLoading, validationErrors } = useHubUpdate();

  // useEffect(() => {
  //   getCountries();
  //   getCurrencies();
  // }, [ getCountries, getCurrencies ]);

  // const convertGroup = (groups: GroupDbTypeType[]): ItemType[] => {
  //   if (groups.length === 0) return [];
  //   return groups.map(group => ({ id: group.id.toString(), name: group.name }));
  // };

  /**
   * 更新完了時にモーダルを閉じてテーブルのデータを再取得する
   * @param e : MouseEvent<HTMLButtonElement>
   */
  // const handleCloseFunction = (e: MouseEvent<HTMLButtonElement>) => {
  //   setTimeout(() => {
  //     handleClose(e);
  //     if (reloadFunction) {
  //       reloadFunction();
  //     }
  //   }, 2_500);
  // };

  return (
    <ModalSm isOpen={isOpen} onRequestClose={handleClose}>
      <ModalTitle text={"入荷依頼削除"} />
      <div className="my-4">
        <Paragraph fontSize="13px">
        入荷依頼から削除します。問題ないか確認のうえ、削除する場合は以下のボタンを押してください。
        </Paragraph>
      </div>
      <ContentAreaWrapper>
        <FormButton
          color={"red"}
          text={"削除する"}
          // onClick={(e: MouseEvent<HTMLButtonElement>) => {
          //   handleUpdateHub({ id: prevHub.id, closeFunction: () => handleCloseFunction(e) });
          // }}
          // disabled={isLoading || prevHub.id === null}
        />
      </ContentAreaWrapper>
      <ModalCloseButton handleClose={handleClose} />
      <div className="text-center">
        <TextOnlyButton text={"入荷依頼管理へ戻る"} hasUnderLine clickFunction={handleClose} />
      </div>
    </ModalSm>
  );
};

export default DeleteModal;
