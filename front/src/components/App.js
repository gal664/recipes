import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import Category from './Category'
import AddRecipe from './AddRecipe'
import Recipe from './Recipe'
import '../css/Main.scss'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="App">
          <Switch>
            <Route exact path='/' component={() => <Home />}/>
            <Route path='/add' component={() => <AddRecipe />}/>
            <Route path='/category/:id' render={(props) => <Category {...props} />}/>
            <Route path='/recipe/:id' render={(props) => <Recipe {...props} />}/>
          </Switch>
      </div>
    )
  }
}
export default App