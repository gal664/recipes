import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Loader from './Loader'

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      isLoading: true
    }
  }

  componentWillMount() {
    fetch("/api/category")
      .then(response => response.json())
      .then(data => this.setState({ categories: data }, () => this.setState({ isLoading: false })))
  }

  renderCategories() {
    return this.state.categories
      .map(result =>
        <NavLink to={`/category/${result._id}`} key={result._id}>
            <div className="thumbnail" style={{background: `url(${result.image}) center/cover`}}>
              <span className="thumbnail_title">{result.title}</span>
            </div>
        </NavLink>
      )
  }

  render() {
    if (this.state.isLoading) return <Loader/>
    return (
      <div className="homepage">
        {this.renderCategories()}
      </div>
    )
  }
}

export default Home