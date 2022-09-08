import Grid from "@mui/material/Grid";
import React from "react";
import { useParams } from "react-router-dom";

import ModuleNavigator from "./ModuleNavigator";

import graphModules from "../../content/graphModules";

export default function ModuleCollectionPage() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { path1, path2, path3, path4, path5, path6, path7, path8 } = useParams();

  const [username, setUsername] = React.useState("pyxld-kris");
  const [pathTarget, setPathTarget] = React.useState("/");
  const [subPaths, setSubPaths] = React.useState([]);
  const [pathDisplay, setPathDisplay] = React.useState("/");

  React.useEffect(() => {
    let pathArray = [path1, path2, path3, path4, path5, path6, path7, path8];

    let tempPathTarget = "";
    pathArray.forEach((pathEntry) => {
      if (pathEntry != undefined) tempPathTarget += "/" + pathEntry;
    });
    if (tempPathTarget == "") tempPathTarget = "/";
    setPathTarget(tempPathTarget);
    setPathDisplay(tempPathTarget);

    let tempSubPaths = [];
    Object.values(graphModules).forEach((graphModule) => {
      if (!graphModule.path) graphModule.path = "/";
      if (graphModule.path.indexOf(tempPathTarget) != -1) {
        let excessPath = graphModule.path.slice(
          tempPathTarget.length,
          graphModule.path.length
        );
        while (excessPath.charAt(0) == "/" && excessPath.length > 1)
          excessPath = excessPath.substring(1, excessPath.length);
        if (excessPath.length) {
          console.log(excessPath);
          let excessParts = excessPath.split("/");
          let subPathName = excessParts[0];
          if (tempSubPaths.indexOf(subPathName) == -1)
            tempSubPaths.push(subPathName);
        }
      }
    });
    tempSubPaths.sort();
    setSubPaths(tempSubPaths);
  }, []);

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div className="left-panel" style={{ width: "25%" }}>
        <div
          style={{
            backgroundColor: "gray",
            width: "80%",
            paddingBottom: "80%",
            margin: "2rem",
            marginleft: "auto",
            marginRight: "auto",
          }}
        ></div>
      </div>
      <div className="right-panel" style={{ width: "75%" }}>
        <div
          style={{
            width: "80%",
            textAlign: "left",
            fontSize: "2rem",
            marginTop: "5rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <b style={{ fontSize: ".6em" }}>{username}</b>
          {pathDisplay}
        </div>
        <div
          style={{
            width: "90%",
            textAlign: "left",
            display: "flex",
            flexWrap: "wrap",
            fontSize: "2rem",
            marginBottom: "5rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {subPaths.map((subPath) => {
            return (
              <div style={{ width: "50%", padding: ".4rem" }}>
                📁
                <a href={window.location + "/" + subPath}>{subPath}</a>
              </div>
            );
          })}
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <div id="welcomeWrapper">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  {Object.values(graphModules).map((graphModule) => {
                    //return <GeneralGeneratorButton label={prompt.label} modelParameters={prompt.modelParameters} style={{marginLeft:"auto", marginRight:"auto"}} />;
                    return graphModule.path == pathTarget ||
                      (pathTarget == "/" && !graphModule.path) ? (
                      <ModuleNavigator
                        moduleData={graphModule}
                        style={{ marginLeft: "auto", marginRight: "auto" }}
                      />
                    ) : (
                      ""
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
    </div>
  );
}
