import React, { Component } from "react";
import "./todo.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faPenToSquare } from '@fortawesome/free-solid-svg-icons'

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.username =  localStorage.getItem("username") ? localStorage.getItem("username"):"";
    this.state = {
      listitems: [
        { item: "Wash Clothes", check: false, showInput: false, textValue:"", },
        { item: "Clean Kitchen", check: false,showInput: false, textValue:"",},
      ],
      inputValue: "",

    };
    

  }
  handleAdd = (e) => {
    console.log(this.state.inputValue);
    this.setState({
      listitems: [
        ...this.state.listitems,
        { item: this.state.inputValue, check: false ,showInput: false, textValue:"",},
      ],
      inputValue:"",

    });
  };
  handleChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };
  handleChangeCheck = (index) => {
    const updatedList = [...this.state.listitems];
    if (updatedList) {
      console.log("updated");
      console.log(updatedList);
      updatedList[index].check = !updatedList[index].check;
      this.setState({
        listitems: updatedList,
      });
    }
  };
  componentDidUpdate(prevprops, prevState) {
    const oldState = prevState.listitems;
    const newState = this.state.listitems;
    console.log(oldState);
    console.log(newState);

    console.log("Saved");
    localStorage.setItem("listitem", JSON.stringify(newState));
  }
  componentDidMount() {
    const savedState = localStorage.getItem("listitem")
      ? JSON.parse(localStorage.getItem("listitem"))
      : false;
    console.log(savedState);
    if (savedState) {
      this.setState({
        listitems: savedState,
      });
    }
  }
  handleDelete = (itemname) => {
    const updatedList = this.state.listitems.filter(
      (items) => items.item !== itemname
    );
    // console.log(updatedList);
    this.setState({
      listitems: updatedList,
    });
  };
  handleShowInput = (index) => {
    const updateList2 = [...this.state.listitems];
    if (updateList2) {

      updateList2[index].showInput = !updateList2[index].showInput;
    this.setState({
      listitems:updateList2,
    })
  }
  }
  handleChangeText = (e,index) => {
const text =  e.target.value;
const updateList3 = [...this.state.listitems];
  if (updateList3) {
   updateList3[index].textValue = text;
  this.setState({
    listitems: updateList3,
  })
  }
  };
  handleKeyDown = (event, index) => {
    if ((event.key === "Enter")&& this.state.listitems[index].showInput)  {
      const updateList4 = [...this.state.listitems];
      if (updateList4) {
        updateList4[index].item = this.state.listitems[index].textValue;
        updateList4[index].showInput = false;
        this.setState({
          listitems: updateList4,
        })
      }
    }
  };
  render() {
    return (
      <div className="todo-container">
        <h1>{this.username}'s TO-DO</h1>
        <div className="input-section">
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
          <button onClick={this.handleAdd}>Add</button>
        </div>
        <h2>List items</h2>
        <ul>
          {this.state.listitems.map((items, index) => {
            return (
              <li key={index}>
                <label>
                  <input
                    type="checkbox"
                    name={items.item}
                    checked={items.check}
                    onChange={() =>this.handleChangeCheck(index)}
                  />
                  {console.log(items.showInput)}
                   {items.showInput ? (<input
          type="text"
          value = {items.textValue}
          onChange={(e) => this.handleChangeText(e,index)}
          onKeyDown={(e) => this.handleKeyDown(e, index)}
           className="editinput"
        />):(<span>{items.item}</span>)}
                </label>
                <button className= "deleteBut" onClick={() => this.handleShowInput(index)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                <button
                  onClick={() => this.handleDelete(items.item)}
                  className="deleteBut"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
