import Rete from "rete";
export default class EscapeStringComponent extends Rete.Component {
  constructor() {
    super("EscapeString");
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

    var out = new Rete.Output(
      "out0",
      "escapedString",
      this.editor.sockets.stringSocket
    );

    return node.addInput(inp0).addOutput(out);
  }

  async worker(node, inputs, outputs = {}) {
    var string = inputs["in0"]?.length ? inputs["in0"][0] : node.data.in0;
    string = string
      .replace(/[\\]/g, "\\\\")
      .replace(/[\"]/g, '\\"')
      .replace(/[\/]/g, "\\/")
      .replace(/[\b]/g, "\\b")
      .replace(/[\f]/g, "\\f")
      .replace(/[\n]/g, "\\n")
      .replace(/[\r]/g, "\\r")
      .replace(/[\t]/g, "\\t");

    return { out0: string };
  }
}
