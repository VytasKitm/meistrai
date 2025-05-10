import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import { Navigate } from 'react-router-dom'


export const UserEdit = ({editUser, userUpdate, setPageState}) => {
      const [name, setName] = useState(editUser.name)
      const [email, setEmail] = useState(editUser.email)
      const [role, setRole] = useState(editUser.role)
      const [password, setPassword] = useState("")

      async function submitUpdate(event) {
            event.preventDefault()
            userUpdate({...editUser, name, email, role, password})
            setPageState("table")
      }

      function clear() {
            setName("")
            setEmail("")
            setRole("")
            setPassword("")
      }
      

      return (
      <>
      <div className='position-absolute top-50 start-50 translate-middle component p-4' data-bs-theme="dark">
            <h3>Update User</h3>
            <br />
            <Form onSubmit={submitUpdate}>
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
                        <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" value={password}/>
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