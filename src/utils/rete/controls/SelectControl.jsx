import React from "react";
import { Control } from "rete";


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
      //alert(this.props.id);
      //alert(event.target.value);
      this.props.putData(this.props.id, event.target.value);
      //this.props.emitter.trigger("process");
      //this.props.emitter.trigger("change");
      console.log(this.props.emitter)
      this.setState({
        name: event.target.value,
      });

      this.props.control.trigger("change");
    }
  
    render() {
      return (
        <select 
          style={{
            width:"28rem",
            fontSize:"2.5rem",
            color:"#00ff00",
            backgroundColor:"black"
          }} 
          ref={this.props.inputRef} 
          value={this.state.value} 
          placeholder={this.props.name} 
          onChange={this.onChange.bind(this)}
        >
          <option value="" disabled selected>Select your option</option>
          {this.props.selectValues.map((selectValue) => {
            return <option value={selectValue}>{selectValue}</option>;
          })}
        </select>
      );
    }
}

export class SelectControl extends Control {
  constructor(emitter, key, name, node, selectValues) {
    super(key);
    this.render = "react";
    this.component = MyReactControl;
    this.controlRef = React.createRef();
    this.inputRef = React.createRef();
    this.emitter = emitter;
    this.data = {};
    this.props = {
      control: this,
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
      value: "",
      selectValues: selectValues
    };

    this.eventHandlers = {};
  }

  setValue(value) {
    //alert("setting value");
    //this.inputRef.value = value;
    //this.state.displayValue = value;
    console.log(this.controlRef);
    this.putData(this.key, value);
    this.controlRef.current.setState({
        value: value
    });

    if (this.onValueChange) {
      this.onValueChange();
    }
  }

  on(eventLabel, eventFunc) {
    if (!this.eventHandlers[eventLabel]) this.eventHandlers[eventLabel] = [];
    this.eventHandlers[eventLabel].push(eventFunc);
  }

  off(eventLabel, eventFunc) {
    if (!eventFunc) this.eventHandlers[eventLabel] = [];
    else {
      let index = this.eventHandlers[eventLabel]?.indexOf(eventFunc);
      if (index != -1)
        this.eventHandlers[eventLabel].splice(index, 1);
    }
  }

  trigger(eventLabel) {
    this.eventHandlers[eventLabel].forEach((event) => {
      event.call(this);
    });
  }
}
