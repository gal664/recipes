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
      info: {
        title: null,
        author: null,
        source: { name: null, url: null },
      },
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
        <RecipeInfo onSubmitInfo={this.setRecipeInfo} info={this.state.info} />
      )
    }
    if (!this.state.isIngredients && this.state.isInfo) {
      return (
        <IngredientsInfo onSubmitInfo={this.setIngredients} ingredients={this.state.ingredients} />
      )
    }
    if (!this.state.isMethod && this.state.isIngredients) {
      return (
        <MethodInfo onSubmitInfo={this.setMethod} method={this.state.method} />
      )
    }
  }

  setRecipeInfo(recipeInfoValues) {

    this.setState({
      info: recipeInfoValues,
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
      title: this.state.info.title,
      author: this.state.info.author,
      source: this.state.info.source,
      ingredients: this.state.ingredients,
      method: this.state.method,
    }

    fetch(`/api/recipe`, {
      method: 'POST',
      headers: { "Content-Type": "application/json; charset=utf-8", 'Accept': 'application/json' },
      body: JSON.stringify(recipeInfo)
    })
      .then(() => {
        this.setState({redirect: true})
      })
  }

  trackProgress(){
    const valueMin = 0
    const valueMax = 100
    const StepsAmount = 3
    let valueNow = 0

    if(this.state.isInfo) valueNow = Math.round(valueMax / StepsAmount * 1)
    if(this.state.isIngredients) valueNow = Math.round(valueMax / StepsAmount * 2)
    if(this.state.isMethod) valueNow = Math.round(valueMax / StepsAmount * 3)
    
    return (
      <div className="progress-bar" role="progressbar" style={{width: `${valueNow}%`}} aria-valuenow={valueNow} aria-valuemin={valueMin} aria-valuemax={valueMax}></div>
    )
  }

  handleClickBack(){
    // if(this.state.isMethod){
    //   return ()
    // }
  }
  render() {
    if (this.state.redirect) return <Redirect to="/"/>
    return (
      <div className="addRecipe">
        <div className="top_container">
          <h1 className="title main_title mb-2">Add Recipe</h1>
          <div className="progress mb-4" style={{height: "15px"}}>
            {this.trackProgress()}
          </div>
        </div>
        <div className="center_container">
          {this.handleClick()}
        </div>
        <div className="bottom_container">
          <i className="fas fa-chevron-left" onClick={this.handleClickBack}></i>
        </div>
      </div>
    )
  }
}

export default AddRecipe