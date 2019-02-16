import React, { Component } from 'react'
import './Ingredient.css'

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
          <span className="ingredient_name">{this.props.name}</span>
          <span className="ingredient_quantity">{`${this.props.amount} ${this.props.measurement}`}</span>
        </li>
      )
    } else if (this.props.type === "editable") {
      return (
        <li className="ingredient">
          <span className="ingredient_name">{this.props.name}</span>
          <span className="ingredient_quantity">{`${this.props.amount} ${this.props.measurement}`}</span>
          <button onClick={this.handleClick} className="btn btn-secondary ml-2">Remove</button>
        </li>
      )
    }
  }
}

export default Ingredient