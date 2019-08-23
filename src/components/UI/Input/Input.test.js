import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";

import Input from "./Input";

const selectData = [
  {
    value: "test value",
    displayValue: "display test value"
  }
];

configure({ adapter: new Adapter() });

describe("<Input/>", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Input />);
    wrapper.setProps({ elementConfig: { placeholder: "test" } });
  });

  it("should render one input element", () => {
    wrapper.setProps({ elementType: "input" });
    expect(wrapper.find("input")).toHaveLength(1);
  });

  it("should render one textarea element", () => {
    wrapper.setProps({ elementType: "textarea" });
    expect(wrapper.find("textarea")).toHaveLength(1);
  });

  it("should render one select element", () => {
    wrapper.setProps({
      elementType: "select",
      elementConfig: { options: selectData }
    });
    expect(wrapper.find("select")).toHaveLength(1);
  });

  it("should render one input element (default option)", () => {
    wrapper.setProps({ elementType: "test" });
    expect(wrapper.find("input")).toHaveLength(1);
  });
});
