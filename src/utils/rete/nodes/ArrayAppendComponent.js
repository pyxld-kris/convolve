import Rete from "rete";
export default class ArrayAppendComponent extends Rete.Component {
  constructor() {
    super("ArrayAppend");
    this.data.path = "Array";
    this.task = {
      outputs: {
        out0: "outputOption",
      },
    };
  }

  builder(node) {
    var inp1 = new Rete.Input(
      "in0",
      "input1",
      this.editor.sockets.anyTypeSocket
    );
    var inp2 = new Rete.Input(
      "in1",
      "input2",
      this.editor.sockets.anyTypeSocket
    );
    var out = new Rete.Output(
      "out0",
      "array",
      this.editor.sockets.anyTypeSocket
    );

    return (
      node
        .addInput(inp1)
        .addInput(inp2)
        //.addControl(new MyControl(this.editor, "preview", 0))
        .addOutput(out)
    );
  }

  worker(node, inputs, outputs) {
    var array = inputs["in0"]?.length ? inputs["in0"][0] : node.data.in0;
    var value = inputs["in1"]?.length ? inputs["in1"][0] : node.data.in1;

    console.log("array", array);

    let json;
    try {
      json = JSON.parse(array);
    } catch (e) {}
    if (json) {
      console.log("PARSED ARRAY");
      array = json;
    }

    if (!Array.isArray(array)) {
      console.log("SHOVING INTO ARRAY");
      array = [array];
    }
    array.push(value);

    return { out0: array };
  }
}
