import React, { Component } from 'react'
import './Home.css'
import { NavLink } from 'react-router-dom'
import Loader from '../Loader/Loader'

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
      .map(category =>
        <NavLink to={`/category/${category._id}`} key={category._id}>
          <div className="category_thumbnail" style={{background: `url(${category.image}) center/cover`}}>
            <span>{category.title}</span>
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