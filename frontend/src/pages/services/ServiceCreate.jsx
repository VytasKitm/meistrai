import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'


export const ServiceCreate = ({setPageState, citiesArray, createService}) => {
      const [service_name, setName] = useState("")
      const [city_id, setCityId] = useState("")

      async function submitCreate(event) {
            event.preventDefault()
            await createService(service_name, city_id)
      }

      function clear() {
            setName("")
      }
      

      return (
      <>
      <div className='position-absolute top-50 start-50 translate-middle component p-4' style={{width: "35vw", maxHeight: "80vh", tableLayout: "auto"}} data-bs-theme="dark">
            <h3>Add Service</h3>
            <br />
            <Form onSubmit={submitCreate}>
                  <Form.Group className="mb-3" controlId="formBasicServiceName">
                        <Form.Label>Service Name</Form.Label>
                        <Form.Control onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" value={service_name} required/>
                  </Form.Group>
                  <Form.Group className='mb-3'>
                        <Form.Label>City</Form.Label>
                        <Form.Select onChange={(e) => setCityId(e.target.value)} required>
                              <option value="" style={{display: 'none'}}>Choose City</option>
                              {citiesArray.map((city) => 
                              (<option key={city.id} value={city.id}>{city.name}</option>)   
                              )}
                        </Form.Select>
                  </Form.Group>
                  <Button variant="primary" type="submit" className='me-2'>
                        Create
                  </Button>
                  <Button  onClick={clear} variant="primary" type="button" className='me-2'>
                        Clear
                  </Button>
                  <Button  onClick={() => setPageState("table")} variant="primary" type="button">
                        Cancel
                  </Button>
            </Form>

      </div>
      {/* {alert && (<Alert variant="warning" className='mt-5 w-25 position-absolute top-40 start-50 translate-middle-x p-5 ' data-bs-theme="dark" dismissible><Alert.Heading>{alert}</Alert.Heading></Alert>)} */}
      </>
      )
}