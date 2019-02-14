import React, { Component } from 'react'
import './IngredientsInfo.css'
import Ingredient from '../../Home/Recipe/Ingredient/Ingredient'

class IngredientsInfo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ingredients: this.props.ingredients,
      listIndex: this.props.ingredients.length,
      isInputsEmpty: true,
      ingredientName: "",
      ingredientAmount: "",
      unitType: ""
    }
    
    this.handleClickNext = this.handleClickNext.bind(this)
    this.handleClickAdd = this.handleClickAdd.bind(this)
    this.removeIngredient = this.removeIngredient.bind(this)
    this.toggleAddButtonDisable = this.toggleAddButtonDisable.bind(this)

    this.ingredientName = React.createRef()
    this.ingredientAmount = React.createRef()
    this.unitType = React.createRef()
  }

  handleClickNext = () => this.props.onSubmitInfo(this.state.ingredients)

  onInputChange = e => this.setState({[e.target.name]: e.target.value}, () => this.toggleAddButtonDisable())

  handleClickAdd() {
    let index = this.state.listIndex
    let ingredientInfo = {
      name: this.state.ingredientName,
      amount: this.state.ingredientAmount,
      measurement: this.state.unitType,
      id: index,
      key: index,
    }

    this.setState(prevState => ({ ingredients: [...prevState.ingredients, ingredientInfo], listIndex: index + 1 }), () => {
      this.ingredientName.current.value = ""
      this.ingredientAmount.current.value = ""
      this.unitType.current.value = "Choose Unit Type"
      this.setState({
        ingredientName: "",
        ingredientAmount: "",
        unitType: ""
      }, () => this.toggleAddButtonDisable(), this.props.onUpdateInfo(this.state.ingredients))
    })
  }

  removeIngredient(id){
    let ingredientsCopy = [...this.state.ingredients]
    var ingredientToDelete = ingredientsCopy.find(ingredient => ingredient.id === id)
    ingredientsCopy.splice(ingredientsCopy.indexOf(ingredientToDelete), 1);
    this.setState({ingredients: ingredientsCopy}, this.props.onUpdateInfo(ingredientsCopy))
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
    if (this.state.ingredientName && this.state.ingredientAmount && this.state.unitType) {
      this.setState({isInputsEmpty: false})
    } else this.setState({isInputsEmpty: true})
  }

  render() {
    return (
      <div className="IngredientsInfo">
        <div className="addIngredientContainer">
          <input type="text" autoFocus className="form-control mb-2" onChange={(value) => this.onInputChange(value)} ref={this.ingredientName} name="ingredientName" id="ingredientName" placeholder="Enter Ingredient Name" />
          <input type="number" className="form-control mb-2" onChange={(value) => this.onInputChange(value)} ref={this.ingredientAmount} name="ingredientAmount" id="ingredientAmount" placeholder="Enter Ingredient Amount" />
          <select className="form-control mb-2" name="unitType" onChange={(value) => this.onInputChange(value)} ref={this.unitType} id="unitType">
            <option hidden>Choose Unit Type</option>
            <option>Miligrams</option>
            <option>Grams</option>
            <option>Kilograms</option>
            <option>Teaspoons</option>
            <option>Tablespoons</option>
            <option>Cups</option>
          </select>
          <button onClick={this.handleClickAdd} disabled={this.state.isInputsEmpty} className="btn btn-secondary mt-2">Add Ingredient</button>
        </div>
        <div className="ingredients_container">
            <h2 className="title sub_title">Ingredients</h2>
            <ul className="ingredients_list">
              {this.renderIngredients()}
            </ul>
          </div>
        <div className="footer">
          <button onClick={this.props.onClickBack} className="btn btn-secondary">Back</button>
          <button onClick={this.handleClickNext} disabled={!!!this.state.ingredients.length} className="btn btn-primary">Next</button>
        </div>
      </div>
    )
  }
}

export default IngredientsInfo