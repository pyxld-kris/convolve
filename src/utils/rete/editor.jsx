import alight from "alight";
import Rete from "rete";
import CommentPlugin from "rete-comment-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import ProfilerPlugin from 'rete-profiler-plugin';


//import ReactRenderPlugin from "rete-react-render-plugin";
import ReactRenderPlugin from "./react-render-plugin";

//import TaskPlugin from "rete-task-plugin";
import TaskPlugin from "./task-plugin";

//import ModulePlugin from "rete-module-plugin";
import ModulePlugin from "./module-plugin";

import AreaPlugin from "rete-area-plugin";
import { MyNode } from "./Node";

import graphModules from "../../content/graphModules";

import AddComponent from "./nodes/AddComponent.js";
import AndComponent from "./nodes/AndComponent";
import AppendComponent from "./nodes/AppendComponent.js";
import ArrayComponent from "./nodes/ArrayComponent";
import ArrayConcatComponent from "./nodes/ArrayConcatComponent";
import ArrayLengthComponent from "./nodes/ArrayLengthComponent";
import AwaitComponent from "./nodes/AwaitComponent";
import BigStringComponent from "./nodes/BigStringComponent.js";
import BranchComponent from "./nodes/BranchComponent";
import DisplayModalComponent from "./nodes/DisplayModalComponent";
import EqualComponent from "./nodes/EqualComponent";
import GetArrayElementComponent from "./nodes/GetArrayElementComponent";
import GetJSONValueComponent from "./nodes/GetJSONValueComponent";
import GPTQueryComponent from "./nodes/GPTQueryComponent.js";
import HTTPRequestComponent from "./nodes/HTTPRequestComponent.js";
import ImageComponent from "./nodes/ImageComponent";
import ImageGenerationModelComponent from "./nodes/ImageGenerationModelComponent";
import InputComponent from "./nodes/InputComponent";
import InputPromptComponent from "./nodes/InputPromptComponent";
import LocalCacheValueComponent from "./nodes/LocalCacheComponent";
import LocalCacheGetComponent from "./nodes/LocalCacheGetComponent";
import LocalCacheSetComponent from "./nodes/LocalCacheSetComponent";
import ModuleComponent from "./nodes/ModuleComponent";
import NumComponent from "./nodes/NumComponent.js";
import OnInitializeComponent from "./nodes/OnInitializeComponent";
import OrComponent from "./nodes/OrComponent";
import OutputComponent from "./nodes/OutputComponent";
import RandIntComponent from "./nodes/RandIntComponent.js";
import SequenceBranchComponent from "./nodes/SequenceBranchComponent";
import StringComponent from "./nodes/StringComponent.js";
import StringReplaceComponent from "./nodes/StringReplaceComponent";
import StringSplitComponent from "./nodes/StringSplitComponent";
import StringTrimComponent from "./nodes/StringTrimComponent";
import TextToSpeechComponent from "./nodes/TextToSpeechComponent";

import ArrayAppendComponent from "./nodes/ArrayAppendComponent";
import CodeComponent from "./nodes/CodeComponent";
import DateComponent from "./nodes/DateComponent";
import DebugLogComponent from "./nodes/DebugLogComponent";
import DelayComponent from "./nodes/DelayComponent";
import EscapeStringComponent from "./nodes/EscapeStringComponent";
import GeolocationComponent from "./nodes/GeolocationComponent";
import GreaterThanComponent from "./nodes/GreaterThanComponent";
import IfComponent from "./nodes/IfComponent";
import LessThanComponent from "./nodes/LessThanComponent";
import OnIntervalComponent from "./nodes/OnIntervalComponent";
import SpeechToTextComponent from "./nodes/SpeechToTextComponent";
import {
  anyTypeSocket, arraySocket, booleanSocket, numSocket, stringSocket
} from "./sockets.js";

export let activeEditor = null;

export async function importGraphData(graphData) {
    let nodes = JSON.parse(JSON.stringify(graphData)).nodes;
    await activeEditor.fromJSON(graphData);
    Object.keys(nodes).forEach(nodeId => {
        //alert(nodeId);
        let nodeData = nodes[nodeId].data;
        console.log(nodeData);
        Object.keys(nodeData).forEach(dataKey => {
            console.log(nodeId+". "+dataKey+": "+nodeData[dataKey]);
            console.log(activeEditor?.nodes?.find(n => n.id == nodeId));
            console.log(activeEditor?.nodes?.find(n => n.id == nodeId)?.controls);
            //alert(nodeId+". "+dataKey+": "+nodeData[dataKey]);
            activeEditor?.nodes?.find(n => n.id == nodeId)?.controls?.get(dataKey)?.setValue(nodeData[dataKey]);
            activeEditor?.nodes?.find(n => n.id == nodeId)?.inputs?.get(dataKey)?.control?.setValue(nodeData[dataKey]);
            activeEditor?.nodes?.find(n => n.id == nodeId)?.outputs?.get(dataKey)?.control?.setValue(nodeData[dataKey]);
        });
    });


        
    // openModule('index.rete').then(() => {
      console.log(JSON.stringify(activeEditor.toJSON()));
    
      activeEditor.view.resize();
      AreaPlugin.zoomAt(activeEditor);
    // });
  
  //editor.trigger("process");

  window.scrollTo(0, 0)
}

