import Rete from "rete";
import { MyControl } from "../controls/Control.jsx";
import { anyTypeSocket } from "../sockets";
export default class OutputComponent extends Rete.Component {
  constructor() {
    super("Output");
    this.data.path = "Module";
    this.module = {
      nodeType: "output",
      socket: anyTypeSocket,
    };
    this.task = {
      outputs: {
        out0: "outputOption",
      },
    };
  }

  builder(node) {
    var inp = new Rete.Input("input", "Number", anyTypeSocket);
    //var ctrl = new TextControl(this.editor, 'name');
    var ctrl = new MyControl(this.editor, "name");

    return node.addControl(ctrl).addInput(inp);
  }
}
