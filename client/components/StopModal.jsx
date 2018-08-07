import React from 'react'

import {connect} from 'react-redux'
import moment from 'moment'

import {getRTI} from '../actions/bus'

class StopModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      RTI: null,
      showAll: false
    }
  }
  toggleShowAll() {
    this.setState({showAll: !this.state.showAll})
  }
  componentDidMount() {
    getRTI(this.props.stop.stopNumber, (err, data) => {
      console.log({data});
      this.setState({RTI: data})
    })
  }
  realTimeTable() {
    const {RTI, showAll} = this.state
    const {services} = this.props
    const Services = RTI.Services.filter(service => showAll || services.find(other => other == service.ServiceID))
    return <table className='table is-fullwidth is-centered'>
      <thead className="thead">
        <tr>
          <th>Bus No.</th>
          <th>Destination</th>
          <th>Status</th>
          <th>Due</th>
        </tr>
      </thead>
      <tbody className="tbody">
        {Services.map(service => <tr>
          <td>{service.ServiceID}</td>
          <td>{service.DestinationStopName}</td>
          <td>{service.DepartureStatus}</td>
          <td>{moment(service.ExpectedDeparture || service.DisplayDeparture).fromNow()}</td>
        </tr>)}
      </tbody>
    </table>
  }
  render() {
    const {stop, close} = this.props
    const {RTI, showAll} = this.state
    return <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">RTI for {stop.stopNumber} - {RTI && RTI.Stop.Name}</p>
          <button onClick={this.toggleShowAll.bind(this)}>{showAll ? 'Showing All' : 'Showing Tracked'}</button>
          <button className="button" onClick={close} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          {RTI
            ? this.realTimeTable()
            : <h1 className="title is-1">Loading...</h1>
          }
        </section>
        <footer className="modal-card-foot">
          <button onClick={close} className="button is-fullwidth">Cancel</button>
        </footer>
      </div>
    </div>
  }
}

const mapStateToProps = ({services}) => ({services})

export default connect(mapStateToProps)(StopModal)
