import React, { Component } from 'react'
import './MethodStep.css'

class MethodStep extends Component {

  calculateDurationValue(){
    let amount = this.props.duration.amount
    let unit = this.props.duration.unit
    
    if(amount === 1){
      unit = unit.slice(0, -1) // remove letter s from unit string
    }

    return(
      <div className="step_duration">{`${amount} ${unit}`}</div>
    )
  }

  render() {
    return (
      <li className="step">
      <span className="step_description">{this.props.description}</span>
      {this.calculateDurationValue()}
    </li>
    )
  }
}

export default MethodStep