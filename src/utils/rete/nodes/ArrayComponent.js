import Rete from "rete";
export default class ArrayComponent extends Rete.Component {
  constructor() {
    super("Array");
    this.data.path = "Array";
    this.task = {
      outputs: {
        out0: "outputOption",
      },
    };
  }

  builder(node) {
    var inp0 = new Rete.Input(
      "in0",
      "element0",
      this.editor.sockets.anyTypeSocket
    );
    var inp1 = new Rete.Input(
      "in1",
      "element1",
      this.editor.sockets.anyTypeSocket
    );
    var out = new Rete.Output("out0", "array", this.editor.sockets.arraySocket);

    return node.addInput(inp0).addInput(inp1).addOutput(out);
  }

  worker(node, inputs, outputs) {
    var in0 = inputs["in0"]?.length ? inputs["in0"][0] : node.data.in0;
    var in1 = inputs["in1"]?.length ? inputs["in1"][0] : node.data.in1;

    let array = [];
    if (in0 != undefined) array.push(in0);
    if (in1 != undefined) array.push(in1);

    //console.log(array);

    return { out0: array };
  }
}
