import React, { Component } from "react";
import { connect } from "react-redux";
class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  handleUsernameChange = event => {
    console.log("new username", event.target.value);
    this.setState({ username: event.target.value });
  };
  handlePasswordChange = event => {
    console.log("new password", event.target.value);
    this.setState({ password: event.target.value });
  };
  handleSubmit = async evt => {
    evt.preventDefault();
    console.log("login form submitted");
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    let response = await fetch("/login", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    console.log("responseBody from login", responseBody);
    let body = JSON.parse(responseBody);
    console.log("parsed body", body);
    if (!body.success) {
      alert("login failed");
      return;
    }
    this.props.dispatch({
      type: "login-success"
    });
  };
  render = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          onChange={this.handleUsernameChange}
        />
        {/* Password */}
        <input
          type="text"
          placeholder="Password"
          onChange={this.handlePasswordChange}
        />
        <input type="submit" />
      </form>
    );
  };
}
let Login = connect()(UnconnectedLogin);
export default Login;

// loginsubmitHandler = async evt => {
//     evt.preventDefault();
//     console.log("username", this.state.username);
//     console.log("password", this.state.passwordInput);
//     let name = this.state.usernameInput;
//     let data = new FormData();
//     data.append("username", name);
//     data.append("password", this.state.passwordInput);
//     let response = await fetch("/login", { method: "POST", body: data });
//     let body = await response.text();
//     console.log("/login response", body);
//     body = JSON.parse(body);
//     if (body.success) {
//       alert("login done");
//       return;
//     }
//     alert("user name and password don't match");
//   };