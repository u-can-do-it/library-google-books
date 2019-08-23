import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";

import Search from "./Search";
import Loader from "../../components/UI/Loader/Loader";
import ListItem from "../../components/List/ListItem/ListItem";

configure({ adapter: new Adapter() });

describe("<Search/>", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Search />);
  });

  it("shouldn't render any Loader elements", () => {
    expect(wrapper.find(Loader)).toHaveLength(0);
  });

  it("should render one Loader element ", () => {
    wrapper.setState({ isLoading: true });
    expect(wrapper.find(Loader)).toHaveLength(1);
  });

  it("should render <ListItem/> when reciving books ", () => {
    wrapper.setState({
      books: [{ volumeInfo: { imageLinks: { thumbnail: "test" } } }]
    });
    expect(wrapper.find(ListItem)).toHaveLength(1);
  });
});
