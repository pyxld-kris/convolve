import Rete from "rete";
import { MyControl } from "../controls/Control.jsx";
export default class DelayComponent extends Rete.Component {
  constructor() {
    super("Delay");
    this.data.path = "";
    this.task = {
      outputs: {
        out0: "outputOption",
      },
    };
  }

  builder(node) {
    var inp0 = new Rete.Input(
      "in0",
      "delayMilliseconds",
      this.editor.sockets.anyTypeSocket
    );
    var inp1 = new Rete.Input(
      "in1",
      "dataToPassThrough",
      this.editor.sockets.anyTypeSocket
    );
    var out = new Rete.Output(
      "out0",
      "data",
      this.editor.sockets.anyTypeSocket
    );

    inp0.addControl(new MyControl(this.editor, "in0"));

    return node.addInput(inp0).addInput(inp1).addOutput(out);
  }

  async worker(node, inputs, outputs) {
    var delayMilliseconds = inputs["in0"]?.length
      ? inputs["in0"][0]
      : node.data.in0;
    var dataToPassThrough = inputs["in1"]?.length
      ? inputs["in1"][0]
      : node.data.in1;

    await new Promise((res) => setTimeout(res, delayMilliseconds));
    //await new Promise(r => setTimeout(r, 2000));

    console.log("delayed");

    return { out0: dataToPassThrough };
  }
}
