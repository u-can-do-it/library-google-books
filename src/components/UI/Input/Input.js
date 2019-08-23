import React from "react";

import style from "./Input.module.css";

const input = props => {
  let inputElement = null;
  const inputClasses = [style.InputElement];

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={e => props.changed(e, props.inputIdentifier)}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={e => props.changed(e)}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          onChange={e => props.changed(e, props.inputIdentifier)}
        >
          <option defaultValue disabled>
            {props.elementConfig.placeholder}
          </option>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );

      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={style.Input}>
      <label className={style.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
