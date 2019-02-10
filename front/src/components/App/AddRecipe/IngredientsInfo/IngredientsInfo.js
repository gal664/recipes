import React, { Component } from 'react'
import './IngredientsInfo.css'
import Ingredient from '../../Home/Recipe/Ingredient/Ingredient'

class IngredientsInfo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedMeasurement: null,
      ingredients: [],
      listIndex: 0,
      isInputsEmpty: true,
    }
    this.onSelect = this.onSelect.bind(this)
    this.handleClickNext = this.handleClickNext.bind(this)
    this.handleClickAdd = this.handleClickAdd.bind(this)
    this.removeIngredient = this.removeIngredient.bind(this)
    this.toggleAddButtonDisable = this.toggleAddButtonDisable.bind(this)
    this.ingredientName = React.createRef()
    this.ingredientAmount = React.createRef()
    this.unitType = React.createRef()
  }


  handleClickNext = () => this.props.onSubmitInfo(this.state.ingredients)

  handleClickAdd() {
    let index = this.state.listIndex
    let ingredientInfo = {
      name: this.ingredientName.current.value,
      amount: this.ingredientAmount.current.value,
      measurement: this.state.selectedMeasurement,
      id: index,
      key: index
    }
    this.setState(prevState => ({ ingredients: [...prevState.ingredients, ingredientInfo], listIndex: index + 1 }), () => {
      this.ingredientName.current.value = ""
      this.ingredientAmount.current.value = ""
      this.unitType.current.value = "Choose Unit Type"
      this.setState({selectedMeasurement: null}, () => this.toggleAddButtonDisable())
    })
  }

  onSelect = e => this.setState({ selectedMeasurement: e.target.value }, () => this.toggleAddButtonDisable())
  
  removeIngredient(id){
    let ingredientsCopy = [...this.state.ingredients]
    var ingredientToDelete = ingredientsCopy.find(ingredient => ingredient.id === id)
    ingredientsCopy.splice(ingredientsCopy.indexOf(ingredientToDelete), 1);
    this.setState({ingredients: ingredientsCopy})
  }

  renderIngredients() {
    if (this.state.ingredients) {
      return this.state.ingredients
        .map(ingredient => <Ingredient
          key={ingredient.key}
          id={ingredient.id}
          amount={ingredient.amount}
          measurement={ingredient.measurement}
          name={ingredient.name}
          type="editable"
          onRemove={this.removeIngredient}
        />)
    }
  }
  
  toggleAddButtonDisable() {
    if (this.ingredientName.current.value && this.ingredientAmount.current.value && this.state.selectedMeasurement) {
      this.setState({isInputsEmpty: false})
    } else this.setState({isInputsEmpty: true})
  }

  render() {
    return (
      <div className="IngredientsInfo">
        <input type="text" autoFocus className="form-control mb-2" onChange={this.toggleAddButtonDisable} ref={this.ingredientName} id="ingredientName" placeholder="Enter Ingredient Name" />
        <input type="number" className="form-control mb-2" onChange={this.toggleAddButtonDisable} ref={this.ingredientAmount} id="ingredientAmount" placeholder="Enter Ingredient Amount" />
        <select className="form-control mb-2" ref={this.unitType} onChange={this.onSelect} id="unitType">
          <option hidden>Choose Unit Type</option>
          <option>Miligrams</option>
          <option>Grams</option>
          <option>Kilograms</option>
          <option>Teaspoons</option>
          <option>Tablespoons</option>
          <option>Cups</option>
        </select>
        <button onClick={this.handleClickAdd} disabled={this.state.isInputsEmpty} className="btn btn-primary mt-2">Add Ingredient</button>
        <div className="ingredients_container">
            <h2 className="title sub_title">Ingredients</h2>
            <ul className="ingredients_list">
              {this.renderIngredients()}
            </ul>
          </div>
        <button onClick={this.handleClickNext} disabled={!!!this.state.ingredients.length} className="btn btn-primary mt-2">Next</button>
      </div>
    )
  }
}

export default IngredientsInfo