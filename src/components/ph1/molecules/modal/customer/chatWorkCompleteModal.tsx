"use client";

import H2 from "@/components/atoms/h2";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import { ReactElement } from "react";
import Link from "next/link";
import { EduITModal } from "@/components/molecules/eduITModal";
import { useModal } from "@/hooks/useModal";

const ChatWorkCompleteModal = (): ReactElement => {
  const { isOpen, handleOnCloseButtonClick } = useModal();

  return (
    <EduITModal isOpen={isOpen}>
      <H2>ありがとうございます。</H2>
      <Paragraph isCenter>チャットワーク登録</Paragraph>
      <div className={commonClasses.mt_24}>
        <Paragraph isLeft>
          お客様専用のChatWorkグループを開設までに土日祝日を除く翌営業日までには対応させて頂きます。
          <br />
          こちらの注文システム及びご利用につきましては、既にご利用可能でございます。
        </Paragraph>
      </div>
      <div className={commonClasses.mt_24}>
        <FormButton text={"システムを利用する"} color={"green"} onClick={handleOnCloseButtonClick} />
        <Paragraph isLink isLeft isMarginTop>
          <Link href={""}>注文システムの利用方法はこちら(動画)</Link>
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default ChatWorkCompleteModal;
