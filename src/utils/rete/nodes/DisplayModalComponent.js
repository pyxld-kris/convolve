import Rete from "rete";
import { openGlobalModal } from "../../../components/modules/GlobalModal/GlobalModal.js";
import { MyControl } from "../controls/Control.jsx";

export default class DisplayModalComponent extends Rete.Component {
  constructor() {
    super("DisplayModal");
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

    openGlobalModal(displayString);
  }
}
