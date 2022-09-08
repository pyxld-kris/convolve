import Rete from "rete";
import { MyControl } from "../controls/Control.jsx";
export default class RandIntComponent extends Rete.Component {
  constructor() {
    super("RandInt");
    this.data.path = "Number";
    this.task = {
      outputs: {
        out0: "outputOption",
      },
    };
  }

  builder(node) {
    var inp1 = new Rete.Input("in0", "min", this.editor.sockets.numSocket);
    var inp2 = new Rete.Input("in1", "max", this.editor.sockets.numSocket);
    var out0 = new Rete.Output("out0", "Number", this.editor.sockets.numSocket);

    inp1.addControl(new MyControl(this.editor, "in0", "Min"));
    inp2.addControl(new MyControl(this.editor, "in1", "Max"));

    return node.addInput(inp1).addInput(inp2).addOutput(out0);
    //.addControl(new MyControl(this.editor, "preview", ""));
  }

  worker(node, inputs, outputs) {
    let min = parseInt(
      inputs["in0"]?.length ? inputs["in0"][0] : node.data.in0
    );
    let max = parseInt(
      inputs["in1"]?.length ? inputs["in1"][0] : node.data.in1
    );
    let randNum = min + parseInt(Math.random() * (max - min));

    //let preview = this.editor.nodes.find((n) => n.id == node.id);
    //if (preview) preview.controls?.get("preview").setValue(randNum);

    return { out0: randNum };
  }
}
