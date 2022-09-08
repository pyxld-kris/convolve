// TODO: May not need numOutputOptionsUntilTrigger. Check

export class Task {
  constructor(inputs, component, worker) {
    this.inputs = inputs;
    this.component = component;
    this.worker = worker;
    this.next = [];
    this.inputData = {};
    this.outputData = null;
    this.closed = [];
    this.numOutputOptionsUntilTrigger = 0;
    this.workerRan = false;
    this.allInputsPopulated = false;

    this.editor = component.editor;

    this.initOutputOptionsUntilTrigger();

    //console.log(this);
  }

  initOutputOptionsUntilTrigger() {
    let optionInputs = [
      ...this.getInputs("option"),
      ...this.getInputs("outputOption"),
    ];
    optionInputs.forEach((key, index) => {
      //console.log(this.inputs[key])
      this.inputs[key].forEach((con) => {
        con.task.next.push({
          key: con.key,
          task: this,
          connectionType: con.type,
        });
        if (con.type == "option" || con.type == "outputOption") {
          //console.log(con.type);
          this.numOutputOptionsUntilTrigger++;
          //console.log(this.numOutputOptionsUntilTrigger);
        }
      });
    });
  }

  getInputs(type) {
    return Object.keys(this.inputs)
      .filter((key) => this.inputs[key][0])
      .filter((key) => this.inputs[key][0].type === type);
  }

  reset() {
    this.outputData = null;
  }

  async checkInputs(data, garbage) {
    // Loop through any optional inputs and prevent them from firing prematurely
    let optionalInputKeys = [];
    let optionalInputOutputKeys = [];
    if (this.component.task.optionalInputs) {
      Object.keys(this.component.task.optionalInputs).forEach(
        (optionalInputKey) => {
          if (optionalInputKeys.indexOf(optionalInputKey) == -1) {
            optionalInputKeys.push(optionalInputKey);
            this.numOutputOptionsUntilTrigger--;
          }
        }
      );
    }

    // console.log("IN INPUT CHECK");
    await Promise.all(
      this.getInputs("option").map(async (key) => {
        //console.log("key", key);
        await Promise.all(
          this.inputs[key].map(async (con) => {
            if (con) {
              //console.log(con);
              // console.log("subtracting option", this);
              // this.numOutputOptionsUntilTrigger--;
              //console.log(optionalInputKeys, key);
              if (
                con.task.workerRan == false &&
                optionalInputKeys.indexOf(key) == -1
              )
                await con.task.run(data, false, garbage, true, true, this);
            }
          })
        );
      })
    );
    await Promise.all(
      [...this.getInputs("output"), ...this.getInputs("outputOption")].map(
        async (key) => {
          //console.log("key", key);
          // console.log("found output input");
          this.inputData[key] = await Promise.all(
            this.inputs[key].map(async (con) => {
              // console.log("checking input");
              if (con) {
                //console.log(con);
                //console.log(optionalInputKeys, key);
                // if (con.type == 'outputOption') {
                //     console.log("subtracting outputOption", this);
                //     this.numOutputOptionsUntilTrigger--;
                // }
                // console.log("numOutputOptionsUntilTrigger", this.numOutputOptionsUntilTrigger);
                if (
                  con.task.workerRan == false &&
                  optionalInputKeys.indexOf(key) == -1
                )
                  await con.task.run(data, false, garbage, true, true, this);
                if (con.task.outputData) return con.task.outputData[con.key];
              }
            })
          );
        }
      )
    );

    // Check if all of the inputs of this node have now been populated (ready to run?)
    if (this.inputData.length == this.inputs.length) {
      let allInputsPopulated = true;
      Object.keys(this.inputData).forEach((inputDataKey) => {
        //console.log(inputDataKey);
        let input = this.inputs[inputDataKey][0];
        let inputDataArray = this.inputData[inputDataKey];
        let inputTask = input.task;
        inputDataArray.forEach((inputData) => {
          //console.log(inputData, optionalInputKeys, inputDataKey);
          if (
            inputData === undefined &&
            inputTask.closed.indexOf(input.key) == -1 &&
            optionalInputKeys.indexOf(inputDataKey) == -1
          ) {
            allInputsPopulated = false;
          }
        });
      });
      this.allInputsPopulated = allInputsPopulated;
    }
  }

