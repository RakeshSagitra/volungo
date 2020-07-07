import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import './History.module.css'
import WikiIcon from '../../assets/images/wiki.jpeg';
import RedditIcon from '../../assets/images/reddit.png';
import ArticleIcon from '../../assets/images/article.png';
import { connect, useDispatch } from 'react-redux';
import Loading from './loading.js';
import { getHistory } from '../../actions/history-actions';

const History = (props) => {
  useEffect(() => {
  props.history()
  }, []);
  return (
    <div>
      <table id="simple-board">
        <thead>
          <tr>
            <th>Title</th>
            <th>Details</th>
            <th>Event Date</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            props.data && (props.data.map(({ title, details, event_date_utc, links }, index) => (
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
            )))
          }
        </tbody>
      </table>
      <Loading />
    </div>
  );
}

const mapStateToProps = (state) => {
  return { data: state.history.history }
}
const mapDispatchToProps = (dispatch) => ({
  history: () => dispatch(getHistory()),
})
export default connect(mapStateToProps, mapDispatchToProps)(History);
