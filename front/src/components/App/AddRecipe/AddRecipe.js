import React, { Component } from 'react'
import './AddRecipe.css'

class AddRecipe extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.recicpeTitle = React.createRef()
    this.recipeAuthor = React.createRef()
    this.sourceName = React.createRef()
    this.sourceUrl = React.createRef()
    this.IngredientName = React.createRef()
    this.IngredientAmount = React.createRef()
    this.IngredientMeasurement = React.createRef()
    this.stepDescription = React.createRef()
    this.stepDurationHours = React.createRef()
    this.stepDurationMinutes = React.createRef()
    this.stepDurationSeconds = React.createRef()
  }

  handleSubmit() {

    let recipeInfo = {
      title: this.recicpeTitle.current.value,
      author: this.recipeAuthor.current.value,
      source: {
        name: this.sourceName.current.value,
        url: this.sourceUrl.current.value
      },
      ingredients: [
      {
        name: this.IngredientName.current.value,
        amount: this.IngredientAmount.current.value,
        measurement: this.IngredientMeasurement.current.value,
      }
      ],
      method: [
        {
          description: this.stepDescription.current.value,
          duration: {
            hours: this.stepDurationHours.current.value,
            minutes: this.stepDurationMinutes.current.value,
            seconds: this.stepDurationSeconds.current.value,
          },
        }
      ],
    }

    fetch(`/api/recipe`, {
      method: 'POST',
      headers: { "Content-Type": "application/json; charset=utf-8", 'Accept': 'application/json' },
      body: JSON.stringify(recipeInfo)
    })
      .then(() => console.log("done"))
  }

  render() {
    return (
      <div className="addRecipe">
          <input value="asd" type="text" className="form-control" ref={this.recicpeTitle} id="recipeTitleInput" placeholder="Enter Recipe Name" />
          <input value="asd" type="text" className="form-control" ref={this.recipeAuthor} id="recipeAuthorInput" placeholder="Enter Recipe Author Name" />
          <input value="asd" type="text" className="form-control" ref={this.sourceName} id="sourceNameInput" placeholder="Enter Recipe Source Name" />
          <input value="asd" type="text" className="form-control" ref={this.sourceUrl} id="sourceUrlInput" placeholder="Enter Recipe Source URL" />
          <input value="asd" type="text" className="form-control" ref={this.IngredientName} id="ingredientName" placeholder="Enter Ingredient Name" />
          <input value="1" type="number" className="form-control" ref={this.IngredientAmount} id="ingredientAmount" placeholder="Enter Ingredient Amount" />
          <select value="Miligrams" className="form-control" ref={this.IngredientMeasurement} id="unitType">
            <option hidden>Choose Unit Type</option>
            <option>Miligrams</option>
            <option>Grams</option>
            <option>Kilograms</option>
            <option>Teaspoons</option>
            <option>Tablespoons</option>
            <option>Cup</option>
          </select>
          <textarea value="asd" className="form-control" ref={this.stepDescription} id="methodStep" rows="5" placeholder="Enter Step Description"></textarea>
          <input value="1" type="number" className="form-control" ref={this.stepDurationHours} id="stepDurationHours" placeholder="Enter Duration Hours" />
          <input value="1" type="number" className="form-control" ref={this.stepDurationMinutes} id="stepDurationMinutes" placeholder="Enter Duration Minutes" />
          <input value="1" type="number" className="form-control" ref={this.stepDurationSeconds} id="stepDurationSeconds" placeholder="Enter Duration Seconds" />
          <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Submit</button>
      </div>
    )
  }
}

export default AddRecipe