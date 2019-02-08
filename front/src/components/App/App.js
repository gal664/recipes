import React, { Component } from 'react'
import './App.css'
import Navbar from './Navbar/Navbar'
import Home from './Home/Home'
import AddRecipe from './AddRecipe/AddRecipe'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="App">
        <Navbar/>
        <Home/>
        {/* <AddRecipe/> */}
      </div>
    )
  }
}

export default App