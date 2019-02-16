import React, { Component } from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import Home from './Home/Home'
import AddRecipe from './AddRecipe/AddRecipe'
import Category from './Category/Category'
import Search from './Search/Search'
import Recipe from './Recipe/Recipe'

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
            <Route path='/add' component={() => <AddRecipe />}/>
            <Route path='/search' component={() => <Search />}/>
            <Route path='/category/:id' render={(props) => <Category {...props} />}/>
            <Route path='/recipe/:id' render={(props) => <Recipe {...props} />}/>
          </Switch>
        </div>
      </div>
    )
  }
}
export default App