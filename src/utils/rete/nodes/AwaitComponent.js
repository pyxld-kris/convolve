import Rete from "rete";
export default class AwaitComponent extends Rete.Component {
  constructor() {
    super("Await");
    this.data.path = "Util";
    this.task = {
      outputs: {
        out0: "outputOption",
      },
    };
  }

  builder(node) {
    var inp0 = new Rete.Input(
      "in0",
      "awaitSignal",
      this.editor.sockets.anyTypeSocket
    );
    var inp1 = new Rete.Input(
      "in1",
      "dataToPassThrough",
      this.editor.sockets.anyTypeSocket
    );
    var out = new Rete.Output(
      "out0",
      "length",
      this.editor.sockets.anyTypeSocket
    );

    return node.addInput(inp0).addInput(inp1).addOutput(out);
  }

  worker(node, inputs, outputs) {
    var dataToPassThrough = inputs["in1"]?.length
      ? inputs["in1"][0]
      : node.data.in1;

    return { out0: dataToPassThrough };
  }
}
