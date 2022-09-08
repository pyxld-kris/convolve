import Rete from "rete";
import GPTUtil from "../../GPTUtil";
import { MyControl } from "../controls/Control.jsx";

export default class GPTQueryComponent extends Rete.Component {
  constructor() {
    super("GPTQuery");
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
      "prompt",
      this.editor.sockets.anyTypeSocket
    );
    var inp1 = new Rete.Input("in1", "topP", this.editor.sockets.anyTypeSocket);
    var inp2 = new Rete.Input("in2", "temp", this.editor.sockets.anyTypeSocket);
    var inp3 = new Rete.Input(
      "in3",
      "length",
      this.editor.sockets.anyTypeSocket
    );
    var inp4 = new Rete.Input(
      "in4",
      "terminator",
      this.editor.sockets.anyTypeSocket
    );
    var out = new Rete.Output(
      "out0",
      "queryResult",
      this.editor.sockets.anyTypeSocket
    );

    inp0.addControl(new MyControl(this.editor, "in0", "Prompt"));
    inp1.addControl(new MyControl(this.editor, "in1", "TopP"));
    inp2.addControl(new MyControl(this.editor, "in2", "Temperature"));
    inp3.addControl(new MyControl(this.editor, "in3", "Response Length"));
    inp4.addControl(new MyControl(this.editor, "in4", "Terminator"));

    return node
      .addInput(inp0)
      .addInput(inp1)
      .addInput(inp2)
      .addInput(inp3)
      .addInput(inp4)
      .addControl(new MyControl(this.editor, "preview", ""))
      .addOutput(out);
  }

  async worker(node, inputs, outputs = {}) {
    var prompt = inputs["in0"]?.length ? inputs["in0"][0] : node.data.in0;
    var topP = parseFloat(
      inputs["in1"]?.length ? inputs["in1"][0] : node.data.in1
    );
    var temperature = parseFloat(
      inputs["in2"]?.length ? inputs["in2"][0] : node.data.in2
    );
    var responseLength = parseInt(
      inputs["in3"]?.length ? inputs["in3"][0] : node.data.in3
    );
    var terminator = inputs["in4"]?.length ? inputs["in4"][0] : node.data.in4;

    this.editor.nodes
      .find((n) => n.id == node.id)
      ?.controls?.get("preview")
      ?.setValue("Executing...");

    let result = await GPTUtil.queryPrompt({
      text: prompt,
      topP: topP,
      temperature: temperature,
      length: responseLength,
      batchSize: 1,
    });
    //await new Promise(r => setTimeout(r, 2000));

    if (terminator) {
      result = result.split(terminator)[0];
    }

    this.editor.nodes
      .find((n) => n.id == node.id)
      ?.controls?.get("preview")
      ?.setValue(result);
    outputs["out0"] = result;

    return { out0: result };
  }
}
