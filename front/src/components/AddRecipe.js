import React, { Component } from 'react'
import { Redirect } from 'react-router'
import AddRecipeInfo from './AddRecipeInfo'
import AddRecipeIngredients from './AddRecipeIngredients'
import AddRecipeMethod from './AddRecipeMethod'

class AddRecipe extends Component {

  constructor(props) {
    super(props)
    this.state = {
      info: {
        title: "",
        author: "",
        source: { name: "", url: "" },
        category: "",
        imageInput: "",
        image: "",
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
    this.updateIngredientsList = this.updateIngredientsList.bind(this)
    this.setIngredients = this.setIngredients.bind(this)
    this.updateMethodStepsList = this.updateMethodStepsList.bind(this)
    this.setMethod = this.setMethod.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClickBack = this.handleClickBack.bind(this)

  }

  handleClick() {
    if (!this.state.isInfo) {
      return (
        <AddRecipeInfo onSubmitInfo={this.setRecipeInfo} info={this.state.info} />
      )
    }
    if (!this.state.isIngredients && this.state.isInfo) {
      return (
        <AddRecipeIngredients onSubmitInfo={this.setIngredients} onUpdateInfo={this.updateIngredientsList} onClickBack={this.handleClickBack} ingredients={this.state.ingredients} />
      )
    }
    if (!this.state.isMethod && this.state.isIngredients) {
      return (
        <AddRecipeMethod onSubmitInfo={this.setMethod} onUpdateInfo={this.updateMethodStepsList} onClickBack={this.handleClickBack} method={this.state.method} />
      )
    }
  }

  setRecipeInfo(recipeInfoValues) {

    this.setState({
      info: recipeInfoValues,
      isInfo: true
    })

  }

  updateIngredientsList(ingredientsArray) {
    this.setState({ingredients: ingredientsArray})
  }
  
  setIngredients(ingredientsArray) {
    
    this.setState({
      ingredients: ingredientsArray,
      isIngredients: true
    })
    
  }
  
    updateMethodStepsList(methodStepsArray) {
      this.setState({method: methodStepsArray})
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
      category: this.state.info.category,
      image: this.state.info.image,
      ingredients: this.state.ingredients,
      method: this.state.method
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
    if(this.state.isIngredients){
      this.setState({ isIngredients: false })
      return
    }
    if(this.state.isInfo){
      this.setState({ isInfo: false })
      return
    }
  }

  handleNavbarTitle(){
    if (!this.state.isInfo) {
      return "Add recipe info"
    }
    if (!this.state.isIngredients && this.state.isInfo) {
      return "Add ingredients required"
    }
    if (!this.state.isMethod && this.state.isIngredients) {
      return "Add method and prep steps"
  }
}

  render() {
    if (this.state.redirect) return <Redirect to="/"/>
    return (
      <div className="inputForm">
        <div className="top_container">
          <div className="progress mb-4" style={{height: "15px"}}>
            {this.trackProgress()}
          </div>
        </div>
        <div className="center_container">
          {this.handleClick()}
        </div>
      </div>
    )
  }
}

export default AddRecipe