import Rete from "rete";
import { MyControl } from "../controls/Control.jsx";
export default class GetJSONValueComponent extends Rete.Component {
  constructor() {
    super("GetJSONValueComponent");
    this.data.path = "Util";
    this.task = {
      outputs: {
        out0: "outputOption",
      },
    };
  }

  builder(node) {
    var inp1 = new Rete.Input("in0", "json", this.editor.sockets.anyTypeSocket);
    var inp2 = new Rete.Input("in1", "key", this.editor.sockets.anyTypeSocket);
    var out = new Rete.Output(
      "out0",
      "value",
      this.editor.sockets.anyTypeSocket
    );

    inp1.addControl(new MyControl(this.editor, "in0", "JSON"));
    inp2.addControl(new MyControl(this.editor, "in1", "Key"));
    //var ctrl = new MyControl(this.editor, "greeting", "#username");

    return node.addInput(inp1).addInput(inp2).addOutput(out);
  }

  worker(node, inputs, outputs) {
    var json = inputs["in0"]?.length ? inputs["in0"][0] : node.data.in0;
    var key = inputs["in1"]?.length ? inputs["in1"][0] : node.data.in1;

    try {
      json = JSON.parse(json);
    } catch (e) {}

    let outputValue = json[key];
    if (!outputValue) outputValue = JSON.stringify(json[key]);
    if (!outputValue) outputValue = " ";

    return { out0: outputValue };
  }
}
