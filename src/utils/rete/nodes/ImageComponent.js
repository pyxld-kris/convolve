import Rete from "rete";
export default class ImageComponent extends Rete.Component {
  constructor() {
    super("Image");
    this.data.path = "View";
    this.task = {
      outputs: {
        out0: "outputOption",
      },
    };
  }

  builder(node) {
    var inp1 = new Rete.Input("in0", "src", this.editor.sockets.stringSocket);
    var out = new Rete.Output(
      "out0",
      "image",
      this.editor.sockets.anyTypeSocket
    );

    return node.addInput(inp1).addOutput(out);
  }

  worker(node, inputs, outputs) {
    var src = inputs["in0"]?.length ? inputs["in0"][0] : node.data.in0;

    return { out0: <img src={src} /> };
  }
}
