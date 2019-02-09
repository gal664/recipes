import React, { Component } from 'react'
import './Recipe.css'
import Ingredient from './Ingredient/Ingredient'
import MethodStep from './MethodStep/MethodStep'

class Recipe extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    fetch(`/api/recipe/${this.props.id}`)
      .then(response => response.json())
      .then(data => this.setState(
        {
          title: data.title,
          author: data.author,
          sourceUrl: data.source.url,
          sourceName: data.source.name,
          ingredients: data.ingredients,
          method: data.method
        }
      ))
  }

  renderIngredients() {
    if (this.state.ingredients) {
      return this.state.ingredients
        .map(ingredient => <Ingredient
          key={ingredient._id}
          id={ingredient._id}
          amount={ingredient.amount}
          measurement={ingredient.measurement}
          name={ingredient.name}
        />)
    }
  }

  renderMethod_steps() {
    if (this.state.method) {
      return this.state.method
        .map(method_step => <MethodStep
          key={method_step._id}
          id={method_step._id}
          description={method_step.description}
          duration={method_step.duration}
        />)
    }
  }

  render() {
    return (
      <div className="recipe">
        <h1 className="title main_title">{this.state.title}</h1>
        <span className="metadata">By {this.state.author} @ <a href={this.state.sourceUrl} >{this.state.sourceName}</a></span>
        <div className="main_container">
          <div className="ingredients_container">
            <h2 className="title sub_title">Ingredients</h2>
            <ul className="ingredients_list">
              {this.renderIngredients()}
            </ul>
          </div>
          <div className="method_container">
            <h2 className="title sub_title">Method</h2>
            <ol className="method_list">
              {this.renderMethod_steps()}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default Recipe