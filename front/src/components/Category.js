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
      .map(result =>
        <NavLink to={`/recipe/${result._id}`} key={result._id}>
          <div className="thumbnail" style={{background: `url(${result.image}) center/cover`}}>
            <span className="thumbnail_title">{result.title}</span>
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