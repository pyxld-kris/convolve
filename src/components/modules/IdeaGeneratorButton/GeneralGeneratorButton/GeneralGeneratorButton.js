import React from "react";

import IdeaGeneratorButton from "../IdeaGeneratorButton";
import GPTUtil from "../../../../utils/GPTUtil.js";

//import banana from "@banana-dev/banana-dev";
const banana = require('@banana-dev/banana-dev');

const apiKey = "68085f0b-fd3c-4309-9736-884c6e60a4c4";
const modelKey = "gptj";

let fetchIdea = async (modelParameters) => {
  //alert(modelParameters)
  //console.log(banana);

  if (modelParameters.args) {
    Object.keys(modelParameters.args).forEach((key) => {
      modelParameters.text = modelParameters.text.replaceAll('{:'+key+'}', modelParameters.args[key]);
    });
  }

  let response = await GPTUtil.queryPrompt(modelParameters);
  //alert(response);
  let parts = response.split("~~~");
  parts = parts[0].split("\n");
  return <div style={{width:"90%",height:"12em",textAlign:"left",overflow:"auto"}}>{parts.map((line) => {
    return <div>{line}</div>;
  })}</div>
}

//const gamePhraseGenerator = () => <div>{getRandomPhrase(phraseFormats)}</div>;
const phraseGenerator = (modelParameters) => {
  return async () => {return <div>{await fetchIdea(modelParameters)}</div>};
};

export default function GeneralGeneratorButton(props) {
  return (
    <IdeaGeneratorButton style={props.style} contentGenerator={phraseGenerator(props.modelParameters)}>
      {props.label}
    </IdeaGeneratorButton>
  );
}
