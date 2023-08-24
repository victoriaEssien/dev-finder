
// React Hooks


// Bootstrap Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function App() {

  
  
  return (
    <div className="main-container">
        <h3 className="logo">devfinder</h3>
        <div className='input-container'>
          <Form>
            <Form.Control size="lg" className="input-field" type="text" placeholder="Search Github username..." />
            <Button type='button' className='submit-btn'>Search</Button>
          </Form>
        </div>
    </div>
  )
}

export default App