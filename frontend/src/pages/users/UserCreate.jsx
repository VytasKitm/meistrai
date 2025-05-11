import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import { Navigate } from 'react-router-dom'
import { createUserAdminAPI } from '../../services/usersAPI'


export const UserCreate = ({createUser, setPageState}) => {
      const [name, setName] = useState("")
      const [email, setEmail] = useState("")
      const [role, setRole] = useState("")
      const [password, setPassword] = useState("")

      async function submitCreate(event) {
            event.preventDefault()
            createUser(name, email, role, password)
      }

      function clear() {
            setName("")
            setEmail("")
            setRole("")
            setPassword("")
      }
      

      return (
      <>
      <div className='position-absolute top-50 start-50 translate-middle component p-4' style={{width: "35vw", maxHeight: "80vh", tableLayout: "auto"}} data-bs-theme="dark">
            <h3>Create User</h3>
            <br />
            <Form onSubmit={submitCreate}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" value={name} required/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" value={email} required/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicRole">
                        <Form.Label>Role</Form.Label>
                        <Form.Control onChange={(e) => setRole(e.target.value)} type="text" placeholder="Name" value={role} required/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" value={password} required/>
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