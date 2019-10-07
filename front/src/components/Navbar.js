import React, { Component } from 'react'

class Navbar extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="navbar">
        <span>{this.props.title}</span>
        <div className="icons">
          <a href="/"><i className="fas fa-home"></i></a>
          <a href="/recipe/add"><i className="fas fa-plus"></i></a>
        </div>
      </div>
    )
  }
}

export default Navbar