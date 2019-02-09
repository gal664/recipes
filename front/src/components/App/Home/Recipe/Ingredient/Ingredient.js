import React, { Component } from 'react'
import './Ingredient.css'

class Ingredient extends Component {

  render() {
    return (
      <li className="ingredient">
        <span className="ingredient_name">{this.props.name}</span>
        <span className="ingredient_quantity">{`${this.props.amount} ${this.props.measurement}`}</span>
      </li>
    )
  }
}

export default Ingredient