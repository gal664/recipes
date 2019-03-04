import React, { Component } from 'react'

class MethodStep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDeleted: false,
      type: this.props.type
    }
    this.handleClick = this.handleClick.bind(this)
  }

  calculateDurationValue() {
    let amount = this.props.duration.amount
    let unit = this.props.duration.unit

    if (amount === 1) {
      unit = unit.slice(0, -1) // remove letter s from unit string
    }

    return (
      <div className="step_duration">{`${amount} ${unit}`}</div>
    )
  }

  handleClick = () => {
    this.props.onRemove(this.props.id)
    this.setState({ isDeleted: true })
  }

  render() {
    if (this.state.isDeleted === false) {
      if (this.props.type === "displayOnly") {
        return (
          <li className="step">
            <p className="step_description">{this.props.description}</p>
            {this.calculateDurationValue()}
          </li>
        )
      } else if (this.props.type === "editable") {
        return (
          <li className="step">
            <p className="step_description">{this.props.description}</p>
            <div className="step_metadata">
              {this.calculateDurationValue()}
              <div onClick={this.handleClick} className="badge badge-danger">Remove</div>
            </div>
          </li>
        )
      }
    } else if (this.state.isDeleted === true) return (null)
  }
}

export default MethodStep