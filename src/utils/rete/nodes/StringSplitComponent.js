import Rete from "rete";
import { MyControl } from "../controls/Control.jsx";
export default class StringSplitComponent extends Rete.Component {
  constructor() {
    super("StringSplit");
    this.data.path = "String";
    this.task = {
      outputs: {
        out0: "outputOption",
      },
    };
  }

  builder(node) {
    var inp1 = new Rete.Input(
      "in0",
      "string",
      this.editor.sockets.stringSocket
    );
    var inp2 = new Rete.Input(
      "in1",
      "splitOn",
      this.editor.sockets.stringSocket
    );
    var out = new Rete.Output("out0", "array", this.editor.sockets.arraySocket);

    inp1.addControl(new MyControl(this.editor, "in0", "String"));
    inp2.addControl(new MyControl(this.editor, "in1", "Split On"));
    //var ctrl = new MyControl(this.editor, "greeting", "#username");

    return node.addInput(inp1).addInput(inp2).addOutput(out);
  }

  worker(node, inputs, outputs) {
    var string = inputs["in0"]?.length ? inputs["in0"][0] : node.data.in0;
    var splitOn = inputs["in1"]?.length ? inputs["in1"][0] : node.data.in1;

    let pattern = splitOn;
    if (splitOn == "\\n") pattern = /\n/g;

    return { out0: string.split(pattern) };
  }
}
