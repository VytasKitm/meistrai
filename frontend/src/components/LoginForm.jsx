import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import React, { useState, useContext }from 'react'
import { AuthorizationContext } from '../context/AuthorizationProvider'
import { useNavigate } from 'react-router-dom'


export const LoginForm = ({email, password, setEmail, setPassword, submitLogin}) => {
      // const  [email, setEmail] = useState("")
      // const [password, setPassword] = useState("")
      // const {login} = useContext(AuthorizationContext)


      // async function submitUserFunction(event) {
      //       event.preventDefault()
	// 	console.log(email)
	// 	console.log(password)
		
      //       if (!email || !password) {
      //             console.log("Nesuvesti duomenys")
      //             return
      //       }
	// 	try {
	// 		await login(email, password)
	// 	}
	// 	catch (error) {
	// 		setEmail("")
      //       	setPassword("")
	// 	}
      // }


return (
	<>
	<div className='position-absolute top-50 start-50 translate-middle component p-5'>
		<Form onSubmit={submitLogin} data-bs-theme="dark" >
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>Email address</Form.Label>
				<Form.Control onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email" value={email}/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="formBasicPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" value={password}/>
			</Form.Group>
			<Button variant="primary" type="submit" data-bs-theme="dark">
				Log In
			</Button>
    		</Form>
	</div>

	</>
)
}