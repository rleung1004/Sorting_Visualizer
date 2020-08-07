import React, { Component } from "react";
import Body from "../Body/BodyContainer";
import Toolbar from "../Toolbar/ToolbarContainer";
import "./SortingVisualizer.css";

class SortingVisualizer extends Component {
  render() {
    return (
      <div>
        <Toolbar />
        <Body />
      </div>
    );
  }
}

export default SortingVisualizer;
