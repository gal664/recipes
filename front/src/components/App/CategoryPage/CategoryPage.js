import React, { Component } from 'react'
import './CategoryPage.css'
import Recipe from './Recipe/Recipe'

class CategoryPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      recipes: []
    }
  }

  componentWillMount() {
    fetch(`/api/recipe?category=${this.props.match.params.id}`)
      .then(response => response.json())
      .then(data => this.setState({ recipes: data }))
  }

  renderRecipes() {
    return this.state.recipes
      .map(recipe => <Recipe
        key={recipe._id}
        id={recipe._id}
      />)
  }

  render() {
    return (
      <div className="categoryPage">
        {this.renderRecipes()}
      </div> )
  }
}

export default CategoryPage