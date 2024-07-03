export type ResetButtonType = {
  inputFunction?: () => void;
  clickFunction?: () => void;
  changeFunction?: () => void;
  text: string | ReadonlyArray<string> | number | undefined;
};
