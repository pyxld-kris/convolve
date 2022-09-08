import React from "react";

import init from "../../../utils/rete/editor";

const GraphEditor = React.memo((props) => {
  return (
    <div
      style={props.style}
      class="node-editor"
      ref={(el) => {
        return init(el);
      }}
    ></div>
  );
});

export default GraphEditor;
