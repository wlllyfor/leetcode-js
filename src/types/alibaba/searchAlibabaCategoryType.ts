import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

export type SearchAlibabaCategoryType = {
  success: boolean;
  result: AlibabaCategoryType[];
}

type AlibabaCategoryType = {
  categoryId: number;
  chineseName: string;
  translatedName: string;
  language: string;
  leaf: boolean;
  level: string; // 入っているのは数値だけど文字列として取得される
  parentCateId: number;
  children?: AlibabaCategoryType[];
};

type AlibabaReactSelectOption = ReactSelectOption & { children: AlibabaReactSelectOption[]; }

const buildTree = (categories: AlibabaCategoryType[]): AlibabaCategoryType[] => {
  // カテゴリIDをキーにしたカテゴリのマップを作成
  const categoryMap: Map<number, AlibabaCategoryType> = new Map();

  // カテゴリデータをマップに変換し、childrenプロパティを初期化
  categories.forEach(category => {
    categoryMap.set(category.categoryId, { ...category, children: [] });
  });

  // 子カテゴリを親カテゴリに紐付け
  const result: AlibabaCategoryType[] = [];
  categoryMap.forEach(category => {
    if (category.level === "1") {
      result.push(category);
    } else {
      const parent = categoryMap.get(category.parentCateId);
      if (parent) {
        parent.children = [ ...(parent.children || []), category ];
      }
    }
  });

  return result;
};

const convertToReactSelectOptions = (categories: AlibabaCategoryType[]): AlibabaReactSelectOption[] => {
  return categories.map(category => {
    const option: AlibabaReactSelectOption = {
      value: category.categoryId,
      label: category.translatedName,
      children: category.children ? convertToReactSelectOptions(category.children) : [],
    };
    return option;
  });
};

export { buildTree, convertToReactSelectOptions };
