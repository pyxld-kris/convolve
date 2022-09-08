import Rete from "rete";
import { TextareaControl } from "../controls/TextareaControl.jsx";
export default class CodeComponent extends Rete.Component {
  constructor() {
    super("Code");
    this.data.path = "Util";
    this.task = {
      outputs: {
        out0: "outputOption",
      },
    };
  }

  builder(node) {
    var inp0 = new Rete.Input("in0", "Code", this.editor.sockets.stringSocket);
    var inp1 = new Rete.Input(
      "in1",
      "InputData",
      this.editor.sockets.anyTypeSocket
    );
    var out0 = new Rete.Output(
      "out0",
      "result",
      this.editor.sockets.anyTypeSocket
    );

    inp0.addControl(new TextareaControl(this.editor, "in0", ""));

    return node.addInput(inp0).addInput(inp1).addOutput(out0);
  }

  worker(node, inputs, data) {
    var code = inputs["in0"]?.length ? inputs["in0"][0] : node.data["in0"];
    var inputData = inputs["in1"]?.length ? inputs["in1"][0] : node.data["in1"];

    //console.log(code);
    //console.log(inputData);

    let evalCode = "(" + code + ")(" + JSON.stringify(inputData) + ");";
    //console.log(evalCode);

    let evalResult = eval(evalCode);
    //console.log(evalResult);

    return { out0: evalResult };
  }
}