  clearNodeData(caller = null) {
    //alert("clearing " + this.component.name);
    //console.log("CLR: clearing", this, caller);
    if (this.workerRan) {
      //console.log("CLR: clearing worker ran!!!");
      this.inputData = {};
      this.outputData = null;
      this.closed = [];
      this.numOutputOptionsUntilTrigger = 0;
      this.workerRan = false;
      this.allInputsPopulated = false;

      //this.initOutputOptionsUntilTrigger();

      // Clear backward nodes recursively
      //console.log("CLR: inputs", this.inputs);
      //console.log("CLR: next", this.next);
      Object.values(this.inputs).forEach((input) => {
        let node = input[0];
        //console.log("CLR: input node", node);
        if (node) {
          //console.log("CLR: input node name", node.task.component.name);
          //alert("moving backward to " + node.task.component.name);
        }
        if (node) if (node.task != caller) node.task.clearNodeData(this);
      });
      // Clear forward nodes recursively
      this.next.forEach((node) => {
        if (node.task != caller) node.task.clearNodeData(this);
      });
    }
  }

  async run(
    data,
    needReset = true,
    garbage = [],
    propagate = true,
    checkForwardConnection = false,
    forwardNode = null
  ) {
    //console.log("Running node...", this);

    if (needReset) garbage.push(this);

    if (!this.outputData) {
      //var inputs = {};
      //   console.log("before checkInputs");
      await this.checkInputs(data, garbage);
      //   console.log("after checkInputs");
      if (
        !this.workerRan &&
        this.allInputsPopulated &&
        this.numOutputOptionsUntilTrigger <= 0
      ) {
        //console.log("RUNNING WORKER: ", this);
        this.workerRan = true;
        this.outputData = {
          ...this.outputData,
          ...(await this.worker(this, this.inputData, data)),
        };

        // Force any undefined outputs to be null instead (undefined is inactive, null triggers but has no data)
        // if (this.outputData) {
        //   Object.keys(this.outputData).forEach((outputKey) => {
        //     let outputData = this.outputData[outputKey];
        //     if (outputData === undefined) {
        //       this.outputData[outputKey] = null;
        //     }
        //   });
        // }

        // Worker has been run
        // Certain options or outputOptions may have been closed
        // If so, let's modify the data they hold so that next nodes can function
        this.closed.forEach((closedOutputKey) => {
          if (this.outputData) {
            this.outputData[closedOutputKey] = null;

            // Deduct numOutputOptionsUntilTrigger from the forward node
            this.next
              .filter((nextNode) => nextNode.key == closedOutputKey)
              .forEach((nextNode) => {
                nextNode.task.numOutputOptionsUntilTrigger--;
              });
          }
          //this.next.find();
        });

        // If all inputs to this node have been closed, close all of the outputs
        let allInputsClosed = Object.keys(this.inputData).length ? true : false;
        Object.values(this.inputData).forEach((inputData) => {
          if (inputData[0] !== null) {
            allInputsClosed = false;
          }
        });
        if (allInputsClosed) {
          // All inputs are closed, so lets close all of our outputs
          this.closed = Object.keys(this.component.task.outputs);
        }

        // Did this node have any optional inputs?
        // If so, we skipped running back-propagating nodes
        // If any of those channels should be open we need to run those nodes now
        if (this.component.task.optionalInputs) {
          let nodesToRerun = [];

          let optionalInputKeys = Object.keys(
            this.component.task.optionalInputs
          );
          for (
            let optionalInputKeyIndex = 0;
            optionalInputKeyIndex < optionalInputKeys.length;
            optionalInputKeyIndex++
          ) {
            // await Object.keys(this.component.task.optionalInputs).forEach(
            //   async (optionalInputKey) => {
            let optionalInputKey = optionalInputKeys[optionalInputKeyIndex];
            let outputKeys =
              this.component.task.optionalInputs[optionalInputKey];
            //outputKeys.forEach(async (outputKey) => {
            for (
              let outputKeyIndex = 0;
              outputKeyIndex < outputKeys.length;
              outputKeyIndex++
            ) {
              let outputKey = outputKeys[outputKeyIndex];
              if (this.closed.indexOf(outputKey) == -1) {
                // This output key is still open. Check if we should run the node.
                console.log(this.inputs, optionalInputKey);
                let input = this.inputs[optionalInputKey]
                  ? this.inputs[optionalInputKey][0]
                  : 0;
                if (input) {
                  let inputTask = input.task;
                  if (!inputTask.workerRan) {
                    //console.log("RUNNING OPTIONAL INPUT!", inputTask);
                    await inputTask.run(data, false, garbage, true, true, this);

                    // Set the inputs of this node to the output data of the node we just ran
                    if (this.inputData && input.task.outputData)
                      this.inputData[optionalInputKey] = [
                        input.task.outputData[input.key],
                      ];

                    this.outputData = {
                      ...this.outputData,
                      ...(await this.worker(this, this.inputData, data)),
                    };

                    // Store nodes that need to be re-run because of newly avaialable input data
                    for (
                      let nextIndex = 0;
                      nextIndex < this.next.length;
                      nextIndex++
                    ) {
                      let nextNode = this.next[nextIndex];
                      if (nextNode.key != outputKey) continue; // Filter any non-matching outputKeys
                      if (nodesToRerun.indexOf(nextNode) == -1) {
                        nodesToRerun.push(nextNode);
                        //console.log("pushing forward node", nodesToRerun);
                      }
                    }
                  }
                }
              }
            }
          }

          // Re-run any tasks that may have new data available because of this change
          //console.log("HERE", nodesToRerun);
          nodesToRerun.forEach(async (node) => {
            //console.log("running forward node after state update", this, node);
            node.task.numOutputOptionsUntilTrigger--;
            node.task.outputData = null;
            node.task.workerRan = false;
            await node.task.run(data, false, garbage);
          });
        }
      }

      if (propagate) {
        //console.log("propagating", this);
        await Promise.all(
          this.next
            .filter((f) => {
              return !this.closed.includes(f.key);
            })
            .map(async (f) => {
              //console.log("Inside propagate map");
              if (
                f.connectionType == "outputOption" ||
                f.connectionType == "option"
              )
                f.task.numOutputOptionsUntilTrigger--;
              if (
                f.connectionType == "option" ||
                f.connectionType == "outputOption"
              ) {
                if (this.workerRan) {
                  //console.log("running f?");
                  await f.task.run(data, false, garbage);
                }
              } else if (f.task.numOutputOptionsUntilTrigger > 0) {
                //console.log("It's the else");
                Object.values(f.task.inputs).map(async (inputSlot) => {
                  inputSlot.map(async (input) => {
                    await input.task.run(data, false, garbage);
                  });
                });
              }
            })
        );
      }
    }

    /*
        if (checkForwardConnection) {
            if (forwardNode.numOutputOptionsUntilTrigger == 0) {
                console.log("checking forward");
                await forwardNode.task.run(data, false, garbage)

            }
        }
        */

    if (needReset) garbage.map((t) => t.reset());
  }

  clone(root = true, oldTask, newTask) {
    const inputs = Object.assign({}, this.inputs);

    if (root)
      // prevent of adding this task to `next` property of predecessor
      [...this.getInputs("option"), ...this.getInputs("outputOption")].map(
        (key) => delete inputs[key]
      );
    // replace old tasks with new copies
    else
      Object.keys(inputs).map((key) => {
        inputs[key] = inputs[key].map((con) => ({
          ...con,
          task: con.task === oldTask ? newTask : con.task,
        }));
      });

    const task = new Task(inputs, this.component, this.worker);

    // manually add a copies of follow tasks
    task.next = this.next.map((n) => ({
      key: n.key,
      task: n.task.clone(false, this, task),
    }));

    return task;
  }
}

class NodeConnection {
  constructor(socketFrom, socketTo) {}
}

class NodeSocket {
  constructor(node, label, type) {}
}

class Node {
  constructor(task) {
    this.sockets = [];
    this.inputSockets = [];
    this.outputSockets = [];
  }
}

class NodeSystemManager {
  constructor() {}
}
