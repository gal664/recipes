import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import Category from './Category'
import AddRecipe from './AddRecipe'
import AddCategory from './AddCategory'
import Recipe from './Recipe'
import '../css/Main.scss'
import Navbar from './Navbar'
import Login from './Login'
import Register from './Register'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path='/' component={() => <Home />}/>
            <Route path='/recipe/add' component={() => <AddRecipe />}/>
            <Route path='/category/add' component={() => <AddCategory />}/>
            <Route path='/category/:id' render={(props) => <Category {...props} />}/>
            <Route path='/recipe/:id' render={(props) => <Recipe {...props} />}/>
            <Route path='/login' render={(props) => <Login />}/>
            <Route path='/register' render={(props) => <Register />}/>
          </Switch>
      </div>
    )
  }
}
export default App