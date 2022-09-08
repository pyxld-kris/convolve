import Rete from "rete";
export default class ArrayLengthComponent extends Rete.Component {
  constructor() {
    super("ArrayLength");
    this.data.path = "Array";
    this.task = {
      outputs: {
        out0: "outputOption",
      },
    };
  }

  builder(node) {
    var inp1 = new Rete.Input("in0", "array", this.editor.sockets.arraySocket);
    var out = new Rete.Output("out0", "length", this.editor.sockets.numSocket);

    return node.addInput(inp1).addOutput(out);
  }

  worker(node, inputs, outputs) {
    var array = inputs["in0"]?.length ? inputs["in0"][0] : node.data.in0;

    return { out0: array.length };
  }
}
