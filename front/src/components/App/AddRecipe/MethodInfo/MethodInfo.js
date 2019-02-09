import React, { Component } from 'react'
import './MethodInfo.css'

class MethodInfo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedTimeUnit: null
    }
    this.onSelect = this.onSelect.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.stepDescription = React.createRef()
    this.stepDuration = React.createRef()
  }
  
  handleClick() {
    let methodInfo = [
      {
        description: this.stepDescription.current.value,
        duration: {
          amount: this.stepDuration.current.value,
          unit: this.state.selectedTimeUnit,
        }
      }
    ]
    this.props.onSubmitInfo(methodInfo)
  }

  onSelect(e){
    this.setState({ selectedTimeUnit: e.target.value })
  }

  render() {
    return (
      <div className="MethodInfo">
        <textarea className="form-control" ref={this.stepDescription} id="methodStep" rows="5" placeholder="Enter Step Description"></textarea>
        <div className="form-row">
          <div className="col">
            <input type="number" className="form-control" ref={this.stepDuration} id="stepDuration" placeholder="Enter Duration" />
          </div>
          <div className="col">
            <select className="form-control" onChange={this.onSelect} id="unitType">
              <option hidden>Choose Time Unit</option>
              <option>Days</option>
              <option>Hours</option>
              <option>Minutes</option>
              <option>Seconds</option>
            </select>
          </div>
        </div>
        <button onClick={this.handleClick} className="btn btn-primary">Submit</button>
      </div>
    )
  }
}

export default MethodInfo