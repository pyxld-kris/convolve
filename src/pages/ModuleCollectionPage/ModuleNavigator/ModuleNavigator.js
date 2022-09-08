/* eslint-disable no-use-before-define */

import React from "react";
import { Link } from "react-router-dom";
import { Wrapper } from "./StyledModuleNavigator";

import {
  hasInput,
  hasOutput,
} from "../../../utils/rete/utils/moduleClassifier";

export default function ModuleNavigator(props) {
  return (
    <Wrapper style={props.style}>
      <Link to={`/module/${props.moduleData.key}`}>
        <div style={{ width: "100%", height: "100%", paddingBottom: "2rem" }}>
          {props.moduleData.key}
          <br />
          <div style={{ fontSize: "1.5rem", color: "white" }}>
            {props.moduleData.label}
          </div>
          <div
            style={{
              width: "50%",
              float: "right",
              fontSize: "1rem",
              color: "white",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <span>
              Has Input: {hasInput(props.moduleData.data) ? "✅" : "❌"}
            </span>
            <span>
              Has Output: {hasOutput(props.moduleData.data) ? "✅" : "❌"}
            </span>
          </div>
        </div>
      </Link>
    </Wrapper>
  );
}
