import React, { Component } from 'react'
import { Redirect } from 'react-router'

class AddCategory extends Component {

  constructor(props) {
    super(props)
    this.state = {
      categoryName: "",
      categoryImage: "",
      imageInput: "",
      currentPage: 1,
      perPage: 30,
      redirect: false,
      searchResults: {
        results: []
      }
    }
    this.handleMoreButtonClick = this.handleMoreButtonClick.bind(this)
    this.handleImageSearch = this.handleImageSearch.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onInputChange = e => this.setState({[e.target.name]: e.target.value})

  
  handleImageSearch(){
    if(this.state.imageInput.length > 0){
      fetch(`/api/unsplash/${this.state.imageInput}/${this.state.currentPage}/${this.state.perPage}`)
      .then(response => response.json())
      .then(data => this.setState({searchResults: {...data, keyword: this.state.imageInput}}))
    }
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

  renderMoreButton() {
    if (this.state.searchResults.results.length > 0 && this.state.currentPage < this.state.searchResults.total_pages) { 
      return (
        <div className="thumbnail unsplash more" onClick={this.handleMoreButtonClick}>
          <span>More... {`(${this.state.searchResults.total_pages - this.state.currentPage})`}</span>
        </div>
      )
    }
  }

  handleMoreButtonClick(){
    let currentResults = [...this.state.searchResults.results]
    this.setState({currentPage: this.state.currentPage + 1},() => {
      fetch(`/api/unsplash/${this.state.searchResults.keyword}/${this.state.currentPage}/${this.state.perPage}`)
      .then(response => response.json())
      .then(data => this.setState(
        {
          searchResults: {
            ...this.state.searchResults,
            results: [...currentResults, ...data.results]
        }
      }))
    })
  }

  handleThumbnailClick(e){
    let chosenResultIndex = this.state.searchResults.results.findIndex(result => result.id === e.target.id);
    let thumbnails = document.querySelectorAll(".thumbnail")
    thumbnails.forEach(thumbnail => thumbnail.classList.remove("chosen"))
    thumbnails[chosenResultIndex].classList.add("chosen")
    this.setState({categoryImage: this.state.searchResults.results[chosenResultIndex]})
  }

  handleSubmit() {
    let categoryInfo = {title: this.state.categoryName, image: this.state.categoryImage}
    fetch(`/api/category`, {
      method: 'POST',
      headers: { "Content-Type": "application/json; charset=utf-8", 'Accept': 'application/json' },
      body: JSON.stringify(categoryInfo)
    })
      .then(() => {
        this.setState({redirect: true})
      })
  }

  render() {
    if (this.state.redirect) return <Redirect to="/"/>
    return (
      <div className="addRecipe">
        <div className="top_container">
          <h1 className="title main_title mb-2">Add Category</h1>
        </div>
        <div className="center_container">
          <input type="text" value={this.state.categoryName} autoFocus className="form-control mb-2" onChange={(value) => this.onInputChange(value)} id="categoryName" name="categoryName" placeholder="Enter Category Name" />
          <div className="form-row">
            <div className="col">
              <input type="text" value={this.state.imageInput} className="form-control mb-2" onChange={(value) => this.onInputChange(value)} id="imageInput" name="imageInput" placeholder="Search Image" />
            </div>
            <div className="col">
              <button onClick={this.handleImageSearch} disabled={!!!this.state.imageInput} className="btn btn-primary">Search</button>
              <span className="ml-2">@ <a target="_blank" rel="noopener noreferrer" href={`https://unsplash.com/?utm_source=Recipes&utm_medium=referral`}>Unsplash</a></span>
            </div>
          </div>
          {this.renderImageOptionThumbnails()}
          {this.renderMoreButton()}
        </div>
        <button onClick={this.handleSubmit} disabled={!!!this.state.categoryName.length} className="btn btn-primary">Submit</button>
      </div>
    )
  }
}

export default AddCategory