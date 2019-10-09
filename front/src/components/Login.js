import React, { Component } from 'react'
import { Redirect } from 'react-router'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userName: "",
      password: "",
      redirect: false,
      isInputsEmpty: true,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onInputChange = e => this.setState({[e.target.name]: e.target.value}, () => this.toggleNextButtonDisable())

  toggleNextButtonDisable() {
    if (this.state.userName &&
      this.state.password) {
      this.setState({isInputsEmpty: false})
    } else this.setState({isInputsEmpty: true})
  }

  handleSubmit() {
    let categoryInfo = {title: this.state.categoryName, image: this.state.categoryImage}
    fetch(`/api/category`, {
      method: 'POST',
      headers: { "Content-Type": "application/json; charset=utf-8", 'Accept': 'application/json' },
      body: JSON.stringify(categoryInfo)
    })
      .then(() => {
        this.setState({redirect: true})
      })
  }

  render() {
    if (this.state.redirect) return <Redirect to="/"/>
    return (
      <div className="inputForm">
        <div className="center_container">
          <input
            type="text"
            value={this.state.userName}
            autoFocus
            className="form-control mb-2"
            onChange={(value) => this.onInputChange(value)}
            id="userName"
            name="userName"
            placeholder="Username"
          />
          <div className="form-row">
            <div className="col">
              <input
                type="text"
                value={this.state.password}
                className="form-control mb-2"
                onChange={(value) => this.onInputChange(value)}
                id="password"
                name="password"
                placeholder="Password"
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <button onClick={this.handleSubmit} disabled={this.state.isInputsEmpty}  className="btn btn-primary">Login</button>
          <span>New here? please <a href="/register">Register</a>!</span>
        </div>
      </div>
    )
  }
}

export default Login