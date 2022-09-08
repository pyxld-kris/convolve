import { Module } from "./module";
import { extractNodes } from "./utils";

export class ModuleManager {
  constructor(modules) {
    this.engine = null;
    this.modules = modules;
    this.inputs = new Map();
    this.outputs = new Map();

    // Added by Kris
    this.data = {};
  }

  getInputs(data) {
    return extractNodes(data.nodes, this.inputs).map((node) => ({
      name: node.data.name,
      socket: this.socketFactory(node, this.inputs.get(node.name)),
    }));
  }

  getOutputs(data) {
    return extractNodes(data.nodes, this.outputs).map((node) => ({
      name: node.data.name,
      socket: this.socketFactory(node, this.outputs.get(node.name)),
    }));
  }

  socketFactory(node, socket) {
    socket = typeof socket === "function" ? socket(node) : socket;

    if (!socket)
      throw new Error(
        `Socket not found for node with id = ${node.id} in the module`
      );

    return socket;
  }

  registerInput(name, socket) {
    this.inputs.set(name, socket);
  }

  registerOutput(name, socket) {
    this.outputs.set(name, socket);
  }

  async workerModule(node, inputs, outputs, args) {
    //console.log("workerModule", node);
    //console.log("workerModule inputs", inputs);
    if (!node.data.module) return;
    if (!this.modules[node.data.module]) return;

    const data = structuredClone(this.modules[node.data.module].data);
    const module = new Module();
    const engine = this.engine.clone();

    // If there is data inside of the 'data' property of this node, it's been set by a control on the node itself (as opposed to a node input connected via a socket)
    // If so, emulate an input for each such data
    // Object.keys(inputs).forEach((inputKey) => {
    //   if (node.data[inputKey] && inputs[inputKey].length == 0) {
    //     inputs[inputKey] = [
    //       {
    //         key: "out0",
    //         type: "outputOption",
    //         task: {
    //           outputData: {
    //             out0: node.data[inputKey],
    //           },
    //           worker: () => {
    //             return { out0: node.data[inputKey] };
    //           },
    //           workerRan: true,
    //           allInputsPopulated: true,
    //           numOutputOptionsUntilTrigger: 0,
    //         },
    //       },
    //     ];
    //   }
    // });

    // Loop through all nodes in 'data.nodes'. Inject necessary data from this module-node's Controls
    Object.values(data.nodes).forEach((dataNode) => {
      let nodeId = dataNode.id;
      let nodeInputs = dataNode.inputs;
      Object.keys(nodeInputs).forEach((nodeInputKey) => {
        let nodeInput = nodeInputs[nodeInputKey];
        let connections = nodeInput.connections;
        connections.forEach((connection) => {
          let connectedNodeId = connection.node;
          let connectedNode = data.nodes[connectedNodeId];
          if (connectedNode.name == "Input") {
            // This node is connected to an input
            // Do we need to inject data?
            console.log(
              "Injecting",
              node.data[connectedNode.data.name],
              " into key",
              nodeInputKey,
              " at node id#",
              nodeId
            );
            dataNode.data[nodeInputKey] = node.data[connectedNode.data.name];
          }
        });
      });
    });
    console.log("workerModule data", data, node.data);

    module.data = node.data;
    module.read(inputs);
    //console.log("workerModule module", module);
    await engine.process(
      data,
      null,
      Object.assign({}, args, { module, silent: true })
    );
    //console.log("workerModule module", module);
    module.write(outputs);
  }

  workerInputs(node, inputs, outputs, { module } = {}) {
    if (!module) return;

    outputs["output"] = (module.getInput(node.data.name) || [])[0];

    console.log("workerInputs outputs[output]", outputs["output"]);
  }

  workerOutputs(node, inputs, outputs, { module } = {}) {
    if (!module) return;

    module.setOutput(node.data.name, inputs["input"][0]);
  }

  setEngine(engine) {
    this.engine = engine;
  }
}
