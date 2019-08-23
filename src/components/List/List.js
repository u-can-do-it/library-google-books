import React from "react";
import style from "./List.module.css";

class List extends React.Component {
  render() {
    return <ul className={style.list}>{this.props.children}</ul>;
  }
}
export default List;
