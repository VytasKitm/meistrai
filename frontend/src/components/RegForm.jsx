import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import { Navigate } from 'react-router-dom'

export const RegForm = ({name, email, password, setName, setEmail, setPassword, clear, submitRegister, setRegisterState}) => {
      const [alert, setAlert] = useState("")

      async function formValidation(event){
            event.preventDefault()
            setAlert("")
            console.log({name, email, password})
            if (!name || !email || !password) {
                  setAlert("Uzpildykite visus laukus")
                  return
            }
            try {
                  await submitRegister()
                  setRegisterState("login")
            }
            catch (error) {
                  const status = error.response?.status
                  const code = error.response?.data?.code

                  if (status === 409 && code === '23505') {
                        setAlert("Toks email jau egzistuoja.")
                  }
                  else {
                        setAlert(error.message || "Error")
                  }
                  console.log(error)
            }
      }


      return (
      <>
      <div className='position-absolute top-50 start-50 translate-middle component p-4' data-bs-theme="dark">
            <Form onSubmit={formValidation}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" value={name} required/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" value={email} required/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" value={password}/>
                  </Form.Group>
                  <Button variant="primary" type="submit" className='me-2'>
                        Register
                  </Button>
                  <Button  onClick={clear} variant="primary" type="button">
                        Clear
                  </Button>
            </Form>
      </div>
      {alert && (<Alert variant="warning" className='mt-5 w-25 position-absolute top-40 start-50 translate-middle-x p-5 ' data-bs-theme="dark" dismissible><Alert.Heading>{alert}</Alert.Heading></Alert>)}
      </>
      )
}
