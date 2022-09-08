import Rete from "rete";
import { MyControl } from "../controls/Control.jsx";
import { anyTypeSocket } from "../sockets";
export default class InputComponent extends Rete.Component {
  constructor() {
    super("Input");
    this.data.path = "Module";
    this.module = {
      nodeType: "input",
      socket: anyTypeSocket,
    };
    this.task = {
      outputs: {
        out0: "outputOption",
      },
    };
  }

  builder(node) {
    var out1 = new Rete.Output(
      "output",
      "Number",
      this.editor.sockets.anyTypeSocket
    );
    //var ctrl = new TextControl(this.editor, 'name');
    var ctrl = new MyControl(this.editor, "name");

    return node.addControl(ctrl).addOutput(out1);
  }
}
