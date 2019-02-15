import React, { Component } from 'react'
import './Home.css'
import CategoryThumbnail from './CategoryThumbnail/CategoryThumbnail'

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      categories: []
    }
  }

  componentWillMount() {
    fetch("/api/category")
      .then(response => response.json())
      .then(data => this.setState({ categories: data }))
  }

  renderCategories() {
    return this.state.categories
      .map(category =>
        <CategoryThumbnail
          title={category.title}
          id={category._id}
          key={category._id}
        />
      )
  }

  render() {
    if (this.state.categories.length === 0) return (
      <div className="homepage homepage_loading">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )

    return (
      <div className="homepage">
        {this.renderCategories()}
      </div>
    )
  }
}

export default Home