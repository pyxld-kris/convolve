import Rete from "rete";
export default class StringTrimComponent extends Rete.Component {
  constructor() {
    super("StringTrim");
    this.data.path = "String";
    this.task = {
      outputs: {
        out0: "outputOption",
      },
    };
  }

  builder(node) {
    var inp1 = new Rete.Input(
      "in0",
      "string",
      this.editor.sockets.stringSocket
    );
    var out = new Rete.Output(
      "out0",
      "trimmed",
      this.editor.sockets.stringSocket
    );

    return node.addInput(inp1).addOutput(out);
  }

  worker(node, inputs, outputs) {
    var string = inputs["in0"]?.length ? inputs["in0"][0] : node.data.in0;

    return { out0: string?.trim() };
  }
}
