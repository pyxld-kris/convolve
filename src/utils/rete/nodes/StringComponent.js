import Rete from "rete";
import { MyControl } from "../controls/Control.jsx";
export default class StringComponent extends Rete.Component {
  constructor() {
    super("String");
    this.data.path = "String";
    this.task = {
      outputs: {
        out0: "outputOption",
      },
    };
  }

  builder(node) {
    var inp0 = new Rete.Input(
      "in0",
      "StringIn",
      this.editor.sockets.anyTypeSocket
    );
    var out0 = new Rete.Output(
      "out0",
      "String",
      this.editor.sockets.stringSocket
    );

    return node
      .addInput(inp0)
      .addOutput(out0)
      .addControl(new MyControl(this.editor, "string", ""));
  }

  worker(node, inputs, outputs) {
    var inputString = inputs["in0"]?.length
      ? inputs["in0"][0]
      : node.data["in0"];
    if (inputString)
      this.editor.nodes
        .find((n) => n.id == node.id)
        .controls.get("string")
        .setValue(inputString);
    else inputString = node.data.string;

    return { out0: inputString };
  }
}
