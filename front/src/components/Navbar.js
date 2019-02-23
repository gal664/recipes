import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

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

  renderSearchButton() {
    if(window.location.href.indexOf("search") === -1) return (
      <NavLink to={`/search`}>
        <i className="fas fa-search"></i>
      </NavLink>
    )
  }

  render() {
    return (
      <div className="navbar">
        <div className="navbarSection navbarSection_left">
          {this.renderAddRecipeButton()}
        </div>
          <NavLink to={`/`}>
            <div className="Logo">- Recipes -</div>
          </NavLink>
        <div className="navbarSection navbarSection_right">
          {this.renderSearchButton()}
        </div>
      </div>
    )
  }
}

export default Navbar

