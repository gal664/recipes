import React, { Component } from 'react'
import './RecipeInfo.css'

class RecipeInfo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isInputsEmpty: true,
      recipeTitleInput: this.props.info.title,
      recipeAuthorInput: this.props.info.author,
      sourceNameInput: this.props.info.source.name,
      sourceUrlInput: this.props.info.source.url,
      categoryOption: "",
    }
    
    this.handleClick = this.handleClick.bind(this)
    this.toggleNextButtonDisable = this.toggleNextButtonDisable.bind(this)
    this.categoryOption = React.createRef()
  }
  
  componentWillMount() {
    fetch('/api/category')
      .then(response => response.json())
      .then(data => this.setState({ categories: data }, () => this.setState({ isLoading: false })))
  }

  componentDidMount = () => this.toggleNextButtonDisable()

  handleClick() {
    let recipeInfo = {
      title: this.state.recipeTitleInput,
      author: this.state.recipeAuthorInput,
      source: { name: this.state.sourceNameInput, url: this.state.sourceUrlInput },
      category: this.state.categoryOption
    }

    this.props.onSubmitInfo(recipeInfo)
  }
  
  toggleNextButtonDisable() {
    if (this.state.recipeTitleInput &&
      this.state.recipeAuthorInput &&
      this.state.sourceNameInput &&
      this.state.sourceUrlInput &&
      this.state.categoryOption) {
      this.setState({isInputsEmpty: false})
    } else this.setState({isInputsEmpty: true})
  }

  onInputChange(e) {
    this.setState({[e.target.name]: e.target.value}, () => this.toggleNextButtonDisable())
  }

  renderCategoryOptions() {    
    let categoriesCopy = [...this.state.categories]
    return categoriesCopy.map(category => <option key={category._id} value={category._id}>{category.title}</option>)
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
      <div className="RecipeInfo">
        <input type="text" value={this.state.recipeTitleInput} autoFocus className="form-control mb-2" onChange={(value) => this.onInputChange(value)} id="recipeTitleInput" name="recipeTitleInput" placeholder="Enter Recipe Name" />
        <input type="text" value={this.state.recipeAuthorInput} className="form-control mb-2" onChange={(value) => this.onInputChange(value)} id="recipeAuthorInput" name="recipeAuthorInput" placeholder="Enter Recipe Author Name" />
        <input type="text" value={this.state.sourceNameInput} className="form-control mb-2" onChange={(value) => this.onInputChange(value)} id="sourceNameInput" name="sourceNameInput" placeholder="Enter Recipe Source Name" />
        <input type="text" value={this.state.sourceUrlInput} className="form-control mb-2" onChange={(value) => this.onInputChange(value)} id="sourceUrlInput" name="sourceUrlInput" placeholder="Enter Recipe Source URL" />
        <select className="form-control mb-2" name="categoryOption" onChange={(value) => this.onInputChange(value)} ref={this.categoryOption} id="categoryOption">
          <option hidden>Category</option>
          {this.renderCategoryOptions()}
        </select>
        <button onClick={this.handleClick} disabled={this.state.isInputsEmpty} className="btn btn-primary mb-2 mt-2">Next</button>
      </div>
    )
  }
}

export default RecipeInfo