
// External Libraries
import Axios from 'axios';

// React Hooks
import { useState } from 'react';

// Bootstrap Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

// FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faLink, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';


function App() {

  const [generateuserData, setGenerateUserData] = useState(null)
  const [username, setUsername] = useState("")

  const fetchUserData = (e) => {
    e.preventDefault()
    Axios.get(`https://api.github.com/users/${username}`).then((res) => {
      setGenerateUserData(res.data);
      console.log(res.data);
    })
  }

  
  // Function to format the date to "YYYY-MM" format
  const formatYearMonth = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    return `${month} ${year}`;
  };
  
  return (
    <div className="main-container">
        <h3 className="logo">devfinder</h3>
        <div className='input-container'>
          <Form onSubmit={fetchUserData}>
            <Form.Control size="lg" className="input-field" type="text" placeholder="Search Github username..." onChange={(e) => setUsername(e.target.value)}/>
            <Button type='submit' className='submit-btn'>Search</Button>
          </Form>
        </div>

        <div className="profile-container">
          <Row>
            <Col lg={3}>
              <div className="avatar-container">
                <img src={generateuserData?.avatar_url} className='avatar' alt="user's profile picture" />
              </div>
            </Col>

            <Col>
              <div className="user-details">
                <div className="top-container">
                  <h3 className='name'>{generateuserData?.name}</h3>
                  <span className='date-joined'>Joined {generateuserData?.created_at && formatYearMonth(generateuserData.created_at)}</span>
                </div>
                <p className='username'>@{generateuserData?.login}</p>
                <p className='bio'>{generateuserData?.bio}</p>
                <div className="git-stats">
                  <div className="stats-header">
                    <span>Repos</span>
                    <span>Followers</span>
                    <span>Following</span>
                  </div>

                  <div className="stats-data">
                    <span>{generateuserData?.public_repos}</span>
                    <span>{generateuserData?.followers}</span>
                    <span>{generateuserData?.following}</span>
                  </div>
                </div>

                <div className="contact-container">
                  <div className="links-one">
                    <span>
                      <FontAwesomeIcon icon={faMapMarkerAlt} /> {generateuserData?.location}
                    </span>
                  
                    <span>
                      <FontAwesomeIcon icon={faTwitter}/> {generateuserData?.twitter_username}
                    </span>
                  </div>
                </div>
                <div className="btn">
                <a href={generateuserData?.html_url} target='_blank' rel='noreferrer' className='view-profile-btn'>View full profile</a>
                </div>
              </div>
            </Col>
          </Row>
        </div>
    </div>
  )
}

export default App