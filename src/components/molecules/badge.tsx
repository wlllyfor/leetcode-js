import { ReactElement } from "react";
import classes from "@/styles/components/molecules/badge.module.scss";
import { BadgeType } from "@/types/components/molecules/BadgeType";

const Badge = ({ color, children }: BadgeType): ReactElement => {
  const classNames: string[] = [
    classes.badge,
    ...(color === "green" ? [ classes.green ] : []),
    ...(color === "white" ? [ classes.white ] : []),
    ...(color === "blue" ? [ classes.blue ] : []),
    ...(color === "dark" ? [ classes.dark ] : []),
    ...(color === "red" ? [ classes.red ] : []),
  ];
  return <span className={classNames.join(" ")}>{children}</span>;
};

export default Badge;
