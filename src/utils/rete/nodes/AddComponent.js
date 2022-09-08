import Rete from "rete";
import { MyControl } from "../controls/Control.jsx";
export default class AddComponent extends Rete.Component {
  constructor() {
    super("Add");
    this.data.path = "Number";
    this.task = {
      outputs: {
        out0: "outputOption",
      },
    };
  }

  builder(node) {
    var inp1 = new Rete.Input("in0", "input1", this.editor.sockets.numSocket);
    var inp2 = new Rete.Input("in1", "input2", this.editor.sockets.numSocket);
    var out = new Rete.Output("out0", "sum", this.editor.sockets.numSocket);

    inp1.addControl(new MyControl(this.editor, "in0"));
    inp2.addControl(new MyControl(this.editor, "in1"));
    //var ctrl = new MyControl(this.editor, "greeting", "#username");

    return node
      .addInput(inp1)
      .addInput(inp2)
      .addControl(new MyControl(this.editor, "preview", 0))
      .addOutput(out);
  }

  worker(node, inputs, outputs) {
    console.log(this);

    var n1 = parseInt(inputs["in0"]?.length ? inputs["in0"][0] : node.data.in0);
    var n2 = parseInt(inputs["in1"]?.length ? inputs["in1"][0] : node.data.in1);
    console.log(n1, n2);
    var sum = n1 + n2;

    this.editor.nodes
      .find((n) => n.id == node.id)
      ?.controls.get("preview")
      ?.setValue(sum);
    console.log(sum);
    return { out0: sum };
  }
}
