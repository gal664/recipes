import React, { Component } from 'react'
import './MethodStep.css'

class MethodStep extends Component {

  render() {
    return (
      <li className="step">
      <span className="step_duration">{`${this.props.duration.hours}:${this.props.duration.minutes}:${this.props.duration.seconds}`}</span>
      <span className="step_description">{this.props.description}</span>
    </li>
    )
  }
}

export default MethodStep