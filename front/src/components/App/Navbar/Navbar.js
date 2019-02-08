import React, { Component } from 'react'
import './Navbar.css'
import Logo from '../Logo/Logo'
import { NavLink } from 'react-router-dom'

class Navbar extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="navbarContainer">
        <div className="navbarSection navbarSection_left">
          <i className="fas fa-search"></i>
        </div>
          <NavLink to={`/`}>
            <Logo />
          </NavLink>
        <div className="navbarSection navbarSection_right">
          <NavLink to={`/addRecipe`}>
            <i className="fas fa-plus"></i>
          </NavLink>
        </div>
      </div>
    )
  }
}

export default Navbar

