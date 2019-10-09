import React, { Component } from 'react'
import { Redirect } from 'react-router'

class Register extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      repeatPassword: "",
      isPasswordsHidden: true,
      redirect: false,
      isInputsValid: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onInputChange = e => this.setState({[e.target.name]: e.target.value}, () => this.toggleRegisterButtonDisable())
  
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  toggleRegisterButtonDisable() {
    if (
      this.validateEmail(this.state.email) &&
      this.state.firstName.length > 4 &&
      this.state.lastName.length > 4 &&
      this.state.userName.length > 4 &&
      this.state.password.length > 4 &&
      this.state.password === this.state.repeatPassword){
        this.setState({isInputsValid: true})
      }
      else this.setState({isInputsValid: false})
    }
    toggleShowHidePassowrd = () => this.setState({isPasswordsHidden: !this.state.isPasswordsHidden})

  handleSubmit() {
    // let categoryInfo = {title: this.state.categoryName, image: this.state.categoryImage}
    // fetch(`/api/category`, {
    //   method: 'POST',
    //   headers: { "Content-Type": "application/json; charset=utf-8", 'Accept': 'application/json' },
    //   body: JSON.stringify(categoryInfo)
    // })
    //   .then(() => {
    //     this.setState({redirect: true})
    //   })
  }

  render() {
    if (this.state.redirect) return <Redirect to="/"/>
    return (
      <div className="inputForm">
        <div className="center_container">
          <input
            type="email"
            value={this.state.email}
            autoFocus
            className="form-control mb-2"
            onChange={(value) => this.onInputChange(value)}
            id="email"
            name="email"
            placeholder="Email Address"
          />
          <input
            type="text"
            value={this.state.firstName}
            className="form-control mb-2"
            onChange={(value) => this.onInputChange(value)}
            id="firstName"
            name="firstName"
            placeholder="First Name"
          />
          <input
            type="text"
            value={this.state.lastName}
            className="form-control mb-2"
            onChange={(value) => this.onInputChange(value)}
            id="lastName"
            name="lastName"
            placeholder="Last Name"
          />
          <input
            type="text"
            value={this.state.userName}
            className="form-control mb-2"
            onChange={(value) => this.onInputChange(value)}
            id="userName"
            name="userName"
            placeholder="Username"
          />
          <input
            type={this.state.isPasswordsHidden ? "password" : "text"}
            value={this.state.password}
            className="form-control mb-2"
            onChange={(value) => this.onInputChange(value)}
            id="password"
            name="password"
            placeholder="Password"
          />
          <input
            type={this.state.isPasswordsHidden ? "password" : "text"}
            value={this.state.repeatPassword}
            className="form-control mb-2"
            onChange={(value) => this.onInputChange(value)}
            id="repeatPassword"
            name="repeatPassword"
            placeholder="repeatPassword"
          />
          <div className="form-check">
            <input className="form-check-input"
              onClick={this.toggleShowHidePassowrd}
              type="checkbox"
              id="showHidePassowrd"
            />
            <label className="form-check-label">Show Passwords</label>
          </div>
        </div>
        <div className="footer">
          <button onClick={this.handleSubmit} disabled={!this.state.isInputsValid}  className="btn btn-primary">Register</button>
        </div>
      </div>
    )
  }
}

export default Register