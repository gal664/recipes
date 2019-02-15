import React, { Component } from 'react'
import './CategoryPage.css'
import Recipe from './Recipe/Recipe'

class CategoryPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      recipes: [],
      isLoading: true
    }
  }

  componentWillMount() {
    fetch(`/api/recipe?category=${this.props.match.params.id}`)
      .then(response => response.json())
      .then(data => this.setState({ recipes: data }, () => this.setState({ isLoading: false })))
  }

  renderRecipes() {
    return this.state.recipes
      .map(recipe => <Recipe
        key={recipe._id}
        id={recipe._id}
      />)
  }

  render() {
    if (this.state.isLoading) return (
      <div className="homepage homepage_loading">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
    
    return (
      <div className="categoryPage">
        {this.renderRecipes()}
      </div> )
  }
}

export default CategoryPage