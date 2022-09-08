import Rete from "rete";
import { MyControl } from "../controls/Control.jsx";
export default class LocalCacheGetComponent extends Rete.Component {
  constructor() {
    super("LocalCacheGet");
    this.data.path = "Data";
    this.task = {
      outputs: {
        out0: "outputOption",
      },
    };
  }

  builder(node) {
    var inp0 = new Rete.Input("in0", "key", this.editor.sockets.anyTypeSocket);
    var out0 = new Rete.Output(
      "out0",
      "value",
      this.editor.sockets.anyTypeSocket
    );

    inp0.addControl(new MyControl(this.editor, "in0", "Key"));

    return node.addInput(inp0).addOutput(out0);
  }

  worker(node, inputs, outputs) {
    var key = inputs["in0"]?.length ? inputs["in0"][0] : node.data["in0"];

    let value = localStorage[key];

    let json;
    try {
      json = JSON.parse(value);
    } catch (e) {}
    if (json) {
      console.log("Parsed JSON");
      value = json;
    }

    console.log(value);

    return { out0: value };
  }
}
