import Rete from "rete";
import { MyControl } from "../controls/Control.jsx";
export default class OnIntervalComponent extends Rete.Component {
  constructor() {
    super("OnInterval");
    this.data.path = "Event";
    this.task = {
      outputs: {
        action: "option",
      },
      init: function (task, node) {
        setInterval(
          () => {
            task.clearNodeData();
            task.run();
          },
          node.data["in0"] ? node.data["in0"] : 0
        );
      },
    };
  }

  builder(node) {
    var inp0 = new Rete.Input(
      "in0",
      "milliseconds",
      this.editor.sockets.anyTypeSocket
    );
    var out = new Rete.Output(
      "action",
      "intervalAction",
      this.editor.sockets.anyTypeSocket
    );

    inp0.addControl(new MyControl(this.editor, "in0", "milliseconds"));

    return node.addInput(inp0).addOutput(out);
  }

  worker(node, inputs, outputs) {
    //console.log("Component: Start");
    //return outputs;
  }
}
