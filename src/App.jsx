
// External Libraries
import Axios from 'axios';

// React Hooks
import { useState } from 'react';

// Bootstrap Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

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
      console.log(res.data);
    })
  }
  
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
          <div className="avatar-container">
            <img src="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj" className='avatar' alt="" />
          </div>

          <div className="user-details">
            <div className="top-container">
              <h2 className='name'>The Octocat</h2>
              <span>Joined 25 Jan 2011</span>
            </div>
            <p className='username'>@octocat</p>
            <p className='bio'>This profile has no bio</p>
            <div className="git-stats">
              <div className="stats-header">
                <span>Repos</span>
                <span>Followers</span>
                <span>Following</span>
              </div>

              <div className="stats-data">
                <span>8</span>
                <span>3938</span>
                <span>9</span>
              </div>
            </div>

            <div className="contact-container">
              <div className="links-one">
                <span>
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> San Francisco
                </span>
              
                <span>
                  <FontAwesomeIcon icon={faTwitter}/> https://mytwitter.com
                </span>
              </div>

              <div className="links-one">
                <span>
                  <FontAwesomeIcon icon={faLink} /> https://mylink.com
                </span>
              
                <span>
                  <FontAwesomeIcon icon={faBuilding}/> agithub
                </span>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default App