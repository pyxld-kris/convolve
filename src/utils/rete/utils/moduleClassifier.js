
export const hasInput = (moduleData) => {
    let hasInput = false;
    Object.values(moduleData.nodes).forEach((node) => {
        if (node.name == "Input") {
            hasInput = true;
        }
    });
    return hasInput;
};

export const hasOutput = (moduleData) => {
    let hasOutput = false;
    Object.values(moduleData.nodes).forEach((node) => {
        if (node.name == "Output") {
            hasOutput = true;
        }
    });
    return hasOutput;
};

export const hasIO = (moduleData) => {
    return (hasInput(moduleData) && hasOutput(moduleData));
};
