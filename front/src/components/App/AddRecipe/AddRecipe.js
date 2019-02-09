import React, { Component } from 'react'
import './AddRecipe.css'
import RecipeInfo from './RecipeInfo/RecipeInfo'
import IngredientsInfo from './IngredientsInfo/IngredientsInfo'
import MethodInfo from './MethodInfo/MethodInfo'
import { Redirect } from 'react-router'

class AddRecipe extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: null,
      author: null,
      source: { name: null, url: null },
      ingredients: [],
      method: [],
      isInfo: false,
      isIngredients: false,
      isMethod: false,
      redirect: false,
    }

    this.handleClick = this.handleClick.bind(this)
    this.setRecipeInfo = this.setRecipeInfo.bind(this)
    this.setIngredients = this.setIngredients.bind(this)
    this.setMethod = this.setMethod.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleClick() {
    if (!this.state.isInfo) {
      return (
        <RecipeInfo onSubmitInfo={this.setRecipeInfo} />
      )
    }
    if (!this.state.isIngredients && this.state.isInfo) {
      return (
        <IngredientsInfo onSubmitInfo={this.setIngredients} />
      )
    }
    if (!this.state.isMethod && this.state.isIngredients) {
      return (
        <MethodInfo onSubmitInfo={this.setMethod} />
      )
    }
  }

  setRecipeInfo(recipeInfoValues) {

    this.setState({
      title: recipeInfoValues.title,
      author: recipeInfoValues.author,
      source: recipeInfoValues.source,
      isInfo: true
    })

  }

  setIngredients(ingredientsArray) {

    this.setState({
      ingredients: ingredientsArray,
      isIngredients: true
    })

  }

  setMethod(methodStepsArray) {

    this.setState({
      method: methodStepsArray,
      isMethod: true
    },() => { this.handleSubmit() })
    

  }

  handleSubmit() {

    let recipeInfo = {
      title: this.state.title,
      author: this.state.author,
      source: this.state.source,
      ingredients: this.state.ingredients,
      method: this.state.method,
    }

    console.log(recipeInfo)

    fetch(`/api/recipe`, {
      method: 'POST',
      headers: { "Content-Type": "application/json; charset=utf-8", 'Accept': 'application/json' },
      body: JSON.stringify(recipeInfo)
    })
      .then(() => {
        this.setState({redirect: true})
        console.log("done")
      })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/"/>
    }
    
    return (
      <div className="addRecipe">
        {this.handleClick()}
      </div>
    )
  }
}

export default AddRecipe