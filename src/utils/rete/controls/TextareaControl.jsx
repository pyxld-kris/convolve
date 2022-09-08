import React from "react";
import ReactModal from "react-modal";
import { Control } from "rete";

import CodeEditor from "react-simple-code-editor";

import 'prismjs';
import Prism from "prismjs";
// import 'prismjs/components/prism-clike';
// import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-okaidia.css'; //Example style, you can use another
console.log(Prism)



//class MyReactControl extends React.Component { // needed for weird ref passing stuff
class MyReactControl extends React.Component {
  render() {
    return <ReactControlChild ref={this.props.controlRef} {...this.props} />;
  }
}

class ReactControlChild extends React.Component {
//const ReactControlChild = React.forwardRef((props, ref) => {

  state = {};
  componentDidMount() {
    this.state = {
      name: this.props.name,
      textValue: this.props.value,
      ////////////
      modalContent: this.props.modalContent,
      modalIsOpen: this.props.modalIsOpen
    };
    console.log(this.props);
    this.props.putData(this.props.id, this.props.name);

    this.customModalStyles = {
      content: {
        position: "absolute",
        width: "70%",
        height: "80%",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1001,
        backgroundColor: "#1e1e1e"
      },
      overlay: { zIndex: 1000, backgroundColor: "rgba(0,0,0,.75)" }
    };
  }
  
  onChange(event) {
    this.onValueChange(event.target.value);
  }

  onValueChange(value) {
    this.props.putData(this.props.id, value);
    this.setState({
      textValue: value
    });
  }
  
  // Start modal stuff
  //const [modalContent] = React.useState(props.modalContent);
  //const [modalIsOpen, setModalIsOpen] = React.useState(props.modalIsOpen);
  openModal() {
    this.setState({
      modalIsOpen: true
    });
  };
  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  };
  //const afterOpenModal = () => {};
  // End modal stuff

  render() {
    return (
      <div>
        <ReactModal
          isOpen={this.state.modalIsOpen}
          onRequestOpen={this.openModal.bind(this)}
          onRequestClose={this.closeModal.bind(this)}
          style={this.customModalStyles}
          //onAfterOpen={afterOpenModal}
          contentLabel="Template Modal"
        >
          <div style={{  
            width: "100%",
            height: "100%",
            fontFamily: '"Abel", sans-serif;'
          }}>
            <>
              <CodeEditor 
                value={this.state.textValue}
                onValueChange={this.onValueChange.bind(this)}
                highlight={code => Prism.highlight(code ? code : "", Prism.languages.js)}
                //highlight={code => code}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 12,
                  color:"#9cdcfe"
                }} />
            </>
          </div>
        </ReactModal>
        <div style={{
          width:"35rem",
          height:"30rem",
          overflow:"scroll",
          backgroundColor: "#1e1e1e"
        }}>
          <CodeEditor 
            ref={this.props.inputRef}
            value={this.state.textValue}
            placeholder={this.props.name}
            onValueChange={this.onValueChange.bind(this)}
            highlight={code => Prism.highlight(code ? code : "", Prism.languages.js)}
            //highlight={code => code}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 22,
              color:"#9cdcfe",
              backgroundColor: "#1e1e1e",
              minHeight:"100%"
            }} 
          />
        </div>
        {/* <textarea rows="20" cols="50" ref={this.props.inputRef} value={this.state.textValue} placeholder={this.props.name} onChange={this.onChange.bind(this)}></textarea> */}
        <br />
        <button onClick={() => {
          this.openModal();
        }}>Edit In Editor</button>
      </div>
    );
  }
}
/*
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
      //alert(this.props.id);
      //alert(event.target.value);
      this.props.putData(this.props.id, event.target.value);
      //this.props.emitter.trigger("process");
      this.setState({
        name: event.target.value,
      });
    }
  
    // <input ref={this.props.inputRef} value={this.state.value} placeholder={this.props.name} onChange={this.onChange.bind(this)} />

    render() {
      return (
        <div>
          <textarea rows="20" cols="50" ref={this.props.inputRef} value={this.state.value} placeholder={this.props.name} onChange={this.onChange.bind(this)}></textarea>
        </div>
      );
    }
}
*/

export class TextareaControl extends Control {
  constructor(emitter, key, name, node) {
    super(key);
    this.render = "react";
    this.component = MyReactControl;
    this.controlRef = React.createRef();
    this.inputRef = React.createRef();
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
          textValue: value
        });
      },
      controlRef: this.controlRef,
      inputRef: this.inputRef,
      value: ""
    };
    console.log(this);
  }

  setValue(value) {
    //alert("setting value");
    //this.inputRef.value = value;
    //this.state.displayValue = value;
    console.log(this.controlRef);
    this.putData(this.key, value);
    this.controlRef.current.setState({
      textValue: value
    })
  }
}



