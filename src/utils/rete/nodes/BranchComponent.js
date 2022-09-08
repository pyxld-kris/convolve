import Rete from "rete";
export default class BranchComponent extends Rete.Component {
  constructor() {
    super("Branch");
    this.data.path = "Conditional";
    this.task = {
      outputs: {
        outTrue: "outputOption",
        outFalse: "outputOption",
      },

      // Mark certain inputs to not back propegate unless it's required by outputs that aren't closed inside of worker()
      optionalInputs: {
        trueData: ["outTrue"],
        falseData: ["outFalse"],
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
      "trueData",
      "trueData",
      this.editor.sockets.anyTypeSocket
    );
    var inp2 = new Rete.Input(
      "falseData",
      "falseData",
      this.editor.sockets.anyTypeSocket
    );
    var outTrue = new Rete.Output(
      "outTrue",
      "ifTrue",
      this.editor.sockets.anyTypeSocket
    );
    var outFalse = new Rete.Output(
      "outFalse",
      "ifFalse",
      this.editor.sockets.anyTypeSocket
    );

    //inp1.addControl(new MyControl(this.editor, "in0", "String"));
    //inp2.addControl(new MyControl(this.editor, "in1", "Split On"));
    //var ctrl = new MyControl(this.editor, "greeting", "#username");

    return node
      .addInput(inp0)
      .addInput(inp1)
      .addInput(inp2)
      .addOutput(outTrue)
      .addOutput(outFalse);
  }

  worker(node, inputs, outputs) {
    //console.log("BRANCH WORKER RAN");
    let condition = inputs["in0"]?.length ? inputs["in0"][0] : node.data.in0;
    let trueData = inputs["trueData"]?.length
      ? inputs["trueData"][0]
      : node.data.trueData;
    let falseData = inputs["falseData"]?.length
      ? inputs["falseData"][0]
      : node.data.falseData;

    let returnObject = {};
    if (condition) {
      returnObject = {
        outTrue: trueData,
      };
      this.closed = ["outFalse"];
    } else {
      returnObject = {
        outFalse: falseData,
      };
      this.closed = ["outTrue"];
    }

    return returnObject;
  }
}

/*
import Rete from "rete";;

export default class BranchComponent extends Rete.Component {
  constructor() {
    super("Branch");
    this.data.path = "Conditional";
    this.task = {
      outputs: {
        outTrue: "outputOption",
        outFalse: "outputOption",
      },
    };
  }

  builder(node) {
    var inp1 = new Rete.Input("in0", "data", this.editor.sockets.anyTypeSocket);
    var inp2 = new Rete.Input(
      "in1",
      "condition",
      this.editor.sockets.booleanSocket
    );
    var outTrue = new Rete.Output(
      "outTrue",
      "ifTrue",
      this.editor.sockets.anyTypeSocket
    );
    var outFalse = new Rete.Output(
      "outFalse",
      "ifFalse",
      this.editor.sockets.anyTypeSocket
    );

    //inp1.addControl(new MyControl(this.editor, "in0", "String"));
    //inp2.addControl(new MyControl(this.editor, "in1", "Split On"));
    //var ctrl = new MyControl(this.editor, "greeting", "#username");

    return node
      .addInput(inp1)
      .addInput(inp2)
      .addOutput(outTrue)
      .addOutput(outFalse);
  }

  worker(node, inputs, outputs) {
    console.log("BRANCH WORKER RAN");
    let data = inputs["in0"]?.length ? inputs["in0"][0] : node.data.in0;
    let condition = inputs["in1"]?.length ? inputs["in1"][0] : node.data.in1;

    let returnObject = {};
    if (condition) {
      returnObject = {
        outTrue: data,
      };
      this.closed = ["outFalse"];
    } else {
      returnObject = {
        outFalse: data,
      };
      this.closed = ["outTrue"];
    }

    return returnObject;
  }
}

*/
