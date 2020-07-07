import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import './Launches.module.css'
import WikiIcon from '../../assets/images/wiki.jpeg'
import RedditIcon from '../../assets/images/reddit.png'
import ArticleIcon from '../../assets/images/article.png'
import YoutubeIcon from '../../assets/images/youtube.png'
import Loader from '../Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getLaunches } from '../../actions/launches-actions'
import { getRockets } from '../../actions/rockets-actions'

const Launches = () => {
  const { allLaunches, rocketsData, isLoading } = useSelector(({ launches, rockets }) => ({
    allLaunches: launches.launches,
    rocketsData: rockets.rockets,
    isLoading: launches.loading,
  }))
  const dispatch = useDispatch()

  const [launches, setLaunches] = useState([])
  const [orbitMap, setOrbitMap] = useState(new Map())

  const [search, setSearch] = useState('')
  const [searchDate, setSearchDate] = useState('')
  const [selectOrbit, setSelectOrbit] = useState('')
  const orbits = [
    {
      "id": '',
      "name": "Select Orbit"
    }, {
      "id": "leo",
      "name": "Low Earth Orbit"
    },
    {
      "id": "mars",
      "name": "Mars Orbit"
    },
    {
      "id": "moon",
      "name": "Moon Orbit"
    }, {
      "id": "gto",
      "name": "Geosynchronous Transfer Orbit"
    },
    {
      "id": "pluto",
      "name": "Pluto Orbit"
    }
  ]

  const filterData = () => {
    if (!allLaunches || !allLaunches.length) return []

    return allLaunches.filter(({ mission_name, launch_date_local, rocket }) => {
      if (search && !mission_name.toLowerCase().includes(search.toLowerCase())) {
        return false
      }
      if (searchDate && !launch_date_local.includes(searchDate)) {
        return false
      }
      if (selectOrbit) {
        let orbitMapValues = orbitMap.get(rocket.rocket_id)
        let selectedOrbitValue = orbitMapValues.get(selectOrbit)
        if (selectedOrbitValue) {
          if (selectedOrbitValue.lb < rocket.second_stage.payloads[0].payload_mass_lbs) {
            return false
          }
        } else {
          return false
        }
      }

      return true
    })
  }

  useEffect(() => {
    dispatch(getLaunches())
    dispatch(getRockets())
  }, [])

  useEffect(() => {
    if (allLaunches) {
      setLaunches(allLaunches)
    }

    if (rocketsData) {
      setOrbitMap(createRocketOrbitMap(rocketsData))
    }
  }, [allLaunches, rocketsData])

  useEffect(() => {
    const filteredData = filterData()

    setLaunches(filterData)
  }, [search, searchDate, selectOrbit])

  function searchData(value) {
    setSearch(value)
  }

  function searchDateFunction(value) {
    setSearchDate(value)
  }

  function createRocketOrbitMap(rockets) {
    let returnResults = new Map()
    rockets.map(result => {
      let weights = new Map()
      result.payload_weights.map(weight => {
        weights.set(weight.id, weight)
      })
      returnResults.set(result.rocket_id, weights)
    })
    return returnResults
  }

  function setSelectOrbitValue(value) {
    setSelectOrbit(value)
  }

  function clearFilters(event) {
    setSearch('')
    setSearchDate('')
    setSelectOrbit('')
  }

  return (
    <div>
      <div className="filters">
        <input
          className="inputs"
          value={search}
          onChange={(event) => { searchData(event.target.value) }}
          modifier='material'
          placeholder='Search Event' />
        <input
          className="inputs"
          value={searchDate}
          type='date'
          onChange={(event) => { searchDateFunction(event.target.value) }}
          modifier='material'
          placeholder='Search Event' />
        <select onChange={(event) => { setSelectOrbitValue(event.target.value) }} className="select" id="dropdown">
          {orbits.map((orbit, index) => (
            <option key={index} value={orbit.id}>{orbit.name}</option>
          ))}

        </select>
        <a className='clearFilters' onClick={(event) => { clearFilters(event) }}>clear</a>
      </div>
      <table id="simple-board">
        <thead>
          <tr>
            <th>Title</th>
            <th>Details</th>
            <th>Payload Details</th>
            <th>Event Date</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {launches && (launches.map(({ mission_name, details, launch_date_local, links, rocket }, index) => (
            < tr key={index} id="row0" >
              <td className="missionName" id="cell0-0">
                {mission_name}
              </td>
              <td id="cell0-1" className="details">
                {details}
              </td>
              <td id="cell0-1" className="payload">
                <p><b>Nationality:</b> {rocket.second_stage.payloads[0].nationality}</p>
                <p><b>Manufacturer:</b> {rocket.second_stage.payloads[0].manufacturer}</p>
                <p><b>Payload Type:</b> {rocket.second_stage.payloads[0].payload_type}</p>
              </td>
              <td id="cell0-2">
                <Moment format="DD / MM / YYYY HH:mm">
                  {launch_date_local}
                </Moment>
              </td>
              <td>
                <div className="links">
                  <a href={links.wikipedia} target={"_blank"}>
                    <img
                      className="image"
                      src={WikiIcon}
                    />
                  </a>
                  <a href={links.reddit} target={"_blank"}>
                    <img
                      className="image"
                      src={RedditIcon}
                    />
                  </a>
                  <a href={links.article_link} target={"_blank"}>
                    <img className="image" src={ArticleIcon} />
                  </a>
                  <a href={links.video_link} target={"_blank"}>
                    <img className="image" src={YoutubeIcon} />
                  </a>
                </div>
              </td>
            </tr >
          )))
          }
        </tbody>
      </table>
      {isLoading && <Loader />}
    </div>
  )
}

export default Launches
