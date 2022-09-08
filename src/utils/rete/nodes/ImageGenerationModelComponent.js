import axios from "axios";
import Rete from "rete";
import { MyControl } from "../controls/Control.jsx";
export default class ImageGenerationModelComponent extends Rete.Component {
  constructor() {
    super("ImageGenerationModelComponent");
    this.data.path = "Util";
    this.task = {
      outputs: {
        out0: "outputOption",
      },
    };
  }

  builder(node) {
    var inp0 = new Rete.Input(
      "in0",
      "prompt", // For long prompts, only the first 64 text tokens will be used to generate the image.
      this.editor.sockets.anyTypeSocket
    );
    var inp1 = new Rete.Input(
      "in1",
      "temperature", // High temperature increases the probability of sampling low scoring image tokens.
      this.editor.sockets.anyTypeSocket
    );
    var inp2 = new Rete.Input(
      "in2",
      "topK", // Each image token is sampled from the top-k scoring tokens.
      this.editor.sockets.anyTypeSocket
    );
    var inp3 = new Rete.Input(
      "in3",
      "superCondition", // Higher values can result in better agreement with the text.
      this.editor.sockets.anyTypeSocket
    );
    var out = new Rete.Output(
      "out0",
      "queryResult",
      this.editor.sockets.anyTypeSocket
    );

    inp0.addControl(new MyControl(this.editor, "in0", "Prompt"));
    inp1.addControl(new MyControl(this.editor, "in1", "Temperature=1"));
    inp2.addControl(new MyControl(this.editor, "in2", "TopK=128"));
    inp3.addControl(new MyControl(this.editor, "in3", "SuperCondition=16"));

    return node
      .addInput(inp0)
      .addInput(inp1)
      .addInput(inp2)
      .addInput(inp3)
      .addOutput(out);
  }

  async worker(node, inputs, outputs = {}) {
    var prompt = inputs["in0"]?.length ? inputs["in0"][0] : node.data.in0;
    var temperature = parseFloat(
      inputs["in1"]?.length ? inputs["in1"][0] : node.data.in1
    );
    var topK = parseInt(
      inputs["in2"]?.length ? inputs["in2"][0] : node.data.in2
    );
    var superCondition = parseInt(
      inputs["in3"]?.length ? inputs["in3"][0] : node.data.in3
    );

    if (!temperature) temperature = 1;
    if (!topK) topK = 128;
    if (!superCondition) superCondition = 16;

    // let result = await axios.get({
    //   url: url,
    //   method: method,
    //   data: data,
    // });

    // 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

    // let result = await axios.post(
    //   "http://localhost:5001",
    //   {
    //     prompt: prompt,
    //   },
    //   {
    //     headers: {
    //       "Target-URL": "https://bf.dallemini.ai/generate",
    //       "Connection-Override": "keep-alive",
    //       "Origin-Override": "https://hf.space",
    //       "Referer-Override": "https://hf.space",
    //     },
    //   }
    // );

    let result = await axios.post(
      "http://localhost:5001",
      {
        fn_index: 1,
        data: [prompt, 1, false, false, temperature, superCondition, topK],
      },
      {
        headers: {
          "Target-URL":
            "wss://spaces.huggingface.tech/kuprel/min-dalle/queue/join",
          "Connection-Override": "keep-alive",
          "Origin-Override": "https://hf.space",
          "Referer-Override": "https://hf.space",
        },
      }
    );

    console.log(result);

    if (result.data) result = result.data;
    result = JSON.stringify(result);

    console.log(result);
    //alert(result);

    outputs["out0"] = result;

    return { out0: result };
  }
}
