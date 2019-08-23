import React from "react";
import style from "./Button.module.css";

const button = props => {
  const classes = [style.button];
  return (
    <button
      className={classes.join(" ")}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
export default button;
