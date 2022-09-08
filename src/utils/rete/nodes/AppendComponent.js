import Rete from "rete";
import { MyControl } from "../controls/Control.jsx";
export default class AppendComponent extends Rete.Component {
  constructor() {
    super("Append");
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
      "input1",
      this.editor.sockets.anyTypeSocket
    );
    var inp2 = new Rete.Input(
      "in1",
      "input2",
      this.editor.sockets.anyTypeSocket
    );
    var out = new Rete.Output("out0", "sum", this.editor.sockets.anyTypeSocket);

    inp1.addControl(new MyControl(this.editor, "in0", ""));
    inp2.addControl(new MyControl(this.editor, "in1", ""));
    //var ctrl = new MyControl(this.editor, "greeting", "#username");

    return (
      node
        .addInput(inp1)
        .addInput(inp2)
        //.addControl(new MyControl(this.editor, "preview", 0))
        .addOutput(out)
    );
  }

  worker(node, inputs, outputs) {
    console.log("Append node", node);
    console.log("Append inputs", inputs);
    var n1 = inputs["in0"]?.length ? inputs["in0"][0] : node.data.in0;
    var n2 = inputs["in1"]?.length ? inputs["in1"][0] : node.data.in1;
    var sum = n1 + n2;

    return { out0: sum };
  }
}
