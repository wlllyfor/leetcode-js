"use client";

import { ReactElement, useId, useState, useEffect, ChangeEvent } from "react";
import FlexWrapperLg from "@/components/atoms/div/wrapper/flexWrapperLg";
import FlexWrapperColumnStart from "@/components/atoms/div/wrapper/flexWrapperColumnStart";
import FormButton from "@/components/atoms/button/formButton";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import InputGroup44 from "@/components/molecules/form/input/inputGroup44";
import SelectGroup44 from "@/components/molecules/form/select/selectGroup44";
import ModalClickableButton from "@/components/atoms/button/modalClickableButton";
import FileUploadIconTextareaGroup from "@/components/molecules/form/textarea/fileUploadIconTextareaGroup";
import InputCheckbox from "@/components/molecules/form/input/inputCheckbox";
import InputGroup56 from "@/components/molecules/form/input/inputGroup56";
import CheckboxInputGroup from "@/components/molecules/form/input/checkboxInputGroup";
import CheckboxSelectGroup from "@/components/molecules/form/select/checkboxSelectGroup";
import InputRadio from "@/components/molecules/form/input/inputRadio";
import { ModalItemType } from "@/types/components/molecules/modalItem/employee/receiveStocks/ModalItemType";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { ReceiveStockDbTableType } from "@/types/db/receiveStock/receiveStock";

