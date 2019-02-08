import React, { Component } from 'react'
import './RecipeInfo.css'

class RecipeInfo extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
    this.recipeTitle = React.createRef()
    this.recipeAuthor = React.createRef()
    this.sourceName = React.createRef()
    this.sourceUrl = React.createRef()
  }

  handleClick() {

    let recipeInfo = {
      title: this.recipeTitle.current.value,
      author: this.recipeAuthor.current.value,
      source: { name: this.sourceName.current.value, url: this.sourceUrl.current.value }
    }

    this.props.onSubmitInfo(recipeInfo)

  }

  render() {
    return (
      <div className="RecipeInfo">
        <input required type="text" className="form-control" ref={this.recipeTitle} id="recipeTitleInput" placeholder="Enter Recipe Name" />
        <input required type="text" className="form-control" ref={this.recipeAuthor} id="recipeAuthorInput" placeholder="Enter Recipe Author Name" />
        <input required type="text" className="form-control" ref={this.sourceName} id="sourceNameInput" placeholder="Enter Recipe Source Name" />
        <input required type="text" className="form-control" ref={this.sourceUrl} id="sourceUrlInput" placeholder="Enter Recipe Source URL" />
        <button onClick={this.handleClick} className="btn btn-primary">Next</button>
      </div>
    )
  }
}

export default RecipeInfo