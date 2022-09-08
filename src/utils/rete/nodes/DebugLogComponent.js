import Rete from "rete";
import { MyControl } from "../controls/Control.jsx";
export default class DebugLogComponent extends Rete.Component {
  constructor() {
    super("DebugLog");
    this.data.path = "View";
    this.task = {
      outputs: {},
    };
  }

  builder(node) {
    var inp1 = new Rete.Input(
      "in0",
      "input1",
      this.editor.sockets.anyTypeSocket
    );

    inp1.addControl(new MyControl(this.editor, "in0"));

    return node.addInput(inp1);
  }

  worker(node, inputs, outputs) {
    var displayString = inputs["in0"]?.length
      ? inputs["in0"][0]
      : node.data.in0;

    console.log(displayString);
  }
}
