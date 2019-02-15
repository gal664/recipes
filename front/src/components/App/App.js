import React, { Component } from 'react'
import './App.css'
import Navbar from './Navbar/Navbar'
import Home from './Home/Home'
import AddRecipe from './AddRecipe/AddRecipe'
import CategoryPage from './CategoryPage/CategoryPage'
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
            <Route path='/add' component={() => <AddRecipe />}/>
            <Route
              path='/category/:id'
              // component={() => <CategoryPage />}
              render={(props) => <CategoryPage {...props} />}
            />
          </Switch>
        </div>
      </div>
    )
  }
}
export default App