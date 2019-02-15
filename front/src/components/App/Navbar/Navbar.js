import React, { Component } from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import Logo from '../Logo/Logo'

class Navbar extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  renderAddRecipeButton() {
    if(window.location.href.indexOf("add") === -1) return (
      <NavLink to={`/add`}>
        <i className="fas fa-plus"></i>
      </NavLink>
    )
  }

  render() {
    return (
      <div className="navbarContainer">
        <div className="navbarSection navbarSection_left">
          {this.renderAddRecipeButton()}
        </div>
          <NavLink to={`/`}>
            <Logo />
          </NavLink>
        <div className="navbarSection navbarSection_right">
          <i className="fas fa-search"></i>
        </div>
      </div>
    )
  }
}

export default Navbar

