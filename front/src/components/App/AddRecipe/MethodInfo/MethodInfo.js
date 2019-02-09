import React, { Component } from 'react'
import './MethodInfo.css'

class MethodInfo extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
    this.stepDescription = React.createRef()
    this.stepDurationHours = React.createRef()
    this.stepDurationMinutes = React.createRef()
    this.stepDurationSeconds = React.createRef()
  }
  
  handleClick() {
    let methodInfo = [
      {
        description: this.stepDescription.current.value,
        duration: {
          hours: this.stepDurationHours.current.value,
          minutes: this.stepDurationMinutes.current.value,
          seconds: this.stepDurationSeconds.current.value,
        }
      }
    ]
    this.props.onSubmitInfo(methodInfo)
  }

  render() {
    return (
      <div className="MethodInfo">
        <textarea required className="form-control" ref={this.stepDescription} id="methodStep" rows="5" placeholder="Enter Step Description"></textarea>
        <input required type="number" className="form-control" ref={this.stepDurationHours} id="stepDurationHours" placeholder="Enter Duration Hours" />
        <input required type="number" className="form-control" ref={this.stepDurationMinutes} id="stepDurationMinutes" placeholder="Enter Duration Minutes" />
        <input required type="number" className="form-control" ref={this.stepDurationSeconds} id="stepDurationSeconds" placeholder="Enter Duration Seconds" />
        <button onClick={this.handleClick} className="btn btn-primary">Submit</button>
      </div>
    )
  }
}

export default MethodInfo