import React from "react";
import searchIcon from "../../assets/icons/searcher.svg";
import style from "./SearchForm.module.css";

class searchForm extends React.Component {
  state = {
    input: ""
  };

  serachSubmit = event => {
    event.preventDefault();
    if (this.state.input) {
      this.props.search(this.state.input);
    }
  };

  render() {
    return (
      <form className={style.form}>
        <input
          className={style.input}
          type="text"
          placeholder="Search books"
          onChange={event => {
            this.setState({ input: event.target.value });
          }}
        />
        <button
          className={style.button}
          onClick={event => this.serachSubmit(event)}
        >
          <img src={searchIcon} alt="search icon" className={style.icon} />
        </button>
      </form>
    );
  }
}

export default searchForm;
