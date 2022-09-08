import Rete from "rete";
import { MyControl } from "../controls/Control.jsx";
export default class GetArrayElementComponent extends Rete.Component {
  constructor() {
    super("GetArrayElement");
    this.data.path = "Array";
    this.task = {
      outputs: {
        out0: "outputOption",
      },
    };
  }

  builder(node) {
    var inp1 = new Rete.Input("in0", "array", this.editor.sockets.arraySocket);
    var inp2 = new Rete.Input("in1", "index", this.editor.sockets.numSocket);
    var out = new Rete.Output(
      "out0",
      "element",
      this.editor.sockets.anyTypeSocket
    );

    //inp1.addControl(new MyControl(this.editor, 'in0', "String"))
    inp2.addControl(new MyControl(this.editor, "in1", "Index"));
    //var ctrl = new MyControl(this.editor, "greeting", "#username");

    return node.addInput(inp1).addInput(inp2).addOutput(out);
  }

  worker(node, inputs, outputs) {
    var array = inputs["in0"]?.length ? inputs["in0"][0] : node.data.in0;
    var index = parseInt(
      inputs["in1"]?.length ? inputs["in1"][0] : node.data.in1
    );

    //if (!array[index]) array = JSON.parse(array);
    if (typeof array === "string") array = JSON.parse(array);

    return { out0: array[index] };
  }
}
