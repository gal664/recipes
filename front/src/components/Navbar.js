import React, { Component } from 'react'

class Navbar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isMenuOpen: false,
    }
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }
  
  handleMenuClick(){this.setState({isMenuOpen: !this.state.isMenuOpen})}

  renderMenu(){
    if(!this.state.isMenuOpen){
      return (<i className="menuBtn fas fa-bars" onClick={this.handleMenuClick}></i>)
    } else if(this.state.isMenuOpen){
      return (
        <div className="menu">
          <i className="menuBtn fas fa-bars" onClick={this.handleMenuClick}></i>
          <a className="menuItem" href="/">Home</a>
          <a className="menuItem" href="/recipe/add">Add recipe</a>
          <a className="menuItem" href="/category/add">Add category</a>
          <a className="menuItem" href="/login">Login</a>
        </div>
      )
    }
  }
  render() {
    return (
      <div className="navbar">
        <span className="title">Recipes</span>
        {this.renderMenu()}
      </div>
    )
  }
}

export default Navbar