import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'react-moment';

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
          <td style={{paddingLeft: '35px'}}>Actions</td>
        </tr>
      </thead>
      <tbody>
        {data.map(({ title, details, event_date_utc, links }, index) => (
          <tr key={index} id="row0">
            <td id="cell0-0">
              {title}
            </td>
            <td id="cell0-1" style={{ width: '1000px', paddingRight: '25px' }}>
              {details}
            </td>
            <td id="cell0-2">
              <Moment format="DD / MM / YYYY HH:mm">
                {event_date_utc}
              </Moment>
            </td>
            <td style={{ paddingLeft: '25px' }}>
              <div className="links">
                <a href={links.wikipedia} target={"_blank"}>
                  <img style={{ width: '40px', paddingTop: '10px', paddingLeft: '10px' }} src={WikiIcon} />
                </a>
                <a href={links.reddit} target={"_blank"}>
                  <img style={{ width: '40px', paddingTop: '10px', paddingLeft: '10px' }} src={RedditIcon} />
                </a>
                <a href={links.article} target={"_blank"}>
                  <img style={{ width: '40px', paddingTop: '10px', paddingLeft: '10px' }} src={ArticleIcon} />
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
