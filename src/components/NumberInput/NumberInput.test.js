import React from "react";
import NumberInput from "./NumberInput";
import { createStore } from "redux";
import { Provider } from "react-redux";

import { render, fireEvent } from "@testing-library/react";

const startingState = {
  optionsReducer: {
    options: [
      "Sam",
      "Ryan",
      "Stephen",
      "David",
      "awefsgdgndgsfdffbsdffsgfbdfsdffsgbdsffdbfesfbfgsffbxffesgfbgbgsgrdgngrdggrsfdbgfgfbgrdbgfgfdbbgdbgbfdgfbbgfbcbfgdbcgrfdawefsgdgndgsfdffbsdffsgfbdfsdffsgbdsffdbfesfbfgsffbxffesgfbgbgsgrdgngrdggrsfdbgfgfbgrdbgfgfdbbgdbgbfdgfbbgfbcbfgdbcgrfd",
      "afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564 afsghndfgsfgdf 545564",
    ],
  },
};

function reducer(state = startingState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

function renderWithRedux(
  component,
  { initialState, store = createStore(reducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
}

it("renders with redux", () => {
  const { getByTestId } = renderWithRedux(<NumberInput isGroups={true} />);
  expect(getByTestId("number-input-component"));
});

it("renders with proper initial state", () => {
  const { getByTestId } = renderWithRedux(<NumberInput isGroups={true} />);

  const numberInput = getByTestId("number-input");
  expect(getByTestId("number-input-header").textContent).toBe(
    "Number of Groups"
  );
  expect(numberInput.value).toBe("1");
  expect(numberInput.min).toBe("1");
  expect(numberInput.max).toBe(
    startingState.optionsReducer.options.length.toString()
  );
});

it("renders with respective prop values", () => {
  const { getByTestId } = renderWithRedux(<NumberInput isGroups={false} />);
  expect(getByTestId("number-input-header").textContent).toBe(
    "Number of People"
  );
});

it("typing in numerical values", () => {
  const { getByTestId } = renderWithRedux(<NumberInput isGroups={true} />);

  expect(getByTestId("number-input").value).toBe("1");
  fireEvent.change(getByTestId("number-input"), { target: { value: "2" } });
  expect(getByTestId("number-input").value).toBe("2");
  fireEvent.change(getByTestId("number-input"), { target: { value: "3" } });
  expect(getByTestId("number-input").value).toBe("3");
});

it("typing a number equal to or less than 0 for groups", () => {
  const { getByTestId } = renderWithRedux(<NumberInput isGroups={true} />);
  fireEvent.change(getByTestId("number-input"), { target: { value: "0" } });
  expect(getByTestId("number-input-error-message").textContent).toBe(
    "The number of groups must be filled in or greater than 0"
  );
  fireEvent.change(getByTestId("number-input"), { target: { value: "-1" } });
  expect(getByTestId("number-input-error-message").textContent).toBe(
    "The number of groups must be filled in or greater than 0"
  );
});

it("typing a number equal to or less than 0 for people", () => {
  const { getByTestId } = renderWithRedux(<NumberInput isGroups={false} />);
  fireEvent.change(getByTestId("number-input"), { target: { value: "0" } });
  expect(getByTestId("number-input-error-message").textContent).toBe(
    "The number of people must be filled in or greater than 0"
  );
  fireEvent.change(getByTestId("number-input"), { target: { value: "-1" } });
  expect(getByTestId("number-input-error-message").textContent).toBe(
    "The number of people must be filled in or greater than 0"
  );
});

it("proper max value", () => {
  const store = createStore(() => ({ optionsReducer: { options: ["Bob"] } }));

  const { getByTestId } = renderWithRedux(<NumberInput isGroups={true} />, {
    store,
  });

  fireEvent.change(getByTestId("number-input"), { target: { value: "3" } });
  expect(getByTestId("number-input").value).toBe("3");
  expect(getByTestId("number-input").max).toBe("1");
});
