import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import Select from 'react-select';
import './Launches.module.css'
import WikiIcon from '../../assets/images/wiki.jpeg';
import RedditIcon from '../../assets/images/reddit.png';
import ArticleIcon from '../../assets/images/article.png';
import YoutubeIcon from '../../assets/images/youtube.png';
import Loading from '../Launches/loading';
import { connect } from 'react-redux';
import { getLaunches } from '../../actions/launches-actions';
import { getRockets } from '../../actions/rockets-actions';

const Launches = (props) => {
  const [search, setSearch] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [selectOrbit, setSelectOrbit] = useState('');
  const [orbitMap, setOrbitMap] = useState(new Map());
  const [launches, setLaunches] = useState([]);
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
  // Replace your useEffect with these. Please handle errors as well.
  useEffect(() => {
    async function fetchData() {
      await props.launches()
      setLaunches(props.data);
      console.log('this is props data ', props.data)
      await props.rockets()
      setOrbitMap(createRocketOrbitMap(props.rocketsData));
    }
    fetchData()
  }, []);

  useEffect(() => {
    const filteredData = launches.filter(({ mission_name, launch_date_local, rocket }) => {
      let match = true;
      if (search && !mission_name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (searchDate && !launch_date_local.includes(searchDate)) {
        return false;
      }
      if (selectOrbit) {
        let returnResults = []
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

      return true;
    });
    console.log(filteredData)
    // props.data = (filteredData);
  }, [search, searchDate, selectOrbit]);

  function searchData(value) {
    setSearch(value)
  }

  function searchDateFunction(value) {
    setSearchDate(value)
  }

  function createRocketOrbitMap(rockets) {
    console.log('this is the rockets ', rockets)
    let returnResults = new Map()
    rockets.map(result => {
      let weights = new Map()
      result.payload_weights.map(weight => {
        weights.set(weight.id, weight)
      })
      returnResults.set(result.rocket_id, weights)
    })
    console.log(returnResults)
    return returnResults
  }

  function setSelectOrbitValue(value) {
    console.log(value)
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
          {props.data && (props.data.map(({ mission_name, details, launch_date_local, links, rocket }, index) => (
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
      <Loading />
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log('this is the state in mapStateToProps ', state)
  return { data: state.launches.launches, launches: state.launches.launches, rocketsData: state.rockets.rockets }
}
const mapDispatchToProps = (dispatch) => ({
  launches: () => dispatch(getLaunches()),
  rockets: () => dispatch(getRockets()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Launches);
