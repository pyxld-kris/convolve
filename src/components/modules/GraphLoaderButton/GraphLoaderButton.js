/* eslint-disable no-use-before-define */

import React from "react";
import { Wrapper } from "./StyledGraphLoaderButton";

import { activeEditor, importGraphData } from "../../../utils/rete/editor";

export default function GraphLoaderButton(props) {
  return (
    <Wrapper style={props.style}>
      <div 
        style={{ width: "100%", height: "100%" }} 
        onClick = {() => {
          importGraphData(props.graphData);
        }}
      >
        {props.label}
      </div>
    </Wrapper>
  );
}
