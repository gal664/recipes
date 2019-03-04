import React, { Component } from 'react'
import Loader from './Loader'

class AddRecipeInfo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isInputsEmpty: true,
      searchResults: {
        results: []
      },
      searchPage: 1,
      perPage: 30,
      recipeTitleInput: this.props.info.title,
      recipeAuthorInput: this.props.info.author,
      sourceNameInput: this.props.info.source.name,
      sourceUrlInput: this.props.info.source.url,
      recipeImageInput: this.props.info.imageInput,
      recipeImage: this.props.info.image,
      categoryOption: this.props.info.category,
    }
    
    this.handleClick = this.handleClick.bind(this)
    this.handleImageSearch = this.handleImageSearch.bind(this)
    this.toggleNextButtonDisable = this.toggleNextButtonDisable.bind(this)
    this.handleMoreButtonClick = this.handleMoreButtonClick.bind(this)
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
      category: this.state.categoryOption,
      image: this.state.recipeImage,
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

  onInputChange = e => this.setState({[e.target.name]: e.target.value}, () => this.toggleNextButtonDisable())

  renderCategoryOptions() {    
    let categoriesCopy = [...this.state.categories]
    return categoriesCopy.map(category => <option key={category._id} value={category._id}>{category.title}</option>)
  }

  handleImageSearch(){
    if(this.state.recipeImageInput.length > 0){
      fetch(`/api/unsplash/${this.state.recipeImageInput}/${this.state.searchPage}/${this.state.perPage}`)
      .then(response => response.json())
      .then(data => this.setState({searchResults: {...data, keyword: this.state.recipeImageInput}}))
    }
  }

  handleThumbnailClick(e){
    let chosenResultIndex = this.state.searchResults.results.findIndex(result => result.id === e.target.id);
    let thumbnails = document.querySelectorAll(".thumbnail")
    thumbnails.forEach(thumbnail => thumbnail.classList.remove("chosen"))
    thumbnails[chosenResultIndex].classList.add("chosen")
    this.setState({recipeImage: this.state.searchResults.results[chosenResultIndex]})
  }

  renderImageOptionThumbnails(){
    return this.state.searchResults.results
      .map(result =>
        <div className="thumbnail unsplash"
          style={{background: `url(${result.urls.small}) center/cover`}}
          key={result.id}
          id={result.id}
          onClick={(value) => this.handleThumbnailClick(value)}>
          <a className="thumbnail_author" target="_blank" rel="noopener noreferrer" href={result.user.links.html + "utm_source=Recipes&utm_medium=referral"}>
            {result.user.name}
          </a>
        </div>
      )
  }

  handleMoreButtonClick(){
    let currentResults = [...this.state.searchResults.results]
    this.setState({searchPage: this.state.searchPage + 1},() => {
      fetch(`/api/unsplash/${this.state.recipeImageInput}/${this.state.searchPage}/${this.state.perPage}`)
      .then(response => response.json())
      .then(data => this.setState({searchResults: {...this.state.searchResults, results: [...currentResults, ...data.results]}}))
    })
  }

  renderMoreButton() {
    if (this.state.searchResults.results.length > 0 && this.state.searchPage < this.state.searchResults.total_pages) { 
      return (
        <div className="thumbnail unsplash more" onClick={this.handleMoreButtonClick}>
          <span>More...</span>
        </div>
      )
    }
  }

  renderCategories() {
  }

  render() {
    if (this.state.isLoading) return <Loader/>
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
        <div className="form-row">
          <div className="col">
            <input type="text" value={this.state.recipeImageInput} className="form-control mb-2" onChange={(value) => this.onInputChange(value)} id="recipeImageInput" name="recipeImageInput" placeholder="Enter Image Search Keyword" />
          </div>
          <div className="col">
            <button onClick={this.handleImageSearch} disabled={!!!this.state.recipeImageInput} className="btn btn-primary">Search</button>
            <span className="ml-2">@ <a target="_blank" rel="noopener noreferrer" href={`https://unsplash.com/?utm_source=Recipes&utm_medium=referral`}>Unsplash</a></span>
          </div>
        </div>
        {this.renderImageOptionThumbnails()}
        {this.renderMoreButton()}
        <div className="footer">
          <button onClick={this.handleClick} disabled={this.state.isInputsEmpty} className="btn btn-primary mb-2 mt-2">Next</button>
        </div>
      </div>
    )
  }
}

export default AddRecipeInfo