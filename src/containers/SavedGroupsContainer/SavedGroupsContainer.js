import React from "react";
import Heading from "../../components/SavedGroupsContainer/Heading/Heading";

import "../../css/SavedGroupsContainer.css";

import { connect } from "react-redux";
import {
  deleteSavedGroup,
  reuseSavedGroup,
} from "../../actions/savedGroupsActions";

const uuidv4 = require("uuid/v4");

function SavedGroupsContainer(props) {
  const handleReuseSavedGroupIndex = (index) => {
    const reusingSavedGroup = props.savedGroups[index];
    console.log(reusingSavedGroup);
    props.reuseSavedGroup(reusingSavedGroup);
  };
  // <li key={uuidv4()} style={{wordBreak: 'break-all'}}>
  //       </li>
  const listOfSavedGroups = props.savedGroups.map((savedGroup, index) => {
    return (
      <div key={uuidv4()} className="saved-group">
        <h3 className="saved-group-name">{savedGroup.name}</h3>
        {/*<button
          onClick={ () => props.deleteSavedGroup(index)}
          style={{
            border: '1px solid'
          }}
        >
          Delete
        </button>
        <button
          onClick={ () => handleReuseSavedGroupIndex(index)}
          style={{
            border: '1px solid'
          }}
        >
          Re-use This Group
        </button>
        <br />
        <br />
        */}
        <p
          data-testid={"remove-button-" + `${savedGroup.name}`}
          className="remove"
          onClick={() => props.deleteSavedGroup(index)}
        >
          Remove
        </p>
        <p className="remove" onClick={() => handleReuseSavedGroupIndex(index)}>
          Re-use This Group
        </p>
        <label className="saved-group-label">
          Total Count: {savedGroup.options.length}
        </label>
        <ul className="options-list">
          {savedGroup.options.map((savedOption) => {
            let longWordCSS = savedOption.includes(" ")
              ? " not-one-long-word"
              : " one-long-word";

            return (
              <li key={uuidv4()} className={"saved-option" + longWordCSS}>
                {savedOption}
              </li>
            );
          })}
        </ul>
      </div>
    );
  });
  return (
    <div
      data-testid="saved-groups-container-component"
      className="Saved-groups-container"
    >
      <Heading />
      {props.savedGroups.length ? (
        <ul className="saved-groups-list">{listOfSavedGroups}</ul>
      ) : (
        <p data-testid="saved-groups-empty-message">
          You have yet to save any groups
        </p>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    savedGroups: state.savedGroupsReducer.savedGroups,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteSavedGroup: (index) => dispatch(deleteSavedGroup(index)),
    reuseSavedGroup: (savedGroup) => dispatch(reuseSavedGroup(savedGroup)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedGroupsContainer);
