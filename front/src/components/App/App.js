import React, { Component } from 'react'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import Home from './Home/Home'
import AddRecipe from './AddRecipe/AddRecipe'
import CategoryPage from './CategoryPage/CategoryPage'
import Search from './Search/Search'

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
            <Route path='/category/:id' render={(props) => <CategoryPage {...props} />}/>
            <Route path='/search' component={() => <Search />}/>
          </Switch>
        </div>
      </div>
    )
  }
}
export default App