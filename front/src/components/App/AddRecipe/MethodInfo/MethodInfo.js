import React, { Component } from 'react'
import './MethodInfo.css'
import MethodStep from '../../Home/Recipe/MethodStep/MethodStep'

class MethodInfo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedTimeUnit: null,
      method: [],
      listIndex: 0,
      isInputsEmpty: true,
    }
    this.onSelect = this.onSelect.bind(this)
    this.handleClickSubmit = this.handleClickSubmit.bind(this)
    this.handleClickAdd = this.handleClickAdd.bind(this)
    this.removeStep = this.removeStep.bind(this)
    this.toggleAddButtonDisable = this.toggleAddButtonDisable.bind(this)
    this.stepDescription = React.createRef()
    this.stepDuration = React.createRef()
    this.unitType = React.createRef()
  }

  handleClickSubmit = () => this.props.onSubmitInfo(this.state.method)

  handleClickAdd() {
    let index = this.state.listIndex
    let stepInfo = {
      description: this.stepDescription.current.value,
      duration: {
        amount: this.stepDuration.current.value,
        unit: this.state.selectedTimeUnit,
      },
      id: index,
      key: index
    }
    this.setState(prevState => ({ method: [...prevState.method, stepInfo], listIndex: index + 1 }), () => {
      this.stepDescription.current.value = ""
      this.stepDuration.current.value = ""
      this.unitType.current.value = "Choose Unit Type"
      this.setState({ selectedTimeUnit: null }, () => this.toggleAddButtonDisable())
    })
  }

  onSelect = e => this.setState({ selectedTimeUnit: e.target.value }, () => this.toggleAddButtonDisable())

  removeStep(id) {
    let methodCopy = [...this.state.method]
    var stepToDelete = methodCopy.find(step => step.id === id)
    methodCopy.splice(methodCopy.indexOf(stepToDelete), 1);
    this.setState({ method: methodCopy })
  }

  renderMethod_steps() {
    if (this.state.method) {
      return this.state.method
        .map(method_step => <MethodStep
          key={method_step.key}
          id={method_step.id}
          description={method_step.description}
          duration={method_step.duration}
          type="editable"
          onRemove={this.removeStep}
        />)
    }
  }
  
  toggleAddButtonDisable() {
    if (this.stepDescription.current.value && this.stepDuration.current.value && this.state.selectedTimeUnit) {
      this.setState({isInputsEmpty: false})
    } else this.setState({isInputsEmpty: true})
  }

  render() {
    return (
      <div className="MethodInfo">
        <textarea autoFocus className="form-control mb-2" onChange={this.toggleAddButtonDisable} ref={this.stepDescription} id="methodStep" rows="5" placeholder="Enter Step Description"></textarea>
        <div className="form-row">
          <div className="col">
            <input type="number" className="form-control mb-2" onChange={this.toggleAddButtonDisable} ref={this.stepDuration} id="stepDuration" placeholder="Enter Duration" />
          </div>
          <div className="col">
            <select className="form-control mb-2" ref={this.unitType} onChange={this.onSelect} id="unitType">
              <option hidden>Choose Time Unit</option>
              <option>Days</option>
              <option>Hours</option>
              <option>Minutes</option>
              <option>Seconds</option>
            </select>
          </div>
        </div>
        <button onClick={this.handleClickAdd} disabled={this.state.isInputsEmpty} className="btn btn-primary mt-2">Add Step</button>
        <div className="method_container">
          <h2 className="title sub_title">Method</h2>
          <ol className="method_list">
            {this.renderMethod_steps()}
          </ol>
        </div>
        <button onClick={this.handleClickSubmit} disabled={!!!this.state.method.length} className="btn btn-primary mt-2">Submit</button>
      </div>
    )
  }
}

export default MethodInfo