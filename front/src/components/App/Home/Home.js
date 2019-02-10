import React, { Component } from 'react'
import './Home.css'
import Recipe from './Recipe/Recipe'

class Home extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      recipes: []
    }
  }
  
  componentWillMount() {
    fetch("/api/recipe")
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
    if(!this.state.recipes) return <div>loading...</div>  
    return (
      <div className="homepage">
        {this.renderRecipes()}
      </div>
    )
  }
}

export default Home