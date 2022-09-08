import Rete from "rete";
import { MyControl } from "../controls/Control.jsx";
import { SelectControl } from "../controls/SelectControl.jsx";

import { hasInput, hasOutput } from "../utils/moduleClassifier";

import graphModules from "../../../content/graphModules.js";

export default class ModuleComponent extends Rete.Component {
  constructor() {
    super("Module");
    this.data.path = "Module";
    this.module = {
      nodeType: "module",
    };
    this.task = {
      outputs: {
        out0: "outputOption",
      },
    };
  }

  builder(node) {
    console.log("builder");
    //var ctrl = new TextControl(this.editor, 'module');

    let ioModules = Object.keys(graphModules).reduce((acc, curKey) => {
      if (
        hasInput(graphModules[curKey].data) ||
        hasOutput(graphModules[curKey].data)
      )
        acc.push(curKey);
      return acc;
    }, []);

    let selectValues = ioModules;
    var ctrl = new SelectControl(
      this.editor,
      "module",
      "Module Name",
      this,
      selectValues
    );
    ctrl.on("change", () => {
      console.log("control change");
      this.updateModuleSockets(node);

      // console.log(node);
      node.inputs.forEach((input) => {
        // Add a control to each input
        input.addControl(new MyControl(this.editor, input.key, input.key));
      });
    });

    //ctrl.onChange = () => {
    ctrl.emitter.on("process", () => {
      console.log("builder change");
      console.log(this);
      //this.updateModuleSockets(node);
      //node._alight.scan();
    });

    console.log(node);

    node.inputs.forEach((input) => {
      // Add a control to each input
      input.addControl(new MyControl(this.editor, input.key, input.key));
    });

    return node.addControl(ctrl);
  }

  change(node, item) {
    console.log("node change");
    node.data.module = item;
    //this.editor.trigger("process");
  }
}
