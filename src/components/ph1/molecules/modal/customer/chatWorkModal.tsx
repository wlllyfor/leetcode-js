"use client";

import H2 from "@/components/atoms/h2";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import { ChangeEvent, ReactElement } from "react";
import Link from "next/link";
import { EduITModal } from "@/components/molecules/eduITModal";
import { useUpdateChatWork } from "@/hooks/customer/useUpdateChatWork";

const ChatWorkModal = ({ handleOnSend }: { handleOnSend: () => void; }): ReactElement => {
  const {
    chatWorkId,
    setChatWorkId,
    chatWorkName,
    setChatWorkName,
    customerName,
    setCustomerName,
    customerNameKana,
    setCustomerNameKana,
    updateChatWork,
  } = useUpdateChatWork();

  const handleOnChangeChatWorkId = (e: ChangeEvent<HTMLInputElement>): void => {
    setChatWorkId(prevState => e.target.value);
  };

  const handleOnChangeChatWorkName = (e: ChangeEvent<HTMLInputElement>): void => {
    setChatWorkName(prevState => e.target.value);
  };

  const handleOnChangeCustomerName = (e: ChangeEvent<HTMLInputElement>): void => {
    setCustomerName(prevState => e.target.value);
  };

  const handleOnChangeCustomerNameKana = (e: ChangeEvent<HTMLInputElement>): void => {
    setCustomerNameKana(prevState => e.target.value);
  };

  /**
   * 新規登録ボタン押下時
   */
  const handleOnClickSubmitButton = async (): Promise<void> => {
    const customer = await updateChatWork();
    if (customer) {
      handleOnSend();
    }
  };

  return (
    <EduITModal isOpen={true}>
      <H2>チャットワーク登録</H2>
      <Paragraph isCenter>ご利用開始までもう少し！</Paragraph>
      <div className={commonClasses.mt_16}>
        <Paragraph isLeft>
          お客様専用のChatWorkグループを開設させて頂きます。
          <br />
          当システムとChatWorkグループの紐づけを行わせていただきますので、
          お客様のチャットワークIDのご入力をお願いいたします。
        </Paragraph>
      </div>
      <div className={commonClasses.mt_16}>
        <Paragraph isSmall isLeft>
          ※既にチャットワークグループが存在するお客様につきましてもChatWorkグループ名が変更となりますのでご協力をお願いします。
        </Paragraph>
      </div>
      <InputAndLabel
        id={"chatWorkId"}
        text={"ChatWorkID(必須)"}
        value={chatWorkId}
        changeFunction={handleOnChangeChatWorkId}
      />
      <InputAndLabel
        id={"chatWorkName"}
        text={"ご希望のChatWorkグループ名（会社名、個人名、ニックネーム等）"}
        value={chatWorkName}
        changeFunction={handleOnChangeChatWorkName}
      />
      <InputAndLabel
        id={"customerName"}
        text={"お名前"}
        value={customerName}
        changeFunction={handleOnChangeCustomerName}
      />
      <InputAndLabel
        id={"customerNameKana"}
        text={"お名前 (カタカナ)"}
        value={customerNameKana}
        changeFunction={handleOnChangeCustomerNameKana}
      />
      <div className={commonClasses.mt_24}>
        <FormButton text={"チャットワークIDを登録"} color={"green"} onClick={handleOnClickSubmitButton} />
        <Paragraph isLink isLeft isMarginTop>
          <Link href={""}>チャットワークアカウントの作り方はこちら</Link>
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default ChatWorkModal;
