import React from 'react'
import {connect} from 'react-redux'

let availServices = [
  2,
  14,
  35
]

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newService: null
    }
    this.submitService = this.submitService.bind(this)
  }

  submitService = e => {
    e.preventDefault()
    this.props.addService(this.state.newService)
    this.setState({
      newService: null
    })
  }

  updateDetails = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const {isInbound, flipDirection, removeService, services} = this.props
    return <div className="container has-text-centered">
      <div className="">
        <div className="column is-4">
          {services.map(service => <span className="tag is-large" onClick={() => removeService(service)}>
            {service}
          </span>)}
        </div>
        <div className="column is-4">
          <button className="button" onClick={() => flipDirection()}>{isInbound ? 'InBound' : 'Outbound'}</button>
        </div>
        <form className="column is-4" onSubmit={this.submitService}>
          <div className="select">
            <select name="newService" onChange={this.updateDetails} selected={this.state.newService}>
              <option value={null}>Select a service to track</option>
              {availServices.map(service => <option disabled={services.find(other => service == other)} value={service}>{service}</option>)}
            </select>
          </div>
          <input className="button" type="submit" value="Add" />
        </form>
      </div>
    </div>
  }
}

const mapDispatchToProps = dispatch => ({
  flipDirection: () => dispatch({
    type: 'FLIP_DIRECTION'
  }),
  addService: service => dispatch({
    type: 'ADD_SERVICE',
    service
  }),
  removeService: service => dispatch({
    type: 'REMOVE_SERVICE',
    service
  })
})

const mapStateToProps = ({isInbound, services}) => ({isInbound, services})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
