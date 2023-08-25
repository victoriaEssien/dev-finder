
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
  const [showProfile, setShowProfile] = useState(false);
  const [inputError, setInputError] = useState(false);

  const fetchUserData = (e) => {
    e.preventDefault()

    if (username.trim() === '') {
      setInputError(true);

      setTimeout(() => {
        setInputError(false)
      }, 3000)

      return;
    }

    setInputError(false)

    Axios.get(`https://api.github.com/users/${username}`).then((res) => {
      setGenerateUserData(res.data);
      setShowProfile(true)
    })
  }

  
  // Function to format the date to "YYYY-MM" format
  const formatYearMonth = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'short' });
    return `${month} ${year}`;
  };

  const renderFieldValue = (value, label) => {
    if (value === null || value === undefined) {
      return (
        <span className="null-value">
          No {label.toLowerCase()} available
        </span>
      );
    }
    return value;
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

        {inputError && (
          <p className='error'>Please enter a valid username</p>
        )}

        {showProfile && generateuserData && (
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
                  <p className="bio">
                  {renderFieldValue(generateuserData?.bio, 'Bio')}
                </p>
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
                    {generateuserData?.location && (
                      <p>
                        <FontAwesomeIcon icon={faMapMarkerAlt} />{' '}
                        {generateuserData?.location}
                      </p>
                    )}
                    
                    {generateuserData?.twitter_username && (
                      <p>
                        <FontAwesomeIcon icon={faTwitter} />{' '}
                        {generateuserData?.twitter_username}
                      </p>
                    )}
                    </div>
                  </div>
                  <a href={generateuserData?.html_url} target='_blank' rel='noreferrer' className='view-profile-btn'>View full profile</a>
                </div>
              </Col>
            </Row>
          </div>
        )}
    </div>
  )
}

export default App