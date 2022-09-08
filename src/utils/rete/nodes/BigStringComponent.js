import Rete from "rete";
import { TextareaControl } from "../controls/TextareaControl.jsx";
export default class BigStringComponent extends Rete.Component {
  constructor() {
    super("BigString");
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
      "BigStringIn",
      this.editor.sockets.anyTypeSocket
    );
    var out0 = new Rete.Output(
      "out0",
      "BigStringOut",
      this.editor.sockets.anyTypeSocket
    );

    return node
      .addInput(inp0)
      .addOutput(out0)
      .addControl(new TextareaControl(this.editor, "string", ""));
  }

  worker(node, inputs, data) {
    var inputString = inputs["in0"]?.length
      ? inputs["in0"][0]
      : node.data["in0"];

    if (inputString)
      this.editor.nodes
        .find((n) => n.id == node.id)
        ?.controls?.get("string")
        .setValue(inputString);
    else inputString = node.data.string;

    return { out0: inputString };
  }
}
