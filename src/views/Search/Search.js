import React from "react";
import axios from "axios";

import SearchForm from "../../components/SearchForm/SearchForm";
import Loader from "../../components/UI/Loader/Loader";
import List from "../../components/List/List";
import ListItem from "../../components/List/ListItem/ListItem";
import SearchFilter from "../../components/SearchFilter/SearchFilter";
import style from "./Search.module.css";

import { stringShorter } from "../../utils/Utils";

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      requestStatus: "",
      totalBooks: "",
      searchValue: "",
      serverFilters: {
        inauthor: null,
        inpublisher: null,
        langRestrict: null
      },
      books: [],
      isLoading: false
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleOnScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleOnScroll);
  }

  handleOnScroll = () => {
    let scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    let scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    let clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) {
      this.loadOnScroll();
    }
  };

  loadBooks = (loadMore = false) => {
    this.setState({ isLoading: true });
    const filters = this.state.serverFilters;

    let uri = `https://www.googleapis.com/books/v1/volumes?q=${this.state.searchValue.replace(
      " ",
      "%"
    )}`;

    for (let filter in filters) {
      if (filters[filter]) {
        if (filter === "langRestrict") {
          uri += `&${filter}=${filters[filter]}`;
        } else {
          uri += `+${filter}:${filters[filter]}`;
        }
      }
    }
    if (loadMore) {
      uri += `&startIndex=${this.state.books.length}`;
    }

    axios
      .get(uri)
      .then(resp => {
        this.setState({
          books: [...this.state.books, ...resp.data.items],
          isLoading: false,
          requestStatus: resp.status,
          totalBooks: resp.data.totalItems
        });
      })
      .catch(err => {
        this.setState({ isLoading: false }, () => {
          if (this.state.books) {
            alert("No books has been found.");
          }
        });
      });
  };

  searchHandler = value => {
    if (value === this.state.searchValue) {
      return;
    }

    this.setState({ searchValue: value, isLoading: true, books: [] }, () => {
      this.loadBooks();
    });
  };

  filterHandler = filters => {
    this.setState(
      { serverFilters: { ...filters }, isLoading: true, books: [] },
      () => {
        this.loadBooks();
      }
    );
  };

  isFiltering = () => {
    const filters = this.state.serverFilters;
    let filtering = false;
    for (let key in filters) {
      if (filters[key]) {
        filtering = true;
      }
    }
    return filtering;
  };

  filterResetHandler = () => {
    if (!this.isFiltering()) {
      return;
    }
    this.setState({ serverFilters: {}, isLoading: true, books: [] }, () => {
      if (!this.state.searchValue) {
        this.setState({ isLoading: false });
        return;
      }
      this.loadBooks();
    });
  };

  loadOnScroll = () => {
    if (!this.state.isLoading) {
      this.loadBooks(true);
    }
  };

  render() {
    let items = [];

    if (this.state.books) {
      items = this.state.books.map((book, index) => {
        return (
          <ListItem
            key={index}
            src={
              book.volumeInfo.imageLinks === undefined
                ? ""
                : `${book.volumeInfo.imageLinks.thumbnail}`
            }
            alt={`${book.volumeInfo.title} cover photo`}
            title={book.volumeInfo.title}
            description={
              stringShorter(book.volumeInfo.description, 120) + "..."
            }
            link={book.volumeInfo.previewLink}
          />
        );
      });
    }

    return (
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.searchFilter}>
            <SearchFilter
              filter={this.filterHandler}
              resetFilters={this.filterResetHandler}
            />
          </div>
          <div className={style.list}>
            <SearchForm search={this.searchHandler} />
            <List loadMore={this.loadOnScroll}>
              {items}
              <li className={style.spinner}>
                {this.state.isLoading ? <Loader /> : null}
              </li>
            </List>
          </div>
        </div>
      </div>
    );
  }
}
export default Search;
