import React, { Component } from 'react'
import Ingredient from './Ingredient'
import MethodStep from './MethodStep'
import Loader from './Loader'

class Recipe extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: null,
      author: null,
      sourceUrl: null,
      sourceName: null,
      category: null,
      image: null,
      ingredients: [],
      method: [],
      isLoading: true
    }
  }
  
  componentWillMount() {
    fetch(`/api/recipe/${this.props.match.params.id}`)
    .then(response => response.json())
    .then(data => this.setState(
      {
        title: data.title,
        author: data.author,
        sourceUrl: data.source.url,
        sourceName: data.source.name,
        category: data.category,
        image: data.image,
        ingredients: data.ingredients,
        method: data.method
      },
         () => this.setState({ isLoading: false })
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
          type="displayOnly"
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
          type="displayOnly"
        />)
    }
  }

  renderRecipeDuration() {
    let total = 0 // in seconds
    let method = this.state.method

    if (method.length > 0) {
      method.forEach(step => {
        switch (step.duration.unit) {
          case "Days":
          total += step.duration.amount * 86400 // number of days times the number of seconds in a day
          break;
          case "Hours":
          total += step.duration.amount * 3600 // number of hours times the number of seconds in an hour
            break;
          case "Minutes":
            total += step.duration.amount * 60 // number of minutes times the number of seconds in an minute
            break;
          case "Seconds":
            total += step.duration.amount // number of seconds added to total
            break;
          default:
            total += step.duration.amount // number of seconds added to total
            break;
        }
      })
    }

    if (total >= 0 && total < 60) {
      if (total === 1) return `${total} second`
      return `${total} seconds`
    }

    if (total >= 60 && total < 3600) {
      total = Math.round(total / 60)

      if (total === 1) return `${total} minute`
      return `${total} minutes`
    }

    if (total >= 3600 && total < 86400) {
      total = Math.round(total / 3600)

      if (total === 1) return `${total} hour`
      return `${total} hours`
    }
    
    if (total >= 86400) {
      total = Math.round(total / 86400)

      if (total === 1) return `${total} day`
      return `${total} days`
    }
  }

  render() {
    if (this.state.isLoading) return <Loader/>
    return (
      <div className="recipe">
        <h1 className="title main_title">{this.state.title}</h1>
        <div className="metadata">
          <span role="img" aria-label="author">👩‍🍳</span> {this.state.author}<br/>
          <span role="img" aria-label="source">⚓</span> <a href={this.state.sourceUrl} target="_blank" rel="noopener noreferrer" >{this.state.sourceName}</a><br/>
          <span role="img" aria-label="duration">⏲️</span> {this.renderRecipeDuration()}
        </div>
        <img className="recipe_image" src={this.state.image.urls.small} alt={this.state.title}/>
        <span role="img" aria-label="camera">📷</span> <a href={this.state.image.user.links.html} target="_blank" rel="noopener noreferrer" >{this.state.image.user.name}</a><br/>
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