export async function saveCurrentModule() {
  let moduleName = prompt("Module Name");
  if (!moduleName) return;

  graphModules[moduleName] = { data: activeEditor.toJSON(), key: moduleName, label: moduleName }
}

export async function loadSavedModule() {
  let moduleName = prompt("Module Name");
  if (!moduleName) return;

  importGraphData(graphModules[moduleName].data);
}

export async function exportModules() {
  console.log(JSON.stringify(graphModules));
}

export async function listModules() {
  alert(Object.keys(graphModules).join("\n"));
}


export let initializeTasks = [];

var currentModule = {};

function addModule() {
  graphModules['module'+Object.keys(graphModules).length+'.rete'] = { data: initialData() }
}

async function openModule(name) {
  currentModule.data = activeEditor.toJSON();
  
  currentModule = graphModules[name];
  await activeEditor.fromJSON(currentModule.data);
  activeEditor.trigger('process')
}

function validateModuleIO(moduleData) {
  let foundInput = false;
  let foundOutput = false;
  Object.values(moduleData.nodes).forEach((node) => {
    if (node.name == "Input") foundInput = true;
    else if (node.name == "Output") foundOutput = true;
  });
  return (foundInput && foundOutput);
}


alight('#modules', { graphModules:graphModules, addModule, openModule });

