import React, { Component } from 'react'
import './App.css'
import Recipe from './Recipe/Recipe'

class App extends Component {
  
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
    return (
      <div className="App">
        <div className="content_container">
        {this.renderRecipes()}
        </div>
      </div>
    )
  }
}

export default App