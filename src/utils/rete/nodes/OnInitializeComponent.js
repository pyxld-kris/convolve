import Rete from "rete";
import { initializeTasks } from "../editor";

export default class OnInitializeComponent extends Rete.Component {
  constructor() {
    super("OnInitialize");
    this.data.path = "Event";
    this.task = {
      outputs: {
        action: "option",
      },
      init: function (task) {
        // сalled when initializing all tasks (at the engine.process())
        initializeTasks.push(task);
      },
    };
  }

  builder(node) {
    var out = new Rete.Output(
      "action",
      "initializeAction",
      this.editor.sockets.anyTypeSocket
    );

    return node.addOutput(out);
  }

  worker(node, inputs, outputs) {
    console.log("Component: Start");
    //return outputs;
  }
}
