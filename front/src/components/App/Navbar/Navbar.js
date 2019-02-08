import React, { Component } from 'react'
import './Navbar.css'
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
          <i className="fas fa-search"></i>
        </div>
        <Logo />
        <div className="navbarSection navbarSection_right">
          <i className="fas fa-plus"></i>
        </div>
      </div>
    )
  }
}

export default Navbar