export default async (container) => {
  var components = [
    new BranchComponent(),
    new IfComponent(),
    new EqualComponent(),
    new LessThanComponent(),
    new GreaterThanComponent(),
    new AndComponent(),
    new OrComponent(),
    new ArrayComponent(),
    new ArrayConcatComponent(),
    new ArrayAppendComponent(),
    new NumComponent(),
    new AddComponent(),
    new StringComponent(),
    new AwaitComponent(),
    new AppendComponent(),
    new RandIntComponent(),
    new GPTQueryComponent(),
    new ImageGenerationModelComponent(),
    new TextToSpeechComponent(),
    new SpeechToTextComponent(),
    new HTTPRequestComponent(),
    new BigStringComponent(),
    new StringSplitComponent(),
    new StringTrimComponent(),
    new StringReplaceComponent(),
    new EscapeStringComponent(),
    new GetArrayElementComponent(),
    new ArrayLengthComponent(),
    new DisplayModalComponent(),
    new DebugLogComponent(),
    new ImageComponent(),
    new SequenceBranchComponent(),
    new InputPromptComponent(),
    new ModuleComponent(),
    new InputComponent(),
    new OutputComponent(),
    new GetJSONValueComponent(),
    new LocalCacheValueComponent(),
    new LocalCacheSetComponent(),
    new LocalCacheGetComponent(),
    new DateComponent(),
    new GeolocationComponent(),
    new DelayComponent(),
    new CodeComponent(),

    new OnInitializeComponent(),
    new OnIntervalComponent()
  ];

  activeEditor = new Rete.NodeEditor("demo@0.1.0", container);
  var engine = new Rete.Engine("demo@0.1.0");

  activeEditor.use(ConnectionPlugin);
  activeEditor.use(ReactRenderPlugin, {
    component: MyNode
  });
  activeEditor.use(ContextMenuPlugin, {
    delay: 0,
    allocate(component) {
      let submenu = component.data.path;
      if (!submenu) submenu = "Other";
      return [submenu];
    },
  });
  activeEditor.use(TaskPlugin);
  //activeEditor.use(ModulePlugin.default, { engine, graphModules });
  activeEditor.use(ModulePlugin, { engine, modules: graphModules });
  activeEditor.use(ProfilerPlugin, { editor: activeEditor, enabled: true }); // editor can be optional

  activeEditor.sockets = {
    anyTypeSocket: anyTypeSocket,
    booleanSocket: booleanSocket,
    numSocket: numSocket,
    stringSocket: stringSocket,
    arraySocket: arraySocket
  };

  

  // start CommentPlugin stuff
  activeEditor.use(CommentPlugin, {
    disableBuiltInEdit: true,
    frameCommentKeys: { code: 'KeyF', shiftKey: true, ctrlKey: false, altKey: false },
    inlineCommentKeys: { code: 'KeyC', shiftKey: true, ctrlKey: false, altKey: false },
    deleteCommentKeys: { code: 'Delete', shiftKey: false, ctrlKey: false, altKey: false }
  });
  activeEditor.on('editcomment', async (comment) => {
      //comment.text = await ContextMenuPlugin.openEditModal(comment.text);
      comment.text = prompt("What would you like to rename this comment frame?", comment.text);
      comment.update();
  });
  // end CommentPlugin stuff


  components.map((c) => {
    activeEditor.register(c);
    engine.register(c);
  });

  /*
  editor.on(
    "process nodecreated noderemoved connectioncreated connectionremoved",
    async () => {
      console.log("process");
      await engine.abort();
      await engine.process(editor.toJSON());
    }
  );
  */

    window.executeGraph = async () => {
        console.log("process");
        await engine.abort();
        console.log(JSON.stringify(activeEditor.toJSON()));
        await engine.process(activeEditor.toJSON());

        if(!initializeTasks) return;
  
        initializeTasks.map(task => {
            task.run();
            task.reset();
         });
    }

    //let editorData = {"id":"demo@0.1.0","nodes":{"77":{"id":77,"data":{"string":"a"},"inputs":{"in0":{"connections":[{"node":78,"output":"action","data":{}}]}},"outputs":{"out0":{"connections":[{"node":79,"input":"in0","data":{}}]}},"position":[-358.2407511386309,-295.47589209660066],"name":"String"},"78":{"id":78,"data":{},"inputs":{},"outputs":{"action":{"connections":[{"node":77,"input":"in0","data":{}},{"node":81,"input":"in0","data":{}}]}},"position":[-637.4383100300755,-155.62406980618204],"name":"OnInitialize"},"79":{"id":79,"data":{"preview":0,"in0":"","in1":""},"inputs":{"in0":{"connections":[{"node":77,"output":"out0","data":{}}]},"in1":{"connections":[{"node":81,"output":"out0","data":{}}]}},"outputs":{"out0":{"connections":[{"node":82,"input":"in0","data":{}}]}},"position":[15.790388328315263,-295.13022136274384],"name":"Append"},"80":{"id":80,"data":{"string":""},"inputs":{"in0":{"connections":[{"node":82,"output":"out0","data":{}}]}},"outputs":{"out0":{"connections":[]}},"position":[626.7490930546392,-413.26769472497875],"name":"BigString"},"81":{"id":81,"data":{"string":"b"},"inputs":{"in0":{"connections":[{"node":78,"output":"action","data":{}}]}},"outputs":{"out0":{"connections":[{"node":79,"input":"in1","data":{}}]}},"position":[-367.0679159751814,-97.59936337532422],"name":"String"},"82":{"id":82,"data":{"preview":0,"in0":"","in1":""},"inputs":{"in0":{"connections":[{"node":79,"output":"out0","data":{}}]},"in1":{"connections":[{"node":83,"output":"out0","data":{}}]}},"outputs":{"out0":{"connections":[{"node":80,"input":"in0","data":{}}]}},"position":[95.22424497860278,6.153274828706216],"name":"Append"},"83":{"id":83,"data":{"string":"c"},"inputs":{"in0":{"connections":[]}},"outputs":{"out0":{"connections":[{"node":82,"input":"in1","data":{}}]}},"position":[-369.1746177322657,104.41249116236835],"name":"String"}}}
    //let editorData = {"id":"demo@0.1.0","nodes":{"4":{"id":4,"data":{"string":"a,b,c,d,e,f"},"inputs":{"in0":{"connections":[]}},"outputs":{"out0":{"connections":[{"node":7,"input":"in0","data":{}}]}},"position":[-735.9872102040363,-301.61514366657127],"name":"BigString"},"5":{"id":5,"data":{"string":"a,b,c,d,e,f"},"inputs":{"in0":{"connections":[{"node":8,"output":"out0","data":{}}]}},"outputs":{"out0":{"connections":[]}},"position":[564.2559845826519,-311.2466266594092],"name":"BigString"},"7":{"id":7,"data":{"in0":"String","in1":","},"inputs":{"in0":{"connections":[{"node":4,"output":"out0","data":{}}]},"in1":{"connections":[]}},"outputs":{"out0":{"connections":[{"node":8,"input":"in0","data":{}}]}},"position":[-84.26039279743594,-308.9280310752882],"name":"StringSplit"},"8":{"id":8,"data":{"in1":"1"},"inputs":{"in0":{"connections":[{"node":7,"output":"out0","data":{}}]},"in1":{"connections":[]}},"outputs":{"out0":{"connections":[{"node":5,"input":"in0","data":{}}]}},"position":[218.95132611126726,-301.7936499325544],"name":"GetArrayElement"}}};
    let editorData = {"id":"demo@0.1.0","nodes":{}};

    importGraphData(editorData);
}
