
const banana = require('@banana-dev/banana-dev');

const bananaQuery = async (queryData) => {
    const apiKey = "68085f0b-fd3c-4309-9736-884c6e60a4c4";
    const modelKey = "gptj";

    let modelParameters = queryData;

    console.log(modelParameters);

    try {
        let out = await banana.run(apiKey, modelKey, modelParameters);
        //alert(out);
        //console.log(out);
    
        return out.modelOutputs[0].output;
      } catch(e) {
        return "API Error..."
      }
}

const eleutherQuery = async (queryData) => {
    /*
    {
        id: 6,
        label: "💡 Generate A Something Idea!",
        modelParameters: {
            "text": `
                {:variable1} `,
            "length":100,
            "temperature":0.95,
            "batchSize": 1
        },
        parseCharacter: "\n"
    },
    */
    const s = "https://api.eleuther.ai/completion";
    let response = await fetch(s, {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          context: queryData.text,
          top_p: queryData.topP,
          temp: queryData.temperature,
          response_length: queryData.length,
          remove_input: !0
      })});
    const data = await response.json();

    //console.log(data);
    //alert(data);
    //alert(data[0].generated_text);

    return data[0].generated_text;
}


export default {
    queryPrompt: bananaQuery
};