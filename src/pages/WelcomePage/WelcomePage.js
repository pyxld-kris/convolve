import Grid from "@mui/material/Grid";
import React from "react";

import "./WelcomePage.css";

import GraphEditor from "../../components/modules/GraphEditor";
import GraphLoaderButton from "../../components/modules/GraphLoaderButton";

import graphModules from "../../content/graphModules";

import {
  exportModules,
  listModules,
  loadSavedModule,
  saveCurrentModule,
} from "../../utils/rete/editor";

import { Description } from "./StyledWelcomePage";

export default function WelcomePage() {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <div id="welcomeWrapper">
            <h1 style={{ width: "100%", textAlign: "center" }}>AI Garden</h1>

            <div style={{ textAlign: "left", width: "100vw", height: "80vh" }}>
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
                  loadSavedModule();
                }}
              >
                OPEN MODULE
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
              <button
                style={{ marginLeft: "auto", marginRight: "auto" }}
                id="graph-execution-button"
                onClick={() => {
                  listModules();
                }}
              >
                LIST MODULES
              </button>

              <GraphEditor />
            </div>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Description>What would you like to do?</Description>

                {Object.values(graphModules).map((graphModule) => {
                  //return <GeneralGeneratorButton label={prompt.label} modelParameters={prompt.modelParameters} style={{marginLeft:"auto", marginRight:"auto"}} />;
                  return (
                    <GraphLoaderButton
                      graphData={graphModule.data}
                      label={graphModule.label}
                      style={{ marginLeft: "auto", marginRight: "auto" }}
                    ></GraphLoaderButton>
                  );
                })}

                <div>
                  {/* Modules */}
                  {/*}
                  <b>Modules</b>
                  {Object.keys(modules).map((moduleName) => {
                    let moduleData = modules[moduleName].data;
                    //return <GeneralGeneratorButton label={prompt.label} modelParameters={prompt.modelParameters} style={{marginLeft:"auto", marginRight:"auto"}} />;
                    return <div style={{cursor:"pointer"}} onClick={() => {
                      importGraphData(moduleData);
                    }}>{moduleName}</div>
                  })}
                  {*/}
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
