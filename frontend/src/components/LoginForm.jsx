import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import React, { useState, useContext }from 'react'
import { AuthorizationContext } from '../context/AuthorizationProvider'

export const LoginForm = () => {
      const  [email, setEmail] = useState("")
      const [password, setPassword] = useState("")
      const {login} = useContext(AuthorizationContext)

      async function submitUserFunction(event) {
            	event.preventDefault()
		    console.log(email)
		    console.log(password)
		
            	if (!email || !password) {
                  	console.log("Nesuvesti duomenys")
                  	return
            	}
            	login(email, password)
            	setEmail("")
            	setPassword("")
      }


return (
	<>
	<Form onSubmit={submitUserFunction} data-bs-theme="dark">
		<Form.Group className="mb-3" controlId="formBasicEmail">
			<Form.Label>Email address</Form.Label>
			<Form.Control onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email" value={email}/>
		</Form.Group>
		<Form.Group className="mb-3" controlId="formBasicPassword">
			<Form.Label>Password</Form.Label>
			<Form.Control onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" value={password}/>
		</Form.Group>
		<Button variant="primary" type="submit" data-bs-theme="dark">
		      Submit
		</Button>
    	</Form>
	</>
)
}