import React, { Component } from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import Logo from '../Logo/Logo'

class Navbar extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="navbarContainer">
        <div className="navbarSection navbarSection_left">
          <NavLink to={`/add`}>
            <i className="fas fa-plus"></i>
          </NavLink>
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
