export type SmallButtonType = {
  clickFunction?: () => void;
  text: string | ReadonlyArray<string> | number | undefined;
  icon?: string | null;
  isBlue?: boolean;
  isGreen?: boolean;
  isRed?: boolean;
  isDark?: boolean;
  isSearch?: boolean;
  isDisable?: boolean;
};
