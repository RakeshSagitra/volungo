import React from 'react'
import img from '../../assets/images/loading_spinner.gif'

const Loader = () => (
  <div style={{ textAlign: 'center' }}>
    <img src={img} alt='loading' />
  </div>
)

export default Loader