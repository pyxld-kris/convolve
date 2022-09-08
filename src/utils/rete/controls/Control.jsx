import React from "react";
import { Control } from "rete";

import CodeEditor from "react-simple-code-editor";

import 'prismjs';
import Prism from "prismjs";
// import 'prismjs/components/prism-clike';
// import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-okaidia.css'; //Example style, you can use another
console.log(Prism)



class MyReactControl extends React.Component { // needed for weird ref passing stuff
    render() {
        return (
          <ReactControlChild ref={this.props.controlRef} {...this.props} />
        );
      }
}

class ReactControlChild extends React.Component {
    state = {};
    componentDidMount() {
      this.setState({
        name: this.props.name,
        value: this.props.value
      });
      console.log(this.props);
      this.props.putData(this.props.id, this.props.name);
    }
    
    onChange(event) {
      this.onValueChange(event.target.value);
    }

    onValueChange(value) {
      //alert(this.props.id);
      //alert(event.target.value);
      this.props.putData(this.props.id, value);
      //this.props.emitter.trigger("process");
      //this.props.emitter.trigger("change");
      console.log(this.props.emitter)
      this.setState({
        value: value
      });
    }
  
    render() {
      return (
        <div style={{
          //width:"15rem",
          //height:"2rem",
          //overflow:"scroll",
          backgroundColor: "#1e1e1e",
          padding:"0"
        }}>
          <CodeEditor 
            ref={this.props.inputRef}
            value={this.state.value}
            placeholder={this.props.name}
            onValueChange={this.onValueChange.bind(this)}
            highlight={code => Prism.highlight(code ? code : "", Prism.languages.js)}
            //highlight={code => code}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 30,
              color:"#9cdcfe",
              backgroundColor: "#1e1e1e",
              minHeight:"100%"
            }} 
          />
        </div>
        // <input ref={this.props.inputRef} value={this.state.value} placeholder={this.props.name} onChange={this.onChange.bind(this)} />
      );
    }
}

export class MyControl extends Control {
  constructor(emitter, key, name, node) {
    super(key);
    this.render = "react";
    this.component = MyReactControl;
    this.controlRef = React.createRef();
    this.inputRef = React.createRef();
    this.emitter = emitter;
    this.data = {};
    this.props = {
      emitter,
      node,
      id: key,
      name: name,
      putData: (key, value) => {
        //this.state.displayValue = value;
        this.putData(key, value);
        this.controlRef?.current?.setState({
            value: value
        });
      },
      controlRef: this.controlRef,
      inputRef: this.inputRef,
      value: ""
    };
  }

  setValue(value) {
    //alert("setting value");
    //this.inputRef.value = value;
    //this.state.displayValue = value;
    console.log(this.controlRef);
    this.putData(this.key, value);
    this.controlRef?.current?.setState({
        value: value
    });
  }
}
