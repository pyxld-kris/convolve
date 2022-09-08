import Rete from "rete";
export default class IfComponent extends Rete.Component {
  constructor() {
    super("If");
    this.data.path = "Conditional";
    this.task = {
      outputs: {
        out0: "outputOption",
      },
    };
  }

  builder(node) {
    var inp0 = new Rete.Input(
      "in0",
      "condition",
      this.editor.sockets.booleanSocket
    );
    var inp1 = new Rete.Input(
      "in1",
      "trueData",
      this.editor.sockets.anyTypeSocket
    );
    var inp2 = new Rete.Input(
      "in2",
      "falseData",
      this.editor.sockets.anyTypeSocket
    );
    var out0 = new Rete.Output(
      "out0",
      "data",
      this.editor.sockets.anyTypeSocket
    );

    //inp1.addControl(new MyControl(this.editor, "in0", "String"));
    //inp2.addControl(new MyControl(this.editor, "in1", "Split On"));
    //var ctrl = new MyControl(this.editor, "greeting", "#username");

    return node.addInput(inp0).addInput(inp1).addInput(inp2).addOutput(out0);
  }

  worker(node, inputs, outputs) {
    let condition = inputs["in0"]?.length ? inputs["in0"][0] : node.data.in0;
    let trueData = inputs["in1"]?.length ? inputs["in1"][0] : node.data.in1;
    let falseData = inputs["in2"]?.length ? inputs["in2"][0] : node.data.in2;

    return {
      out0: condition ? trueData : falseData,
    };
  }
}
