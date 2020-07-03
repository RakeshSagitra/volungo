import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import './History.module.css'
import WikiIcon from '../../assets/images/wiki.jpeg';
import RedditIcon from '../../assets/images/reddit.png';
import ArticleIcon from '../../assets/images/article.png';

function History() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'https://api.spacexdata.com/v3/history');
      console.log(result.data);
      setData(result.data);
      console.log('this is the data', data);
    }
    fetchData();
  }, []);
  return (
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
        {data.map(({ title, details, event_date_utc, links }, index) => (
          <tr key={index} >
            <td >
              {title}
            </td>
            <td className="history-details">
              {details}
            </td>
            <td >
              <Moment format="DD / MM / YYYY HH:mm">
                {event_date_utc}
              </Moment>
            </td>
            <td>
              <div className="links">
                <a href={links.wikipedia} target={"_blank"}>
                  <img className="image" src={WikiIcon} />
                </a>
                <a href={links.reddit} target={"_blank"}>
                  <img className="image" src={RedditIcon} />
                </a>
                <a href={links.article} target={"_blank"}>
                  <img className="image" src={ArticleIcon} />
                </a>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default History;
