import React, { useEffect } from 'react'
import Moment from 'react-moment'
import './History.module.css'
import WikiIcon from '../../assets/images/wiki.jpeg'
import RedditIcon from '../../assets/images/reddit.png'
import ArticleIcon from '../../assets/images/article.png'
import { useDispatch, useSelector } from 'react-redux'
import { getHistory } from '../../actions/history-actions'
import Loader from '../Loader'

const History = () => {
  const { history, isLoading } = useSelector(({ history }) => ({
    history: history.history,
    isLoading: history.loading,
  }))

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHistory())
  }, [])
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
            history && (history.map(({ title, details, event_date_utc, links }, index) => (
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
      {isLoading && <Loader />}
    </div>
  )
}

export default History
