import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Loader from './Loader'
import Navbar from './Navbar'

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
        <NavLink to={`/category/${result._id}`} key={result._id} category={result}>
            <div className="thumbnail" image={result.image} title={result.title} style={{background: `url(${result.image.urls.small}) center/cover`, color: result.image.color}}>
              <span className="thumbnail_title">{result.title}</span>
            </div>
        </NavLink>
      )
  }

  render() {
    if (this.state.isLoading) return <Loader/>
    return (
      <div className="homepage">
        <Navbar title="Categories"/>
        {this.renderCategories()}
      </div>
    )
  }
}

export default Home