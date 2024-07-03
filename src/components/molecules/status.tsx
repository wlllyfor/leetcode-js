import { ReactElement } from "react";
import classes from "@/styles/components/molecules/status.module.scss";
import { StatusType } from "@/types/components/molecules/StatusType";

const Status = ({ color, children }: StatusType): ReactElement => {
  const classNames: string[] = [
    classes.status,
    ...(color === "green" ? [ classes.green ] : []),
    ...(color === "white" ? [ classes.white ] : []),
    ...(color === "dark" ? [ classes.dark ] : []),
    ...(color === "red" ? [ classes.red ] : []),
  ];
  return <div className={classNames.join(" ")}>{children}</div>;
};

export default Status;
