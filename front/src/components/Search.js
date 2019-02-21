import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Loader from './Loader'

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
    let query = []
    if (this.state.searchInput) query.push(`title=${this.state.searchInput}`)
    if (this.state.category) query.push(`category=${this.state.category}`)
    
    for (let i = 1; i < query.length; i++){
      query[i] = `&${query[i]}`
    }
    
    fetch(`/api/recipe?${query.join("")}`)
    .then(response => response.json())
    .then(data => this.setState({ results: data }))
  }

  renderSearchResults() {
    if(this.state.results){
      return this.state.results
        .map(result =>
          <NavLink to={`/recipe/${result._id}`} key={result._id}>
            <div className="thumbnail" style={{background: `url(${result.image}) center/cover`}}>
              <span className="thumbnail_title">{result.title}</span>
            </div>
          </NavLink>
        )
    }
  }

  render() {
    if (this.state.isLoading) return <Loader/>
    return (
      <div className="searchPage">
        <h1 className="title main_title mb-2">Search</h1>
        <input type="text" onChange={(value) => this.onInputChange(value)} className="form-control" id="searchInput" name="searchInput" placeholder="Search recipe..."></input>
        <select name="category" id="inputState" onChange={(value) => this.onInputChange(value)} className="form-control mt-2">
          <option hidden>Category</option>
          {this.renderCategoryOptions()}
        </select>
        <div className="results_container">
          <h2 className="title sub_title">Search Results</h2>
          {this.renderSearchResults()}
        </div>
      </div>
    )
  }
}

export default Search

