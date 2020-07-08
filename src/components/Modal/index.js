import React from "react"
import "./modal.css"
export default class Modal extends React.Component {
  render() {
    if (!this.props.show) {
      return null
    }
    const launchData = this.props.launchData
    return (
      <div onBlur={this.props.onClose} className="modal">
        <div className="modal-content">
          <h2>{launchData.mission_name}</h2>
          <div className="content">{launchData.details}</div>
          <div>
            <p><b>Nationality:</b> {launchData.rocket.second_stage.payloads[0].nationality}</p>
            <p><b>Manufacturer:</b> {launchData.rocket.second_stage.payloads[0].manufacturer}</p>
            <p><b>Payload Type:</b> {launchData.rocket.second_stage.payloads[0].payload_type}</p>
          </div>
          <iframe width="560" height="315" src={this.props.link} frameBorder="0" allowFullScreen></iframe>
          <div className="action-buttons">
            <button className="toggle-button" onClick={this.props.onClose}>
              close
           </button>
            <button className="toggle-button" onClick={this.props.onShare}>
              Share
           </button>
          </div>
        </div>
      </div>
    )
  }
}