import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'


export const MechanicEdit = ({setPageState, servicesArray, specArray, updateMechanic, editMechanic}) => {
      const [name, setName] = useState(editMechanic.mechanics_name)
      const [lastName, setLastName] = useState(editMechanic.mechanics_last_name)
      const [serviceId, setServiceId] = useState(null)
      const [specializationId, setSpecializationId] = useState(null)
      const [cityName, setCityName] = useState("")

      useEffect(() => {
            console.log(editMechanic)
            const service = servicesArray.find((service) => service.city_name == editMechanic.city_name)
            setCityName(service.city_name)
      },[])

      function submitUpdate(event) {
            event.preventDefault()
            updateMechanic(editMechanic.id, name, lastName, serviceId, specializationId)
      }

      function setService(id) {
            setServiceId(id)
            console.log(id)
            console.log(editMechanic)
            const service = servicesArray.find((service) => service.id == id)
            console.log(service)
            console.log(servicesArray)
            setCityName(service.city_name)
      }

      function clear() {
            setName("")
            setLastName("")
      }
      

      return (
      <>
      <div className='position-absolute top-50 start-50 translate-middle component p-4'style={{width: "35vw", maxHeight: "80vh", tableLayout: "auto"}}  data-bs-theme="dark">
            <h3>Update Mechanic</h3>
            <br />
            <Form onSubmit={submitUpdate}>
                  <Form.Group className="mb-3" controlId="formBasicServiceName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" value={name} required/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicServiceName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Name" value={lastName} required/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicServiceName">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" value={cityName} disabled/>
                  </Form.Group>
                  <Form.Group className='mb-3'>
                        <Form.Label>Service</Form.Label>
                        <Form.Select onChange={(e) => setService(e.target.value)}>
                              <option value="" style={{display: 'none'}}>{editMechanic.service_name}</option>
                              {servicesArray.map((service) => 
                              (<option key={service.id} value={service.id}>{service.service_name}</option>)   
                              )}
                        </Form.Select>
                  </Form.Group>
                  <Form.Group className='mb-3'>
                        <Form.Label>Specialization</Form.Label>
                        <Form.Select onChange={(e) => setSpecializationId(e.target.value)}>
                              <option value="" style={{display: 'none'}}>{editMechanic.specialization_name}</option>
                              {specArray.map((spec) => 
                              (<option key={spec.id} value={spec.id}>{spec.name}</option>)   
                              )}
                        </Form.Select>
                  </Form.Group>
                  <Button variant="primary" type="submit" className='me-2'>
                        Update
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