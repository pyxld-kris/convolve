import Rete from "rete";
import { MyControl } from "../controls/Control.jsx";
export default class NumComponent extends Rete.Component {
  constructor() {
    super("Number");
    this.data.path = "Number";
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
      "Number",
      this.editor.sockets.anyTypeSocket
    );

    return node
      .addInput(inp0)
      .addOutput(out0)
      .addControl(new MyControl(this.editor, "num", "0"));
  }

  worker(node, inputs, outputs) {
    return { out0: node.data.num };
  }
}
