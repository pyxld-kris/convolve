import Grid from "@mui/material/Grid";
import React from "react";
import { useParams } from "react-router-dom";

import GraphEditor from "../../components/modules/GraphEditor";

import graphModules from "../../content/graphModules";

import {
  exportModules,
  importGraphData,
  saveCurrentModule,
} from "../../utils/rete/editor";

export default function ModulePage() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { moduleName } = useParams();

  const [moduleData, setModuleData] = React.useState({});

  React.useEffect(() => {
    //activeEditor = null;
    //alert(moduleName);

    let graphData = graphModules[moduleName].data;

    setModuleData(graphModules[moduleName]);

    //console.log(graphData);
    importGraphData(graphData);
  }, [moduleName]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <div id="welcomeWrapper">
            <div
              style={{
                width: "100%",
                height: "80vh",
                display: "flex",
                flexDirection: "row",
                padding: "2rem",
                marginTop: "5vh",
              }}
            >
              <div style={{ width: "33%" }}>
                <h1 style={{ marginTop: "2rem" }}>{moduleName}</h1>
                <div>{moduleData.label}</div>
              </div>
              <div style={{ width: "65%" }}>
                {" "}
                <div style={{ textAlign: "left", width: "100%" }}>
                  <button
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                    id="graph-execution-button"
                    onClick={() => {
                      window.executeGraph();
                    }}
                  >
                    EXECUTE
                  </button>
                  <button
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                    id="graph-execution-button"
                    onClick={() => {
                      saveCurrentModule();
                    }}
                  >
                    SAVE MODULE
                  </button>
                  <button
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                    id="graph-execution-button"
                    onClick={() => {
                      exportModules();
                    }}
                  >
                    EXPORT MODULES
                  </button>
                </div>
                <GraphEditor />
              </div>
              <div style={{ width: "2%" }}></div>
            </div>
            <div style={{ width: "100%", height: "40vh" }}></div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
