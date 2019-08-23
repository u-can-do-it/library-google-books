import React from "react";
import style from "./ListItem.module.css";

const listItem = props => {
  return (
    <li className={style.item}>
      <div>
        <img src={props.src} alt={props.alt} className={style.img} />
      </div>

      <div className={style.text}>
        <h4 className={style.title}>
          <a href={props.link} className={style.link}>
            {props.title}
          </a>
        </h4>
        <p className={style.description}>{props.description}</p>
      </div>
    </li>
  );
};
export default listItem;
