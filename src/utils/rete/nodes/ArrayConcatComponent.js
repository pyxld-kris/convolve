import Rete from "rete";
import { MyControl } from "../controls/Control.jsx";
export default class ArrayConcatComponent extends Rete.Component {
  constructor() {
    super("ArrayConcat");
    this.data.path = "Array";
    this.task = {
      outputs: {
        out0: "outputOption",
      },
    };
  }

  builder(node) {
    var inp0 = new Rete.Input("in0", "input1", this.editor.sockets.arraySocket);
    var inp1 = new Rete.Input("in1", "input2", this.editor.sockets.arraySocket);
    var out = new Rete.Output("out0", "sum", this.editor.sockets.arraySocket);

    inp0.addControl(new MyControl(this.editor, "in0", ""));
    inp1.addControl(new MyControl(this.editor, "in1", ""));

    return node.addInput(inp0).addInput(inp1).addOutput(out);
  }

  worker(node, inputs, outputs) {
    var n1 = inputs["in0"]?.length ? inputs["in0"][0] : node.data.in0;
    var n2 = inputs["in1"]?.length ? inputs["in1"][0] : node.data.in1;

    n1 = n1 ? n1 : [];
    n2 = n2 ? n2 : [];

    return { out0: [...n1, ...n2] };
  }
}
