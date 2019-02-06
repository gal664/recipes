import React, { Component } from 'react'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="content_container">
          <div className="recipe">
          <h1 className="recipe_title">Recipe Name Here</h1>
          <span className="recipe_cuisine">cuisine type here</span>
          by <span className="recipe_author">author name here</span>
            <div className="ingredients_container">
              <h2 className="ingredients_title">Ingredients</h2>
              <ul className="ingredients_list">
                <li className="ingredient">
                  <span className="ingredient_title">ingredient title here</span>
                  <span className="ingredient_quantity">ingredient quantity here</span>
                </li>
              </ul>
            </div>
            <div className="method_container">
              <h2 className="method_title">Method</h2>
              <ol className="method_list">
                <li className="step">
                  <span className="step_length">HH:mm:SS</span>
                  <span className="step_description">step description here</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App