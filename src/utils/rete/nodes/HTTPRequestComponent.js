import axios from "axios";
import Rete from "rete";
import { MyControl } from "../controls/Control.jsx";

export default class HTTPRequestComponent extends Rete.Component {
  constructor() {
    super("HTTPRequest");
    this.data.path = "Util";
    this.task = {
      outputs: {
        out0: "outputOption",
      },
    };
  }

  builder(node) {
    // url
    // method
    //

    var inp0 = new Rete.Input("in0", "url", this.editor.sockets.stringSocket);
    var inp1 = new Rete.Input(
      "in1",
      "method",
      this.editor.sockets.stringSocket
    );
    var inp2 = new Rete.Input("in2", "data", this.editor.sockets.anyTypeSocket);

    var out = new Rete.Output(
      "out0",
      "queryResult",
      this.editor.sockets.anyTypeSocket
    );

    inp0.addControl(new MyControl(this.editor, "in0", "URL"));
    inp1.addControl(new MyControl(this.editor, "in1", "Method"));
    inp2.addControl(new MyControl(this.editor, "in2", "Data"));

    return node.addInput(inp0).addInput(inp1).addInput(inp2).addOutput(out);
  }

  async worker(node, inputs, outputs = {}) {
    var url = inputs["in0"]?.length ? inputs["in0"][0] : node.data.in0;
    var method = inputs["in1"]?.length ? inputs["in1"][0] : node.data.in1;
    var data = inputs["in2"]?.length ? inputs["in2"][0] : node.data.in2;

    // let result = await axios.get({
    //   url: url,
    //   method: method,
    //   data: data,
    // });

    let result;
    try {
      if (method == "POST") {
        //console.log(data);
        if (typeof data === "string") data = JSON.parse(data);
        result = await axios.post("http://localhost:5001", data, {
          headers: {
            "Target-URL": url,
            "Connection-Override": "keep-alive",
            //"Origin-Override": "https://hf.space",
            //"Referer-Override": "https://hf.space",
          },
        });
      } else {
        result = await axios.get(
          "http://localhost:5001" + "?rand=" + Math.random(),
          {
            params: {},
            headers: {
              "Target-URL": url,
            },
          }
        );

        if (typeof result === "string") result = JSON.stringify(result);
        if (result.data) result = result.data;
      }
    } catch (e) {
      result = "";
    }

    //if (result.data) result = result.data;

    //console.log(result);
    //alert(result);

    outputs["out0"] = result;

    return { out0: result };
  }
}
