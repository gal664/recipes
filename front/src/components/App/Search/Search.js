import React, { Component } from 'react'
import './Search.css'

class Search extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  componentWillMount() {
    fetch('/api/category')
      .then(response => response.json())
      .then(data => this.setState({ categories: data }, () => this.setState({ isLoading: false })))
  }
  
  onInputChange = e => this.setState({ [e.target.name]: e.target.value }, () => this.onSearchParams())

  renderCategoryOptions() {    
    let categoriesCopy = [...this.state.categories]
    return categoriesCopy.map(category => <option key={category._id} value={category._id}>{category.title}</option>)
  }

  onSearchParams() {
    let query = ""
    if (this.state.recipeTitle) query += `title=${this.state.recipeTitle}`
    if (this.state.category) query += `category=${this.state.category}`
    
    fetch(`/api/recipe?${query}`)
    .then(response => response.json())
    .then(data => this.setState({ results: data }))
  }

  renderSearchResults() {
    if (this.state.results) {
      return this.state.results
        .map(result => <li key={result.id}>{result.title}</li>)
    }
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
      <div className="searchPage">
        <input type="text" onChange={(value) => this.onInputChange(value)} className="form-control" id="searchInput" name="searchInput" placeholder="Search recipe..."></input>
        <select name="category" id="inputState" onChange={(value) => this.onInputChange(value)} className="form-control mt-2">
          <option hidden>Category</option>
          {this.renderCategoryOptions()}
        </select>
        <div className="results_container">
          <h2 className="title sub_title">Search Results</h2>
          <ul className="search_results">
            {this.renderSearchResults()}
          </ul>
        </div>
      </div>
    )
  }
}

export default Search

