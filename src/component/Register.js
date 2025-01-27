import React from "react"
import "./Register.css";
import Todo from "./todo";

class UsernameForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
    }
  }

  componentDidMount() {
    const storedUsername = localStorage.getItem("username")
    if (storedUsername) {
      this.setState({ username: storedUsername })
    }
  }

  handleChange = (event) => {
    this.setState({ username: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    localStorage.setItem("username", this.state.username)
    alert("Username saved!")
    window.location.reload();
  }

  render() {
    if (localStorage.getItem("username")) {
        return <Todo/>;
    }
    else{
    return (
      <div className="formContainer">
        <form onSubmit={this.handleSubmit}>
          <div className="formGroup">
            <label htmlFor="username" className="label">
              <h2>Type your name</h2>
            </label>
            <input
              type="text"
              id="username"
              value={this.state.username}
              onChange={this.handleChange}
              className="input"
            />
          </div>
          <button type="submit" className="button">
            Save
          </button>
        </form>
      </div>
    )
  }
}
}

export default UsernameForm

