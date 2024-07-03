"use client";

import List from "@/components/atoms/list";
import UnorderedList from "@/components/atoms/unorderedList";
import classes from "@/styles/components/molecules/errors/error422.module.scss";
import { ReactElement } from "react";

const Error422 = ({ errors }: { errors: string[]; }): ReactElement => {
  if (errors.length === 0) {
    return <></>;
  }

  return (
    <div className={classes.error__wrapper}>
      <UnorderedList>
        {errors.map((message, index) => (
          <List key={index}>{message}</List>
        ))}
      </UnorderedList>
    </div>
  );
};

export default Error422;
