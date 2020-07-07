import React from 'react'
import { connect } from 'react-redux'
import img from '../../loading_spinner.gif'
let Loading = ({ loading }) => (
  loading ?
    <div style={{ textAlign: 'center' }}>
      <img src={img} alt='loading' />
    </div> :
    null
)
const mapStateToProps = (state) => ({ loading: state.launches.loading })
Loading = connect(mapStateToProps, null)(Loading)
export default Loading