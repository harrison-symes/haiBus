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
    this.interval = null
  }
  toggleShowAll() {
    this.setState({showAll: !this.state.showAll})
  }
  getData() {
    getRTI(this.props.selectedStop, (err, data) => {
      console.log({data});
      this.setState({RTI: data})
    })
  }
  componentDidMount() {
    this.interval = setInterval(() => this.getData(), 10000)
  }
  componentWillUnmount() {
    window.clearInterval(this.interval)
  }
  realTimeTable() {
    const {RTI, showAll} = this.state
    const {services} = this.props
    const Services = RTI.Services.filter(service => showAll || services.find(other => other == service.ServiceID))
    return <table className='table is-fullwidth is-centered'>
      <thead className="thead">
        <tr>
          <th>Bus No.</th>
          <th>Due</th>
          <th>Journey</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody className="tbody">
        {Services.map(service => <tr>
          <td style={{color: service.IsRealtime ? 'green' : 'black'}}>{service.ServiceID}</td>
          <td>{moment(service.ExpectedDeparture || service.DisplayDeparture).fromNow()}</td>
          <td>{service.OriginStopName} - {service.DestinationStopName}</td>
          <td>{service.DepartureStatus}</td>
        </tr>)}
      </tbody>
    </table>
  }
  render() {
    const {selectedStop, close, savedStops, dispatch} = this.props
    const {RTI, showAll} = this.state
    return <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">RTI for {selectedStop} - {RTI && RTI.Stop.Name}</p>
          <button onClick={this.toggleShowAll.bind(this)}>{showAll ? 'Showing All' : 'Showing Tracked'}</button>
          <button className="button" onClick={close} className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
          <img className="image has-text-centered" src={`https://www.metlink.org.nz/assets/StopImages/${selectedStop}.jpg`} />
          <button onClick={() => dispatch({type: 'SAVE_STOP', stop: selectedStop})} className="button">{savedStops.find(stop => selectedStop == stop) ? 'Un' : ''}Save</button>
          {RTI && RTI.Notices.map(notice => <h1 className="subtitle has-text-danger is-6">{notice.LineNote}</h1>)}
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

const mapStateToProps = ({services, selectedStop, savedStops}) => ({services, selectedStop, savedStops})

export default connect(mapStateToProps)(StopModal)
