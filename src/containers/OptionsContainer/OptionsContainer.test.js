import React from "react";
import OptionsContainer from "./OptionsContainer";
import { createStore } from "redux";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";

import { render } from "@testing-library/react";
import { clearOptions } from "../../actions/optionsActions"

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
    number: "1",
  },
  savedGroupsReducer: {
    savedGroups: [
      {
        name: "Saved Group #1",
        options: ["Bob", "Sam", "Gavin"],
      },
      {
        name: "Testing",
        options: ["Bleh"],
      },
    ],
  },
};

function reducer(state = startingState, action) {
  switch (action.type) {
    case "ADD_OPTION":
      return {
        ...state,
        optionsReducer: {
          ...state.optionsReducer,
          options: [...state.optionsReducer.options, action.payload],
        },
      };
    case "REUSE_SAVED_GROUP":
      return {
        ...state,
        optionsReducer: {
          ...state.optionsReducer,
          options: action.payload.options,
        },
      };
    case "CLEAR_OPTIONS":
      return {
        ...state,
        optionsReducer: { ...state.optionsReducer, options: [] },
      };
    case "REMOVE_OPTION":
      return {
        ...state,
        optionsReducer: {
          ...state.optionsReducer,
          options: [
            ...state.optionsReducer.options.slice(0, action.payload),
            ...state.optionsReducer.options.slice(action.payload + 1),
          ],
        },
      };
    case "HANDLE_NUMBER":
      return {
        ...state,
        optionsReducer: { ...state.optionsReducer, number: action.payload },
      };
    case "SAVE_GROUP":
      return {
        ...state,
        savedGroupsReducer: {
          ...state.savedGroupsReducer,
          savedGroups: [
            ...state.savedGroupsReducer.savedGroups,
            action.payload,
          ],
        },
      };
    case "DELETE_SAVED_GROUP":
      return {
        ...state,
        savedGroupsReducer: {
          ...state.savedGroupsReducer,
          savedGroups: [
            ...state.savedGroupsReducer.savedGroups.slice(0, action.payload),
            ...state.savedGroupsReducer.savedGroups.slice(action.payload + 1),
          ],
        },
      };
    default:
      return state;
  }
}

function renderWithRedux(component, store = createStore(reducer)) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
}

it("renders with redux", () => {
  const { getByTestId } = renderWithRedux(<OptionsContainer />);
  expect(getByTestId("options-container-component"));
});

it("renders correctly with initial state", () => {
  const { getByTestId } = renderWithRedux(<OptionsContainer />);
  getByTestId("heading-options-container");
  getByTestId("note");
  getByTestId("group-name-label");
  getByTestId("group-name");
  expect(getByTestId("options-counter").textContent).toBe("Total Count: 6");
  getByTestId("clear-options-button");
  getByTestId("save-group-button");
  expect(getByTestId("table-options").getElementsByTagName("tr").length).toBe(
    6
  );
  expect(getByTestId("table-options").getElementsByClassName("remove").length).toBe(
    6
  );
});

it("clears all options", () => {
  const { getByTestId } = renderWithRedux(<OptionsContainer />)
  const clearOptionsButton = getByTestId("clear-options-button")
  userEvent.click(clearOptionsButton)
  expect(getByTestId("options-counter").textContent).toBe("Total Count: 0");
  expect(getByTestId("table-options").getElementsByTagName("tr").length).toBe(
    0
  );
  expect(getByTestId("table-options").getElementsByClassName("remove").length).toBe(
    0
  );
})

it("removes one option", () => {
  renderWithRedux(<OptionsContainer />)
  const removes = document.getElementsByClassName("remove")
  userEvent.click(removes[0])
  expect(removes.length).toBe(5)
  userEvent.click(removes[0])
  expect(removes.length).toBe(4)
})
