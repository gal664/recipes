import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './CategoryThumbnail.css'

class CategoryThumbnail extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
    <NavLink to={`/category/${this.props.id}`}>
      <div className="category_thumbnail">
        <span>{this.props.title}</span>
      </div>
    </NavLink>
    )
  }
}

export default CategoryThumbnail