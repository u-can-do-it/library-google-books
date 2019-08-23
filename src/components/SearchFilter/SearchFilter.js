import React from "react";

import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import style from "./SearchFilter.module.css";

import { languages } from "../../Data/languages";

class SearchFilter extends React.Component {
  state = {
    filtersActive: false,
    filterFormat: {
      inauthor: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Author"
        },
        value: ""
      },
      inpublisher: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Publisher"
        },
        value: ""
      },
      langRestrict: {
        elementType: "select",
        elementConfig: {
          options: languages,

          placeholder: "Select a language"
        },
        value: ""
      }
    }
  };

  inputHangeHandler = (event, inputIdentifier) => {
    let updatedState = { ...this.state };
    updatedState.filterFormat[inputIdentifier].value = event.target.value;
    this.setState({ ...updatedState });

    for (let element in updatedState.filterFormat) {
      if (updatedState.filterFormat[element].value) {
        this.setState({ filtersActive: true });
        return;
      }
      this.setState({ filtersActive: false });
    }
  };

  getValues = event => {
    console.log("few");
    event.preventDefault();
    let filters = {};
    for (let key in this.state.filterFormat) {
      filters[key] = this.state.filterFormat[key].value;
    }
    this.props.filter(filters);
  };

  resetValues = event => {
    event.preventDefault();
    let filters = { ...this.state.filterFormat };
    for (let filter in filters) {
      filters[filter].value = "";
    }
    this.setState({ filterFormat: filters, filtersActive: false }, () => {
      this.props.resetFilters();
    });
  };

  render() {
    let filters = [];
    for (let key in this.state.filterFormat) {
      filters.push(
        <Input
          inputIdentifier={key}
          key={key}
          elementType={this.state.filterFormat[key].elementType}
          elementConfig={this.state.filterFormat[key].elementConfig}
          label={this.state.filterFormat[key].elementConfig.placeholder}
          changed={this.inputHangeHandler}
          value={this.state.filterFormat[key].value}
        />
      );
    }

    return (
      <form className={style.form}>
        {filters}
        <Button
          onClick={event => this.getValues(event)}
          disabled={!this.state.filtersActive}
        >
          Filter
        </Button>
        <Button
          onClick={event => {
            this.resetValues(event);
          }}
          disabled={!this.state.filtersActive}
        >
          reset filters
        </Button>
      </form>
    );
  }
}
export default SearchFilter;
