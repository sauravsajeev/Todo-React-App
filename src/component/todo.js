import React, { Component } from "react";
import "./todo.css";
export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listitems: [
        { item: "Wash Clothes", check: false },
        { item: "Clean Kitchen", check: false },
      ],
      inputValue: "",
    };
  }
  handleAdd = (e) => {
    console.log(this.state.inputValue);
    this.setState({
      listitems: [
        ...this.state.listitems,
        { item: this.state.inputValue, check: false },
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
  render() {
    return (
      <div className="todo-container">
        <h1>Todo App</h1>
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
                    onChange={() => this.handleChangeCheck(index)}
                  />
                  <span>{items.item}</span>
                </label>
                <button
                  onClick={() => this.handleDelete(items.item)}
                  className="deleteBut"
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
