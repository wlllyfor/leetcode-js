"use client";

import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { ReactElement, useId } from "react";
import Select, { CSSObjectWithLabel, OptionProps, SingleValue, StylesConfig } from "react-select";
import { MallHeaderTopType } from "@/types/components/molecules/mall/MallHeaderTopType";

const MallHeaderTop = ({
  handleSearchGroupButtonClick,
  isFilterVisible,
  keyword,
  /** NOTE: keyword で代用するため category は一旦未使用 */
  category,
  language,
  onKeywordChange,
  onCategoryChange,
  onLanguageChange,
  searchFunction,
}: MallHeaderTopType): ReactElement => {
  const id = useId();

  const categoryOptions = [
    { value: "shoes", label: "シューズ" },
    { value: "bag", label: "バッグ" },
    { value: "ladies", label: "レディース" },
    { value: "mens", label: "メンズ" },
  ];

  const languageOptions = [
    { value: "ja", label: "日本語" },
    { value: "en", label: "英語" },
    { value: "cn", label: "中国語" },
  ];

  // 参考：https://zenn.dev/morit4ryo/articles/1897b2296b8f1c
  const languageSelectStyles: StylesConfig<ReactSelectOption, false> = {
    control: (provided: CSSObjectWithLabel) => ({
      ...provided,
      width: "100%",
      borderRadius: "none",
      border: "none",
      backgroundColor: "#F3F4F6",
      textAlign: "center",
      fontSize: "12px",
      "&:hover": {
        cursor: "pointer",
        border: "none",
        borderColor: "inherit",
        boxShadow: "none",
      },
      "&:focus": {
        border: "none",
        borderColor: "inherit",
        boxShadow: "none",
      },
    }),
    option: (provided: CSSObjectWithLabel, state: OptionProps<ReactSelectOption, false>) => ({
      ...provided,
      backgroundColor: state.isSelected ? "gray" : "#F3F4F6",
      color: state.isSelected ? "white" : "black",
      "&:hover": {
        backgroundColor: "#2563EB",
        color: "white",
      },
    }),
    menu: (provided: CSSObjectWithLabel) => ({
      ...provided,
      backgroundColor: "#F3F4F6",
    }),
    indicatorsContainer: (provided: CSSObjectWithLabel) => ({
      ...provided,
      color: "gray,",
    }),
    placeholder: (provided: CSSObjectWithLabel) => ({
      ...provided,
      fontSize: "12px",
    }),
  };

  const categorySelectStyles: StylesConfig<ReactSelectOption, false> = {
    control: (provided: CSSObjectWithLabel) => ({
      ...provided,
      width: "100%",
      borderRadius: "50px",
      border: "1px solid gray",
      backgroundColor: "#FFF",
      textAlign: "left",
      padding: "0 8px",
      "&:hover": {
        cursor: "pointer",
      },
    }),
    option: (provided: CSSObjectWithLabel, state: OptionProps<ReactSelectOption, false>) => ({
      ...provided,
      backgroundColor: state.isSelected ? "gray" : "#FFF",
      color: state.isSelected ? "white" : "black",
      "&:hover": {
        backgroundColor: "#2563EB",
        color: "white",
      },
    }),
    menu: (provided: CSSObjectWithLabel) => ({
      ...provided,
      backgroundColor: "#EEEEEE",
    }),
  };

  /** カテゴリ変更イベント */
  const handleCategoryOnChange = (option: SingleValue<ReactSelectOption>) => {
    if(!onCategoryChange) return;
    option ? onCategoryChange(option) : onCategoryChange(categoryOptions[0]);
  };

  /** 言語変更イベント */
  const handleLanguageOnChange = (option: SingleValue<ReactSelectOption>) => {
    if(!onLanguageChange) return;
    option ? onLanguageChange(option) : onLanguageChange(languageOptions[0]);
  };

  const defaultCategory = categoryOptions.filter(categoryOption => categoryOption.value === category) || undefined;
  const defaultLanguage = languageOptions.filter(languageOption => languageOption.value === language) || undefined;

  return (
    <>
      <div className="pt-[10px] pb-[10px] bg-white">
        <div className="flex flex-wrap justify-between items-center w-[1200px] mx-auto">
          {/* カテゴリ */}
          <div className="w-[250px] mr-auto">
            <Select
              id={`${id}-category`}
              instanceId={`${id}-category`}
              options={categoryOptions}
              placeholder="カテゴリ(category)"
              components={{
                IndicatorSeparator: () => null,
              }}
              styles={categorySelectStyles}
              onChange={handleCategoryOnChange}
              defaultValue={defaultCategory}
            />
          </div>
          {/* 検索窓 */}
          <div className="flex relative bg-[#F3F4F6] items-center rounded-sm max-w-[682px] w-full">
            <div className="w-[20%]">
              <Select
                id={`${id}-language`}
                instanceId={`${id}-language`}
                options={languageOptions}
                defaultValue={defaultLanguage}
                placeholder="言語(language)"
                components={{
                  IndicatorSeparator: () => null,
                }}
                styles={languageSelectStyles}
                onChange={handleLanguageOnChange}
              />
            </div>
            <div className="relative w-[80%] flex items-center before:absolute before:h-[calc(100%_-_12px)] before:w-[1px] before:bg-[#CCCCCC] before:top-[6px] before:left-[0]">
              <input
                type="text"
                name=""
                id=""
                className="w-[505px] bg-[#F3F4F6]"
                placeholder="URL、キーワードで検索"
                value={keyword}
                onChange={onKeywordChange}
              />
              <label className="cursor-pointer mr-2" htmlFor="photo">
                <span className="material-symbols-outlined text-[#6C757D] align-sub">photo_camera</span>
              </label>
              <input type="file" name="photo" id="photo" className="hidden" />
              <button
                type="button"
                className="bg-[#1F2937] py-1 px-4 cursor-pointer h-full rounded-r-sm ml-auto"
                onClick={() => searchFunction && searchFunction()}
              >
                <span className="material-symbols-outlined text-[#FFF] pt-2">search</span>
              </button>
            </div>
          </div>
          {/* 絞り込み検索展開ボタン */}
          <div className="ml-auto">
            <button
              className={`py-1 px-4 border-solid border rounded-full cursor-pointer ${
                isFilterVisible ? "bg-[#1F2937] text-white" : "text-[#1F2937]"
              }`}
              onClick={handleSearchGroupButtonClick}
            >
              <span>
              絞り込み検索
                <span className={`material-symbols-outlined align-bottom ${isFilterVisible ? "rotate-180" : ""}`}>
                arrow_drop_down
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MallHeaderTop;
