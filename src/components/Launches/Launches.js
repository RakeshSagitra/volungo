import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import './Launches.module.css'
import WikiIcon from '../../assets/images/wiki.jpeg';
import RedditIcon from '../../assets/images/reddit.png';
import ArticleIcon from '../../assets/images/article.png';
import YoutubeIcon from '../../assets/images/youtube.png';

function Launches() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [searchDate, setSearchDate] = useState('');
  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'https://api.spacexdata.com/v3/launches');
      setData(result.data);
      let results = result.data.filter(event =>
        event.mission_name.toLowerCase().includes(search.toLowerCase())
      );
      setData(results);
      console.log(searchDate)
      console.log(search)
      console.log(results)
      console.log(result.data[0].launch_date_local)
      results = results.filter(event =>
        event.launch_date_local.includes(searchDate)
      );
      setData(results);
      console.log(results)
    }
    fetchData();
  }, [search, searchDate]);

  function searchData(value) {
    setSearch(value)
  }

  function searchDateFunction(value) {
    setSearchDate(value)
  }
  function clearFilters(event) {
    setSearch('')
    setSearchDate('')
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
        <a className='clearFilters' onClick={(event) => { clearFilters(event) }}>clear</a>
      </div>
      <table id="simple-board">
        <thead>
          <tr>
            <td>Title</td>
            <td>Details</td>
            <td>Event Date</td>
            <td className="actions">Actions</td>
          </tr>
        </thead>
        <tbody>
          {data.map(({ mission_name, details, launch_date_local, links }, index) => (
            < tr key={index} id="row0" >
              <td className="missionName" id="cell0-0">
                {mission_name}
              </td>
              <td id="cell0-1" className="details">
                {details}
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
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Launches;
