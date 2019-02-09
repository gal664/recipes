import React, { Component } from 'react'
import './IngredientsInfo.css'

class IngredientsInfo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedMeasurement: null
    }
    this.onSelect = this.onSelect.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.IngredientName = React.createRef()
    this.IngredientAmount = React.createRef()
  }

  onSelect(e){
    this.setState({ selectedMeasurement: e.target.value })
  }

  handleClick() {

    let IngredientsInfo = [
      {
        name: this.IngredientName.current.value,
        amount: this.IngredientAmount.current.value,
        measurement: this.state.selectedMeasurement,
      }
    ]
    console.log(IngredientsInfo)
    
    this.props.onSubmitInfo(IngredientsInfo)

  }

  render() {
    return (
      <div className="IngredientsInfo">
        <input type="text" className="form-control" ref={this.IngredientName} id="ingredientName" placeholder="Enter Ingredient Name" />
        <input type="number" className="form-control" ref={this.IngredientAmount} id="ingredientAmount" placeholder="Enter Ingredient Amount" />
        <select className="form-control" onChange={this.onSelect} id="unitType">
          <option hidden>Choose Unit Type</option>
          <option>Miligrams</option>
          <option>Grams</option>
          <option>Kilograms</option>
          <option>Teaspoons</option>
          <option>Tablespoons</option>
          <option>Cup</option>
        </select>
        <button onClick={this.handleClick} className="btn btn-primary">Next</button>
      </div>
    )
  }
}

export default IngredientsInfo