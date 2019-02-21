import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Loader from './Loader'

class Category extends Component {

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
      .map(recipe =>
        <NavLink to={`/recipe/${recipe._id}`} key={recipe._id}>
          <div className="recipe_thumbnail">
            <span>{recipe.title}</span>
          </div>
        </NavLink>
      )
  }

  render() {
    if (this.state.isLoading) return <Loader/>    
    return (
      <div className="Category">
        {this.renderRecipes()}
      </div> )
  }
}

export default Category