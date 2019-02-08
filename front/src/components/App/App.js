import React, { Component } from 'react'
import './App.css'
import Navbar from './Navbar/Navbar'
import Home from './Home/Home'
import AddRecipe from './AddRecipe/AddRecipe'
import { Route, Switch } from 'react-router-dom'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="contentContainer">
          <Switch>
            <Route exact path='/' component={() => <Home />}/>
            <Route path='/addRecipe' component={() => <AddRecipe />}/>
          </Switch>
        </div>
      </div>
    )
  }
}
export default App