const ModalItem = ({ handleDetailAddition, selectedReceiveStock }: { handleDetailAddition: () => void; selectedReceiveStock: ReceiveStockDbTableType }): ReactElement => {
  const inputId = useId();

  const [details, setDetails] = useState([{ otherDetail: "", otherDetailPrice: "", quantity: "", total: 0, error: "" }]);
  const [isWithdrawalDetailChecked, setIsWithdrawalDetailChecked] = useState(false);
  const [withdrawalDetails, setWithdrawalDetails] = useState<{ otherDetail: string, otherDetailPrice: string, total: number }[]>([]);
  const [isTaxIncluded, setIsTaxIncluded] = useState(true);

  const [ selectedOption, setSelectedOption ] = useState<string>("");

  useEffect(() => {
    const newDetails = details.map((detail) => {
      const price = parseFloat(detail.otherDetailPrice) || 0;
      const qty = parseInt(detail.quantity) || 0;
      const error = validateInputs(detail.otherDetail, detail.otherDetailPrice, detail.quantity);
      return { ...detail, total: price * qty, error };
    });
    setDetails(newDetails);
  }, [details.map(detail => detail.otherDetailPrice), details.map(detail => detail.quantity)]);

  useEffect(() => {
    const newWithdrawalDetails = details.map(detail => ({
      otherDetail: detail.otherDetail,
      otherDetailPrice: detail.otherDetailPrice,
      total: detail.total
    }));
    setWithdrawalDetails(newWithdrawalDetails);
  }, [details]);

  useEffect(() => {
    console.log(isWithdrawalDetailChecked);
  }, [isWithdrawalDetailChecked]);

  const handleAddDetail = () => {
    if (details.length < 10) {
      setDetails([...details, { otherDetail: "", otherDetailPrice: "", quantity: "", total: 0, error: "" }]);
    }
  };

  const handleDetailChange = (index: number, field: string, value: string) => {
    const newDetails = [...details];
    newDetails[index][field] = value;
    setDetails(newDetails);
  };

  const validateInputs = (otherDetail: string, otherDetailPrice: string, quantity: string) => {
    let error = "";
    if (otherDetail.length > 20) {
      error += "その他詳細: 20文字まで入力してください\n";
    }
    if (!/^\d*$/.test(otherDetailPrice)) {
      error += "その他金額(単価): 半角数字を入力してください\n";
    } else if (parseFloat(otherDetailPrice) > 100000) {
      error += "その他金額(単価): 100000以内の数字を入力してください\n";
    }
    if (!/^\d*$/.test(quantity)) {
      error += "数量: 半角数字を入力してください\n";
    } else if (parseInt(quantity) > 1000000) {
      error += "数量: 1000000以内の数字を入力してください\n";
    }
    return error;
  };

  const totalSum = details.reduce((sum, detail) => sum + detail.total, 0);
  const withdrawalTotalSum = withdrawalDetails.reduce((sum, detail) => sum + detail.total, 0) * (isTaxIncluded ? 1.1 : 1);

  const options1: ReactSelectOption[] = [
    { value: "A", label: "在籍" },
    { value: "B", label: "退職" },
    { value: "C", label: "休職" },
  ];
  const options2: ReactSelectOption[] = [
    { value: "A", label: "ABC銀行" },
    { value: "B", label: "○○銀行" },
    { value: "C", label: "××銀行" },
  ];
  const options3: ReactSelectOption[] = [
    { value: "A", label: "普通" },
    { value: "B", label: "当座" },
  ];
  const options4: ReactSelectOption[] = [
    { value: "A", label: "送料" },
    { value: "B", label: "売上" },
    { value: "C", label: "返金" },
  ];
  const options5: ReactSelectOption[] = [
    { value: "A", label: "佐川急便" },
    { value: "B", label: "クロネコヤマト" },
  ];

  const handleCheckboxChange = (checked: boolean) => {
    console.log(checked);
    setIsWithdrawalDetailChecked(checked);
  };

  const handleTaxIncludedChange = () => {
    setIsTaxIncluded(!isTaxIncluded);
  };

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <ContentAreaWrapper>
        <div className="border-b border-[#CCCCCC] pb-[30px] mb-[14px]">
          <ContentAreaWrapper>
            <InputGroup44 id={`${inputId}-tracking-number`} text={"追跡番号"} value={selectedReceiveStock.trackingNo || ""} />
          </ContentAreaWrapper>
          <ContentAreaWrapper>
            <InputGroup44 id={`${inputId}-stock-date`} text={"入荷予定日"} value={selectedReceiveStock.expectedArrivedOn} />
          </ContentAreaWrapper>
        </div>
        <div className="border-b border-[#CCCCCC] mb-4">
          <ContentAreaWrapper>
            <div className="pb-2.5">
              <ModalClickableButton color={details.length >= 10 ? "gray" : "blue"} text="追加" onClick={handleAddDetail} disabled={details.length >= 10} />
            </div>
            {details.map((detail, index) => (
              <div key={index}>
                {detail.error && <div className="text-red-500">{detail.error}</div>}
                <FlexWrapperLg>
                  <InputGroup44
                    id={`${inputId}-other-detail-${index}`}
                    text={"その他詳細"}
                    value={detail.otherDetail}
                    onChange={(e) => handleDetailChange(index, "otherDetail", e.target.value)}
                  />
                  <InputGroup44
                    id={`${inputId}-other-detail-price-${index}`}
                    text={"その他金額(単価)"}
                    value={detail.otherDetailPrice}
                    onChange={(e) => handleDetailChange(index, "otherDetailPrice", e.target.value)}
                  />
                  <InputGroup44
                    id={`${inputId}-other-detail-quantity-${index}`}
                    text={"数量"}
                    value={detail.quantity}
                    onChange={(e) => handleDetailChange(index, "quantity", e.target.value)}
                  />
                  <InputGroup44 id={`${inputId}-total-${index}`} text={"合計"} value={`${detail.total}円`} isReadOnly />
                </FlexWrapperLg>
              </div>
            ))}
            <h2 className="text-base font-medium">その他金額総合計</h2>
            <span className="text-sm">{totalSum}円</span>
          </ContentAreaWrapper>
        </div>
        <div className="border-b border-[#CCCCCC] mb-6 pb-8">
          <div className="mb-4">
            <FileUploadIconTextareaGroup
              textareaId={`${inputId}-file-note`} inputFileUploadIconId={"file"}
              labelText={"備考"} rows={3} value={selectedReceiveStock.publicRemarks || ""}
            />
          </div>
          <div className="mb-4">
            <FileUploadIconTextareaGroup
              textareaId={`${inputId}-file-memo`} inputFileUploadIconId={"file"}
              labelText={"管理メモ"} rows={3} value={selectedReceiveStock.privateRemarks || ""}
            />
          </div>
          <div className="mb-6">
            <SelectGroup44 text={"ステータス"} isRequired={true} options={options1} isMulti={false} />
          </div>
          <FormButton
            color={"green"} text={"保存する"} onClick={() => {
              // handle save
            }}
          />
        </div>
        <div>
          <div className="mb-6">
            <InputCheckbox id={`${inputId}-withdrawal-detail`} checked={isWithdrawalDetailChecked} text="このまま引落詳細を作成する" changeFunction={handleCheckboxChange} />
          </div>
          {isWithdrawalDetailChecked && (
            <div>
              {withdrawalDetails.map((detail, index) => (
                <FlexWrapperLg key={index}>
                  <div className="min-w-24">
                    <InputGroup44 id={`${inputId}-other-detail-withdrawal-${index}`} text={"その他詳細"} value={detail.otherDetail} isReadOnly />
                  </div>
                  <div className="min-w-24">
                    <InputGroup44 id={`${inputId}-other-amount-withdrawal-${index}`} text={"その他金額"} value={detail.otherDetailPrice} isReadOnly />
                  </div>
                  <div className="min-w-28">
                    <FlexWrapperColumnStart>
                    <InputRadio
                      name={`radioGroup-${index}`}
                      fontSize={"14px"}
                      initialValue={""}
                      options={[
                        { id: "account", text: "口座仕訳" },
                        { id: "sales", text: "売上" },
                      ]}
                      onChange={handleRadioChange}
                    />
                    </FlexWrapperColumnStart>
                  </div>
                  <div className="min-w-44">
                    <CheckboxSelectGroup
                      isRequired={true}
                      text={"口座"}
                      id={`${inputId}-bank-account`}
                      checkboxLabelText={"デフォルトにする"}
                      checked={false}
                      options={options2}
                      isMulti={false}
                    />
                  </div>
                  <div className="min-w-44">
                    <SelectGroup44 text={"口座入出金種別"} options={options3} isMulti={false} isRequired />
                  </div>
                  <div className="min-w-44">
                    <SelectGroup44 text={"科目"} options={options4} isMulti={false} />
                  </div>
                  <div className="min-w-56">
                    <InputGroup56 id={`${inputId}-contents`} text={"内容"} value={""} isRequired />
                  </div>
                  <div className="min-w-44">
                    <SelectGroup44 text={"取引先"} options={options5} isMulti={false} />
                  </div>
                  <FileUploadIconTextareaGroup
                    textareaId={`${inputId}-file-withdrawal-${index}`} inputFileUploadIconId={"file"}
                    labelText={"管理メモ"} rows={3} value={""}
                  />
                </FlexWrapperLg>
              ))}
              <InputCheckbox id={`${inputId}-tax-included`} checked={isTaxIncluded} text="金額税込み計算をする (10%)" onChange={handleTaxIncludedChange} />
              <div className="text-base font-medium">出金額総合計： {Math.round(withdrawalTotalSum)}(円)</div>
            </div>
          )}
        </div>
      </ContentAreaWrapper>
    </>
  );
};

export default ModalItem;
function setSelectedOption(value: string) {
  throw new Error("Function not implemented.");
}

