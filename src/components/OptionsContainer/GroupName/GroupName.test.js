import React from "react";
import GroupName from "./GroupName";

import { render } from "@testing-library/react";

it("renders without crashing", () => {
  render(<GroupName />);
});

it("renders with test id", () => {
  const { getByTestId } = render(<GroupName />);
  getByTestId("group-name");
});
