import Rete from "rete";
export default class GeolocationComponent extends Rete.Component {
  constructor() {
    super("Geolocation");
    this.data.path = "Util";
    this.task = {
      outputs: {
        lat: "outputOption",
        long: "outputOption",
      },
    };
  }

  builder(node) {
    var inp0 = new Rete.Input(
      "inputSignal",
      "Input Signal",
      this.editor.sockets.anyTypeSocket
    );

    var latOut = new Rete.Output(
      "lat",
      "latitude",
      this.editor.sockets.numSocket
    );
    var longOut = new Rete.Output(
      "long",
      "longitude",
      this.editor.sockets.numSocket
    );

    return node.addInput(inp0).addOutput(latOut).addOutput(longOut);
  }

  async worker(node, inputs, outputs = {}) {
    var inputSignal = inputs["inputSignal"]?.length
      ? inputs["inputSignal"][0]
      : node.data.inputSignal;

    let position = await new Promise((res) => {
      navigator.geolocation.getCurrentPosition((position) => {
        res(position);
      });
    });

    return { lat: position.coords.latitude, long: position.coords.longitude };
  }
}
