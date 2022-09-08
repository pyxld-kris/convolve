import Rete from "rete";
import { MyControl } from "../controls/Control.jsx";
export default class StringReplaceComponent extends Rete.Component {
  constructor() {
    super("StringReplace");
    this.data.path = "String";
    this.task = {
      outputs: {
        out0: "outputOption",
      },
    };
  }

  builder(node) {
    var inp0 = new Rete.Input(
      "in0",
      "string",
      this.editor.sockets.stringSocket
    );
    var inp1 = new Rete.Input("in1", "find", this.editor.sockets.stringSocket);
    var inp2 = new Rete.Input(
      "in2",
      "replaceWith",
      this.editor.sockets.anyTypeSocket
    );
    var out = new Rete.Output(
      "out0",
      "stringResult",
      this.editor.sockets.stringSocket
    );

    inp0.addControl(new MyControl(this.editor, "in0", "String"));
    inp1.addControl(new MyControl(this.editor, "in1", "Find"));
    inp2.addControl(new MyControl(this.editor, "in2", "Replace With"));
    //var ctrl = new MyControl(this.editor, "greeting", "#username");

    return node.addInput(inp0).addInput(inp1).addInput(inp2).addOutput(out);
  }

  worker(node, inputs, outputs) {
    var string = inputs["in0"]?.length ? inputs["in0"][0] : node.data.in0;
    var find = inputs["in1"]?.length ? inputs["in1"][0] : node.data.in1;
    var replaceWith = inputs["in2"]?.length ? inputs["in2"][0] : node.data.in2;

    if (find == "Find") find = null;
    if (replaceWith == "Replace With") replaceWith = null;

    return {
      out0: replaceWith && find ? string.replaceAll(find, replaceWith) : string,
    };
  }
}
