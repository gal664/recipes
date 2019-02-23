import React, { Component } from 'react'

class Ingredient extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: this.props.type
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = () => this.props.onRemove(this.props.id)

  render() {
    if (this.props.type === "displayOnly") {
      return (
        <li className="ingredient">
          <div className="ingredient_name">{this.props.name}</div>
          <div className="ingredient_quantity">{`${this.props.amount} ${this.props.measurement}`}</div>
        </li>
      )
    } else if (this.props.type === "editable") {
      return (
        <li className="ingredient">
          <div className="ingredient_name">{this.props.name}</div>
          <div className="ingredient_quantity">{`${this.props.amount} ${this.props.measurement}`}</div>
          <button onClick={this.handleClick} className="btn btn-secondary ml-2">Remove</button>
        </li>
      )
    }
  }
}

export default Ingredient