import Rete from "rete";
export default class SequenceBranchComponent extends Rete.Component {
  constructor() {
    super("SequenceBranch");
    this.task = {
      outputs: {
        first: "option",
        second: "option",
      },
    };
  }

  builder(node) {
    var inp0 = new Rete.Input(
      "in0",
      "input0",
      this.editor.sockets.anyTypeSocket
    );
    var first = new Rete.Output(
      "first",
      "First",
      this.editor.sockets.anyTypeSocket
    );
    var second = new Rete.Output(
      "second",
      "Second",
      this.editor.sockets.anyTypeSocket
    );

    return node.addInput(inp0).addOutput(first).addOutput(second);
  }

  worker(node, inputs, outputs) {
    //if (inputs['key'][0] == 13)
    this.closed = ["first"];
    //else
    // this.closed = ['out1'];

    //console.log('Print', node.id, inputs);
    /*
        outputs['out0'] = null;
        outputs['out1'] = null;
        */
    return outputs;
  }
}
